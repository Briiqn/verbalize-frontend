"""Generate stylized low-poly steampunk house models for Verbalize.

Run headless:
  LD_LIBRARY_PATH=~/.local/blender-libshim blender --background --python tools/build_houses.py

Each house is normalized to a unit footprint (X,Y in [-0.5, 0.5], Blender Z = up)
and real-meter height. Exported Y-up (up_axis='Y') so the footprint lands in the
client's XZ plane and the renderer scales X/Z to the building footprint, leaving
height in world meters. Parts are merged by material into one object each; the
object name becomes the OBJ group the client loader keys colors off.
"""
import bpy
import bmesh
import math
import os
import sys

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "models", "houses")
os.makedirs(OUT_DIR, exist_ok=True)

# Authored in real meters at a 6m reference footprint (Blender X/Y = footprint, Z = up).
# The client scales footprint X/Z to each building's actual width (5-8m) and leaves Y in meters.
REF = 6.0
H = REF / 2  # footprint half-size


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def box(parts, name, cx, cy, cz, sx, sy, sz):
    parts.setdefault(name, []).append(("box", (cx, cy, cz, sx, sy, sz)))


def gable(parts, name, cx, cy, cz, sx, sy, ridge_h, base_h):
    parts.setdefault(name, []).append(("gable", (cx, cy, cz, sx, sy, ridge_h, base_h)))


def pyramid(parts, name, cx, cy, cz, sx, sy, h):
    parts.setdefault(name, []).append(("pyr", (cx, cy, cz, sx, sy, h)))


def cyl(parts, name, cx, cy, cz, r, h, segs=12):
    parts.setdefault(name, []).append(("cyl", (cx, cy, cz, r, h, segs)))


def sphere(parts, name, cx, cy, cz, r, segs=10, rings=7):
    parts.setdefault(name, []).append(("sph", (cx, cy, cz, r, segs, rings)))


def taper_cyl(parts, name, cx, cy, cz, r0, r1, h, segs=10):
    parts.setdefault(name, []).append(("tcyl", (cx, cy, cz, r0, r1, h, segs)))


def ring_y(parts, name, cx, cy, cz, r_in, r_out, segs=16):
    """Flat annulus in the X-Z plane facing +/-Y (e.g. a monocle rim or a gear)."""
    verts = []
    for i in range(segs):
        a = 2 * math.pi * i / segs
        c, s = math.cos(a), math.sin(a)
        verts.append((cx + c * r_out, cy, cz + s * r_out))
        verts.append((cx + c * r_in, cy, cz + s * r_in))
    faces = [(2 * i, 2 * ((i + 1) % segs), 2 * ((i + 1) % segs) + 1, 2 * i + 1) for i in range(segs)]
    parts.setdefault(name, []).append(("raw", (verts, faces)))


def disc_y(parts, name, cx, cy, cz, r, segs=16):
    """Flat disc in the X-Z plane facing +/-Y (e.g. a monocle lens)."""
    verts = [(cx, cy, cz)]
    for i in range(segs):
        a = 2 * math.pi * i / segs
        verts.append((cx + math.cos(a) * r, cy, cz + math.sin(a) * r))
    faces = [(0, 1 + i, 1 + ((i + 1) % segs)) for i in range(segs)]
    parts.setdefault(name, []).append(("raw", (verts, faces)))


def gear_y(parts, name, cx, cy, cz, r, teeth=8):
    """A small toothed gear facing +/-Y: a disc with square teeth around the rim."""
    disc_y(parts, name, cx, cy, cz, r, segs=max(12, teeth * 2))
    for i in range(teeth):
        a = 2 * math.pi * i / teeth
        c, s = math.cos(a), math.sin(a)
        box(parts, name, cx + c * r, cy, cz + s * r, r * 0.34, 0.03, r * 0.34)


def emit_box(bm, cx, cy, cz, sx, sy, sz):
    hx, hy, hz = sx / 2, sy / 2, sz / 2
    verts = [bm.verts.new((cx + x * hx, cy + y * hy, cz + z * hz))
             for x, y, z in [(-1, -1, -1), (1, -1, -1), (1, 1, -1), (-1, 1, -1),
                              (-1, -1, 1), (1, -1, 1), (1, 1, 1), (-1, 1, 1)]]
    faces = [(0, 1, 2, 3), (7, 6, 5, 4), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)]
    for f in faces:
        bm.faces.new([verts[i] for i in f])


def emit_gable(bm, cx, cy, cz, sx, sy, ridge_h, base_h):
    hx, hy = sx / 2, sy / 2
    z0, z1 = cz, cz + base_h
    zr = cz + ridge_h
    v = [bm.verts.new(p) for p in [
        (cx - hx, cy - hy, z0), (cx + hx, cy - hy, z0), (cx + hx, cy + hy, z0), (cx - hx, cy + hy, z0),
        (cx - hx, cy - hy, z1), (cx + hx, cy - hy, z1), (cx + hx, cy + hy, z1), (cx - hx, cy + hy, z1),
        (cx, cy - hy, zr), (cx, cy + hy, zr)]]
    # No bottom quad (0,1,2,3) — it would form a solid "attic floor" at ceiling
    # height that the player clips through. Open underside instead.
    for f in [(0, 4, 5, 1), (3, 2, 6, 7), (4, 8, 5), (7, 6, 9),
              (4, 7, 9, 8), (5, 8, 9, 6)]:
        bm.faces.new([v[i] for i in f])


def emit_pyr(bm, cx, cy, cz, sx, sy, h):
    hx, hy = sx / 2, sy / 2
    v = [bm.verts.new(p) for p in [
        (cx - hx, cy - hy, cz), (cx + hx, cy - hy, cz), (cx + hx, cy + hy, cz), (cx - hx, cy + hy, cz),
        (cx, cy, cz + h)]]
    for f in [(0, 1, 2, 3), (0, 4, 1), (1, 4, 2), (2, 4, 3), (3, 4, 0)]:
        bm.faces.new([v[i] for i in f])


def emit_cyl(bm, cx, cy, cz, r, h, segs):
    bottom = [bm.verts.new((cx + math.cos(t) * r, cy + math.sin(t) * r, cz))
              for t in [i / segs * math.tau for i in range(segs)]]
    top = [bm.verts.new((cx + math.cos(t) * r, cy + math.sin(t) * r, cz + h))
           for t in [i / segs * math.tau for i in range(segs)]]
    for i in range(segs):
        j = (i + 1) % segs
        bm.faces.new([bottom[i], bottom[j], top[j], top[i]])
    bm.faces.new(list(reversed(bottom)))
    bm.faces.new(top)


def emit_sphere(bm, cx, cy, cz, r, segs, rings):
    top = bm.verts.new((cx, cy, cz + r))
    bot = bm.verts.new((cx, cy, cz - r))
    rows = []
    for ri in range(1, rings):
        phi = ri / rings * math.pi
        y = math.cos(phi)
        sr = math.sin(phi)
        rows.append([bm.verts.new((cx + sr * math.cos(t) * r, cy + sr * math.sin(t) * r, cz + y * r))
                     for t in [si / segs * math.tau for si in range(segs)]])
    for si in range(segs):
        j = (si + 1) % segs
        bm.faces.new([top, rows[0][si], rows[0][j]])
        bm.faces.new([bot, rows[-1][j], rows[-1][si]])
    for ri in range(len(rows) - 1):
        for si in range(segs):
            j = (si + 1) % segs
            bm.faces.new([rows[ri][si], rows[ri][j], rows[ri + 1][j], rows[ri + 1][si]])


def emit_tcyl(bm, cx, cy, cz, r0, r1, h, segs):
    bottom = [bm.verts.new((cx + math.cos(t) * r0, cy + math.sin(t) * r0, cz))
              for t in [i / segs * math.tau for i in range(segs)]]
    top = [bm.verts.new((cx + math.cos(t) * r1, cy + math.sin(t) * r1, cz + h))
           for t in [i / segs * math.tau for i in range(segs)]]
    for i in range(segs):
        j = (i + 1) % segs
        bm.faces.new([bottom[i], bottom[j], top[j], top[i]])
    bm.faces.new(list(reversed(bottom)))
    bm.faces.new(top)


def emit_raw(bm, verts, faces):
    v = [bm.verts.new(p) for p in verts]
    for f in faces:
        bm.faces.new([v[i] for i in f])


EMITTERS = {"box": emit_box, "gable": emit_gable, "pyr": emit_pyr, "cyl": emit_cyl,
            "sph": emit_sphere, "tcyl": emit_tcyl, "raw": emit_raw}


def build_object(name, specs):
    bm = bmesh.new()
    for kind, args in specs:
        EMITTERS[kind](bm, *args)
    # Recalculate consistently outward — our hand-authored box winding isn't uniform
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    mesh = bpy.data.meshes.new(name)
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    for poly in mesh.polygons:
        poly.use_smooth = False
    return obj


def walls_with_door(parts, w, d, height):
    """Four perimeter walls; the -Y (front) wall has a centered door gap. Meters."""
    t = 0.22
    hx, hy = w / 2, d / 2
    inner = d - 2 * t  # inset side walls between front/back so corners don't overlap (kills z-fighting)
    box(parts, "wall", 0, hy - t / 2, height / 2, w, t, height)              # back (+Y)
    box(parts, "wall", -hx + t / 2, 0, height / 2, t, inner, height)         # left
    box(parts, "wall", hx - t / 2, 0, height / 2, t, inner, height)          # right
    gap = 1.5
    seg = (w - gap) / 2
    box(parts, "wall", -(gap / 2 + seg / 2), -hy + t / 2, height / 2, seg, t, height)
    box(parts, "wall", (gap / 2 + seg / 2), -hy + t / 2, height / 2, seg, t, height)
    door_h = min(2.0, height - 0.4)
    box(parts, "wall", 0, -hy + t / 2, (door_h + height) / 2, gap, t, height - door_h)  # above door
    # lintel beam (proud of the wall so it doesn't z-fight the door face)
    box(parts, "trim", 0, -hy - 0.06, door_h, gap + 0.3, t + 0.16, 0.26)
    # door panel (recessed) + brass knob
    box(parts, "door", 0, -hy + 0.1, door_h / 2, gap - 0.14, 0.14, door_h)
    box(parts, "brass", 0.55, -hy - 0.14, door_h * 0.5, 0.1, 0.12, 0.1)
    # corner posts (timber frame)
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(parts, "trim", sx * (hx - 0.1), sy * (hy - 0.1), height / 2, 0.28, 0.28, height + 0.04)


def glow_windows(parts, w, d, height, rows=(0.56,)):
    t = 0.22
    hx, hy = w / 2, d / 2
    wW, wH = 1.0, 1.1       # opening
    fW, fH = 1.3, 1.4       # frame
    for ry in rows:
        wy = height * ry
        for fx in (-w * 0.26, w * 0.26):  # front-wall windows
            box(parts, "trim", fx, -hy + t / 2, wy, fW, t + 0.04, fH)
            box(parts, "window", fx, -hy - 0.02, wy, wW, 0.06, wH)
        for fz in (-d * 0.26, d * 0.26):  # side-wall windows
            box(parts, "trim", hx - t / 2, fz, wy, t + 0.04, fW, fH)
            box(parts, "window", hx + 0.02, fz, wy, 0.06, wW, wH)


FLOOR_TOP = 0.1  # furniture rests on this so it never z-fights the floor slab


def floor(parts, w, d):
    box(parts, "floor", 0, 0, FLOOR_TOP / 2 + 0.01, w - 0.5, d - 0.5, FLOOR_TOP)


def table(parts, cx, cy, top_z=0.85, tw=1.3, td=0.9):
    box(parts, "furniture", cx, cy, top_z, tw, td, 0.1)
    leg_h = top_z - 0.05 - FLOOR_TOP
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(parts, "furniture", cx + sx * (tw / 2 - 0.1), cy + sy * (td / 2 - 0.1), FLOOR_TOP + leg_h / 2, 0.1, 0.1, leg_h)


def stool(parts, cx, cy, top=0.55):
    box(parts, "furniture", cx, cy, top, 0.35, 0.35, 0.08)
    leg_h = top - 0.04 - FLOOR_TOP
    box(parts, "furniture", cx, cy, FLOOR_TOP + leg_h / 2, 0.08, 0.08, leg_h)


def crate(parts, cx, cy, stack, s=0.6):
    z0 = FLOOR_TOP + stack
    box(parts, "furniture", cx, cy, z0 + s / 2, s, s, s)
    box(parts, "brass", cx, cy, z0 + s / 2, s + 0.02, s * 0.14, s * 0.14)


def barrel(parts, cx, cy, r=0.32, h=0.72):
    cyl(parts, "furniture", cx, cy, FLOOR_TOP, r, h)
    cyl(parts, "brass", cx, cy, FLOOR_TOP + h * 0.2, r + 0.015, 0.06)
    cyl(parts, "brass", cx, cy, FLOOR_TOP + h * 0.72, r + 0.015, 0.06)


def interior(parts, type, w, d, height):
    """Furnish the inside; the player can walk in through the door."""
    hx, hy = w / 2, d / 2
    # a glowing ceiling lamp common to every building
    box(parts, "lamp", 0, 0, height - 0.5, 0.26, 0.26, 0.3)
    box(parts, "trim", 0, 0, height - 0.28, 0.06, 0.06, 0.45)  # cord
    ft = FLOOR_TOP
    if type == 0:  # cottage: bed, table + stools, wall shelf, rug
        box(parts, "furniture", -hx + 1.1, hy - 1.0, ft + 0.15, 2.0, 1.2, 0.3)   # bed base
        box(parts, "fabric", -hx + 1.15, hy - 1.0, ft + 0.42, 1.8, 1.1, 0.22)    # mattress
        box(parts, "fabric", -hx + 0.45, hy - 1.0, ft + 0.66, 0.5, 0.9, 0.18)    # pillow (clear of mattress)
        table(parts, hx - 1.4, -hy + 1.4)
        stool(parts, hx - 1.4, -hy + 2.4)
        stool(parts, hx - 2.3, -hy + 1.4)
        box(parts, "furniture", hx - 0.18, 0, 1.5, 0.3, d * 0.5, 0.1)            # wall shelf
        box(parts, "fabric", 0.4, 0.4, ft + 0.02, 2.2, 2.2, 0.04)               # rug
    elif type == 1:  # forge: anvil, workbench, glowing hearth, tool rack, barrel
        box(parts, "furniture", 0.6, -0.4, ft + 0.15, 0.7, 0.7, 0.3)            # anvil stump
        box(parts, "metal", 0.6, -0.4, ft + 0.42, 0.3, 0.4, 0.3)               # anvil waist
        box(parts, "metal", 0.6, -0.4, ft + 0.62, 0.5, 0.95, 0.18)             # anvil top
        box(parts, "lamp", hx - 1.0, hy - 1.0, ft + 0.6, 1.1, 1.1, 1.2)        # forge glow
        box(parts, "metal", hx - 1.0, hy - 1.0, ft + 1.55, 1.2, 1.2, 0.5)      # forge hood
        box(parts, "furniture", -hx + 0.9, 0.5, ft + 0.45, 0.7, d * 0.5, 0.9)   # workbench
        for i in range(3):
            box(parts, "metal", -hx + 0.55, -1.0 + i * 0.3, 1.5, 0.05, 0.05, 0.5)  # tools on wall
        barrel(parts, hx - 0.7, -hy + 0.9)
    elif type == 2:  # warehouse: stacked crates, barrels, shelving
        crate(parts, -hx + 1.0, hy - 1.0, 0.0)
        crate(parts, -hx + 1.0, hy - 1.0, 0.6)
        crate(parts, -hx + 1.7, hy - 1.0, 0.0)
        crate(parts, hx - 1.1, hy - 1.2, 0.0, 0.7)
        crate(parts, hx - 1.1, hy - 1.2, 0.7, 0.5)
        barrel(parts, hx - 1.0, -hy + 1.0)
        barrel(parts, hx - 1.7, -hy + 1.0)
        for lvl in (0.9, 1.9):                                                   # shelving on the back wall
            box(parts, "furniture", -hx + 0.35, 0, lvl, 0.5, d - 1.4, 0.08)
        crate(parts, -hx + 0.45, -1.0, 0.9, 0.45)
        crate(parts, -hx + 0.45, 1.2, 0.0, 0.5)
    elif type == 3:  # two-story: loft with bed + ladder, downstairs table
        loft_z = height * 0.6
        box(parts, "furniture", 0, hy - 1.3, loft_z, w - 0.6, 2.4, 0.14)        # loft floor
        box(parts, "trim", 0, hy - 2.5, loft_z + 0.52, w - 0.6, 0.1, 0.9)       # loft railing
        box(parts, "furniture", 0, hy - 1.3, loft_z + 0.25, 1.9, 1.1, 0.2)      # loft bed base
        box(parts, "fabric", 0, hy - 1.3, loft_z + 0.47, 1.8, 1.0, 0.22)        # mattress
        for rung in range(6):                                                   # ladder rungs
            box(parts, "trim", 1.3, -hy + 1.0, ft + 0.3 + rung * (loft_z / 6), 0.5, 0.08, 0.06)
        box(parts, "trim", 1.05, -hy + 1.0, ft + loft_z / 2, 0.08, 0.08, loft_z)
        box(parts, "trim", 1.55, -hy + 1.0, ft + loft_z / 2, 0.08, 0.08, loft_z)
        table(parts, -hx + 1.6, -hy + 1.6)
        stool(parts, -hx + 1.6, -hy + 2.5)
    else:  # shop: counter, shelves of goods, barrels
        box(parts, "furniture", 0, -hy + 1.4, ft + 0.5, w - 1.4, 0.7, 1.0)      # counter body
        box(parts, "trim", 0, -hy + 1.4, ft + 1.05, w - 1.2, 0.8, 0.08)        # counter top
        for lvl in (0.8, 1.5, 2.2):                                             # back shelves
            box(parts, "furniture", 0, hy - 0.4, lvl, w - 1.0, 0.3, 0.08)
        for i, gx in enumerate((-1.4, -0.5, 0.5, 1.4)):                         # goods on shelves
            if i % 2:
                crate(parts, gx, hy - 0.4, 0.8, 0.3)
            else:
                crate(parts, gx, hy - 0.4, 1.5, 0.28)


# ---- house types ----

# Roofs start ROOF_SINK below the wall top so the roof underside overlaps the wall
# (no coplanar back-to-back z-fighting), and the overhang is modest so a player
# walking outside can't clip the eaves.
ROOF_SINK = 0.25


def house_cottage():
    parts = {}
    w, d, height = REF - 0.5, REF - 0.5, 3.2
    floor(parts, w, d)
    walls_with_door(parts, w, d, height)
    glow_windows(parts, w, d, height, rows=(0.5,))
    gable(parts, "roof", 0, 0, height - ROOF_SINK, w + 0.4, d + 0.4, 1.4, 0.3)
    box(parts, "chimney", w * 0.3, d * 0.26, height + 1.0, 0.6, 0.6, 1.6)
    interior(parts, 0, w, d, height)
    return parts


def house_forge():
    parts = {}
    w, d, height = REF - 0.3, REF - 0.3, 3.3
    floor(parts, w, d)
    walls_with_door(parts, w, d, height)
    glow_windows(parts, w, d, height, rows=(0.52,))
    box(parts, "roof", 0, 0, height + 0.05, w + 0.4, d + 0.4, 0.5 + ROOF_SINK)
    # big brick chimney stack
    box(parts, "chimney", -w * 0.3, d * 0.3, height + 2.0, 1.0, 1.0, 3.4)
    box(parts, "chimney", -w * 0.3, d * 0.3, height + 3.85, 1.3, 1.3, 0.5)
    box(parts, "brass", 0, -d / 2 - 0.12, height * 0.82, 2.2, 0.14, 0.4)  # vent band on the wall
    interior(parts, 1, w, d, height)
    return parts


def house_warehouse():
    parts = {}
    w, d, height = REF - 0.1, REF - 0.1, 3.35
    floor(parts, w, d)
    walls_with_door(parts, w, d, height)
    glow_windows(parts, w, d, height, rows=(0.55,))
    # stepped barrel-vault slate roof (overlapping steps, no gaps), first step sunk into the wall
    box(parts, "roof", 0, 0, height - ROOF_SINK + 0.25, w + 0.5, d + 0.4, 0.5 + ROOF_SINK)
    box(parts, "roof", 0, 0, height + 0.58, w * 0.82, d + 0.25, 0.5)
    box(parts, "roof", 0, 0, height + 0.92, w * 0.60, d + 0.12, 0.5)
    box(parts, "roof", 0, 0, height + 1.24, w * 0.36, d - 0.05, 0.5)
    box(parts, "roof", 0, 0, height + 1.52, w * 0.16, d - 0.2, 0.42)
    box(parts, "brass", 0, -d / 2 - 0.14, height * 0.3, w, 0.12, 0.3)
    interior(parts, 2, w, d, height)
    return parts


def house_twostory():
    parts = {}
    w, d, height = REF - 0.6, REF - 0.6, 4.4
    floor(parts, w, d)
    walls_with_door(parts, w, d, height)
    glow_windows(parts, w, d, height, rows=(0.26, 0.74))
    # overhang beam at the story line
    box(parts, "trim", 0, 0, height * 0.52, w + 0.5, d + 0.5, 0.3)
    gable(parts, "roof", 0, 0, height - ROOF_SINK, w + 0.5, d + 0.5, 1.7, 0.3)
    cyl(parts, "chimney", w * 0.32, d * 0.26, height + 0.9, 0.42, 2.0)
    interior(parts, 3, w, d, height)
    return parts


def house_shop():
    parts = {}
    w, d, height = REF - 0.4, REF - 0.4, 3.4
    floor(parts, w, d)
    walls_with_door(parts, w, d, height)
    glow_windows(parts, w, d, height, rows=(0.52,))
    # flat parapet roof — slab sunk into the wall top, lip sits on top
    box(parts, "roof", 0, 0, height - ROOF_SINK + 0.2, w + 0.4, d + 0.4, 0.4 + ROOF_SINK)
    for sx in (-1, 1):
        box(parts, "trim", sx * (w / 2 + 0.1), 0, height + 0.48, 0.32, d + 0.3, 0.45)
    box(parts, "trim", 0, d / 2 + 0.1, height + 0.48, w - 0.5, 0.32, 0.45)
    # awning over the door + two posts
    box(parts, "awning", 0, -d / 2 - 1.1, 2.0, 3.2, 2.2, 0.22)
    for sx in (-1.4, 1.4):
        cyl(parts, "trim", sx, -d / 2 - 2.1, 0, 0.12, 2.0)
    # sign board above the door
    box(parts, "sign", 0, -d / 2 - 0.12, height - 0.5, 2.4, 0.12, 0.7)
    interior(parts, 4, w, d, height)
    return parts


def build_lamp():
    """A steampunk gas lamp: stepped iron plinth, fluted post, brass-caged glowing
    lantern with a stepped roof and finial. Tiers interpenetrate so no faces are
    coplanar (no z-fighting). Authored in meters, base at z=0."""
    parts = {}
    ir, br = "iron", "brass"
    # plinth — each tier sinks into the one below
    cyl(parts, ir, 0, 0, 0.0, 0.28, 0.14, 8)
    cyl(parts, ir, 0, 0, 0.10, 0.21, 0.14, 8)
    box(parts, ir, 0, 0, 0.22, 0.30, 0.30, 0.10)
    # post runs from inside the plinth up to the lantern; brass collar + mid band embed it
    cyl(parts, ir, 0, 0, 0.10, 0.07, 2.0, 8)
    cyl(parts, br, 0, 0, 0.20, 0.105, 0.14, 8)
    cyl(parts, br, 0, 0, 1.12, 0.09, 0.12, 8)
    # scroll brackets flanking the lantern base
    for sx in (-1, 1):
        box(parts, ir, sx * 0.16, 0, 2.0, 0.26, 0.06, 0.06)
    ly = 2.0
    # glowing glass core inside the cage
    box(parts, "glass", 0, 0, ly + 0.37, 0.3, 0.3, 0.64)
    # brass cage: tray + top frame overlap the glass; corner posts overlap both
    box(parts, br, 0, 0, ly + 0.06, 0.44, 0.44, 0.16)
    box(parts, br, 0, 0, ly + 0.72, 0.44, 0.44, 0.14)
    for sx in (-1, 1):
        for sz in (-1, 1):
            box(parts, br, sx * 0.18, sz * 0.18, ly + 0.4, 0.05, 0.05, 0.8)
    for sx in (-1, 1):
        box(parts, br, sx * 0.18, 0, ly + 0.4, 0.05, 0.42, 0.04)
    # stepped brass roof + finial, each piece overlapping the last
    box(parts, br, 0, 0, ly + 0.82, 0.52, 0.52, 0.14)
    pyramid(parts, br, 0, 0, ly + 0.84, 0.46, 0.46, 0.36)
    cyl(parts, br, 0, 0, ly + 1.14, 0.03, 0.18, 6)
    cyl(parts, br, 0, 0, ly + 1.26, 0.065, 0.12, 8)      # finial ball
    return parts


def build_tree():
    """Stylized autumn tree normalized to canopy radius ~1.0; the client scales it
    per tree by foliageRadius and rotates by a per-tree angle. Base at z=0."""
    parts = {}
    # tapered trunk with a slight fork
    taper_cyl(parts, "bark", 0, 0, 0.0, 0.26, 0.17, 1.3, 7)
    taper_cyl(parts, "bark", 0.05, 0, 1.2, 0.15, 0.1, 0.9, 7)
    # root flares
    for ang in range(0, 360, 72):
        a = math.radians(ang)
        box(parts, "bark", math.cos(a) * 0.2, math.sin(a) * 0.2, 0.1, 0.16, 0.12, 0.3)
    # a couple of branch stubs
    box(parts, "bark", 0.3, 0.1, 1.5, 0.5, 0.1, 0.1)
    box(parts, "bark", -0.28, -0.15, 1.75, 0.45, 0.1, 0.1)
    # clustered leafy canopy
    cz = 2.1
    sphere(parts, "leaf", 0, 0, cz, 1.05)
    sphere(parts, "leaf2", 0.7, 0.35, cz - 0.25, 0.8)
    sphere(parts, "leaf", -0.65, -0.4, cz - 0.1, 0.85)
    sphere(parts, "leaf2", 0.25, -0.65, cz + 0.35, 0.72)
    sphere(parts, "leaf", -0.3, 0.55, cz + 0.3, 0.78)
    sphere(parts, "leaf2", 0.1, 0.1, cz + 0.6, 0.7)
    return parts


def build_tower():
    """Steampunk clocktower at the plaza centre (base at z=0, ~7m). Tiers overlap
    and detail is proud of the drums so nothing z-fights. The client keeps the
    spinning gear as an animated overlay on top of this."""
    parts = {}
    ir, br, st = "iron", "brass", "stone"
    # tapered stone base drum
    taper_cyl(parts, st, 0, 0, 0.0, 1.55, 1.3, 3.1, 10)
    # proud brass banding on the base (rings clearly larger than the drum)
    cyl(parts, br, 0, 0, 0.3, 1.58, 0.16, 10)
    cyl(parts, br, 0, 0, 1.5, 1.5, 0.16, 10)
    # brass cornice (overlaps base top)
    cyl(parts, br, 0, 0, 2.9, 1.48, 0.4, 10)
    # clock drum (overlaps cornice)
    cyl(parts, ir, 0, 0, 3.1, 1.3, 1.6, 10)
    # outward-facing clock faces on the four cardinal walls (layers separated in depth)
    for ox, oz, flat_x in ((1.28, 0, True), (-1.28, 0, True), (0, 1.28, False), (0, -1.28, False)):
        sign = 1 if (ox + oz) > 0 else -1
        if flat_x:
            box(parts, br, ox, oz, 3.9, 0.12, 1.0, 1.0)                    # bezel
            box(parts, "face", ox + sign * 0.1, oz, 3.9, 0.06, 0.82, 0.82)  # face
            box(parts, ir, ox + sign * 0.16, oz, 4.0, 0.05, 0.1, 0.42)     # hour hand
            box(parts, ir, ox + sign * 0.22, oz, 3.8, 0.05, 0.5, 0.09)     # minute hand (proud, no crossing)
        else:
            box(parts, br, ox, oz, 3.9, 1.0, 0.12, 1.0)
            box(parts, "face", ox, oz + sign * 0.1, 3.9, 0.82, 0.06, 0.82)
            box(parts, ir, ox, oz + sign * 0.16, 4.0, 0.1, 0.05, 0.42)
            box(parts, ir, ox, oz + sign * 0.22, 3.8, 0.5, 0.05, 0.09)
    # brass belfry ring (overlaps clock drum top at 4.7)
    cyl(parts, br, 0, 0, 4.55, 1.38, 0.35, 10)
    # cupola drum (overlaps belfry)
    cyl(parts, ir, 0, 0, 4.8, 1.02, 1.1, 10)
    # proud arched brass posts around the cupola
    for ang in range(0, 360, 45):
        a = math.radians(ang)
        box(parts, br, math.cos(a) * 1.05, math.sin(a) * 1.05, 5.35, 0.13, 0.13, 1.1)
    # brass dome (clearly larger than the cupola drum so surfaces don't z-fight) + finial
    cyl(parts, br, 0, 0, 5.55, 1.32, 0.3, 12)       # dome skirt, proud of the cupola
    sphere(parts, br, 0, 0, 5.7, 1.28, 12, 6)       # bulbous dome
    taper_cyl(parts, br, 0, 0, 6.7, 0.22, 0.05, 0.55, 6)
    sphere(parts, br, 0, 0, 7.3, 0.14, 8, 5)        # finial ball
    return parts


HOUSES = {
    "cottage": house_cottage,
    "forge": house_forge,
    "warehouse": house_warehouse,
    "twostory": house_twostory,
    "shop": house_shop,
}


def export_house(key, parts):
    reset_scene()
    for name, specs in parts.items():
        build_object(name, specs)
    for obj in bpy.context.scene.objects:
        obj.select_set(True)
    out = os.path.join(OUT_DIR, f"house_{key}.obj")
    bpy.ops.wm.obj_export(
        filepath=out,
        export_selected_objects=True,
        export_materials=False,
        export_normals=True,
        export_uv=False,
        apply_modifiers=True,
        up_axis='Y',
        forward_axis='NEGATIVE_Z',
    )
    verts = sum(len(o.data.vertices) for o in bpy.context.scene.objects)
    groups = sorted({o.name.split('.')[0] for o in bpy.context.scene.objects})
    print(f"@@HOUSE@@ {key}: {verts} verts, groups={groups}")
    return verts


total = 0
for key, builder in HOUSES.items():
    total += export_house(key, builder())


def export_prop(key, parts):
    reset_scene()
    for name, specs in parts.items():
        build_object(name, specs)
    for obj in bpy.context.scene.objects:
        obj.select_set(True)
    out = os.path.join(OUT_DIR, "..", "props")
    os.makedirs(out, exist_ok=True)
    out = os.path.join(out, f"{key}.obj")
    bpy.ops.wm.obj_export(
        filepath=out, export_selected_objects=True, export_materials=False,
        export_normals=True, export_uv=False, apply_modifiers=True,
        up_axis='Y', forward_axis='NEGATIVE_Z',
    )
    verts = sum(len(o.data.vertices) for o in bpy.context.scene.objects)
    groups = sorted({o.name.split('.')[0] for o in bpy.context.scene.objects})
    print(f"@@PROP@@ {key}: {verts} verts, groups={groups}")


def build_cosmetics():
    """Steampunk character cosmetics authored in the body frame (Blender Z=up,
    head centred at z~1.66, face toward -Y). Head pieces are drawn via the head
    joint, body pieces via the torso joint. Named groups the client selects from."""
    parts = {}
    # --- hats (felt uses the character's hat colour; brass bits are brass) ---
    # top hat
    cyl(parts, "tophat_felt", 0, 0, 1.9, 0.34, 0.05, 14)
    cyl(parts, "tophat_felt", 0, 0, 1.93, 0.21, 0.38, 14)
    cyl(parts, "tophat_brass", 0, 0, 2.06, 0.215, 0.05, 14)
    # bowler
    cyl(parts, "bowler_felt", 0, 0, 1.9, 0.31, 0.05, 14)
    sphere(parts, "bowler_felt", 0, 0, 1.96, 0.25, 12, 6)
    # flat cap (peak toward the front +Y)
    cyl(parts, "flatcap_felt", 0, -0.03, 1.94, 0.32, 0.12, 14)
    box(parts, "flatcap_felt", 0, 0.32, 1.9, 0.42, 0.26, 0.06)
    # conical paddy hat
    taper_cyl(parts, "paddyhat", 0, 0, 1.88, 0.46, 0.02, 0.42, 14)
    # clockwork top hat (mayor): taller felt crown, two brass bands, side gears
    cyl(parts, "clockhat_felt", 0, 0, 1.9, 0.36, 0.05, 16)       # brim
    cyl(parts, "clockhat_felt", 0, 0, 1.93, 0.22, 0.52, 16)      # tall crown
    cyl(parts, "clockhat_brass", 0, 0, 1.97, 0.225, 0.06, 16)    # lower band
    cyl(parts, "clockhat_brass", 0, 0, 2.34, 0.225, 0.05, 16)    # top rim
    gear_y(parts, "clockhat_gear", 0.21, 0.12, 2.12, 0.1, 8)     # right gear
    gear_y(parts, "clockhat_gear", 0.23, 0.02, 1.98, 0.065, 7)   # small gear
    # Front of the character is Blender +Y (exports to OBJ -Z, where the face is);
    # the back is Blender -Y. Hair/backpack go on the back, goggles on the front.
    # --- long hair: scalp dome hugging top/back + locks framing the face + back fall ---
    sphere(parts, "hair_long", 0, -0.05, 1.86, 0.33, 14, 8)         # crown over top/back
    box(parts, "hair_long", 0, -0.24, 1.46, 0.36, 0.14, 0.52)      # back fall to upper back
    box(parts, "hair_long", 0, -0.22, 1.18, 0.28, 0.12, 0.2)       # tapered hair tips
    for sx in (-1, 1):
        box(parts, "hair_long", sx * 0.3, 0.05, 1.52, 0.09, 0.32, 0.36)   # face-framing lock
        box(parts, "hair_long", sx * 0.28, -0.02, 1.28, 0.1, 0.22, 0.34)  # lock tail to jaw
    # --- topknot: tight scalp + raised bun ---
    sphere(parts, "hair_topknot", 0, -0.03, 1.84, 0.31, 12, 7)
    cyl(parts, "hair_topknot", 0, -0.05, 1.96, 0.08, 0.14, 8)      # bun base
    sphere(parts, "hair_topknot", 0, -0.05, 2.12, 0.18, 10, 6)     # bun
    # --- goggles on the forehead (front) ---
    for sx in (-1, 1):
        box(parts, "goggles_brass", sx * 0.14, 0.29, 1.82, 0.17, 0.07, 0.17)
        box(parts, "goggles_glass", sx * 0.14, 0.33, 1.82, 0.11, 0.02, 0.11)
        box(parts, "goggles_strap", sx * 0.3, -0.06, 1.84, 0.06, 0.42, 0.07)
    box(parts, "goggles_brass", 0, 0.29, 1.82, 0.12, 0.06, 0.06)  # nose bridge
    # --- monocle over the character's right eye (front), with a hanging chain ---
    ring_y(parts, "monocle_brass", 0.13, 0.33, 1.72, 0.085, 0.11, 16)
    disc_y(parts, "monocle_glass", 0.13, 0.335, 1.72, 0.085, 16)
    for i, dz in enumerate((1.62, 1.52, 1.42)):                   # dangling chain links
        box(parts, "monocle_chain", 0.17 + i * 0.015, 0.31, dz, 0.025, 0.025, 0.07)
    # --- handlebar mustache (front, just under the nose) ---
    box(parts, "mustache", 0, 0.32, 1.57, 0.2, 0.06, 0.05)
    for sx in (-1, 1):
        box(parts, "mustache", sx * 0.12, 0.32, 1.6, 0.06, 0.06, 0.08)   # upturned ends
    # --- brass air tank backpack (back, body frame) ---
    cyl(parts, "backpack_brass", 0, -0.34, 0.85, 0.22, 0.62, 10)
    sphere(parts, "backpack_brass", 0, -0.34, 1.47, 0.22, 10, 6)
    cyl(parts, "backpack_brass", 0.13, -0.46, 0.95, 0.04, 0.55, 6)   # pipe
    for sx in (-1, 1):
        box(parts, "backpack_strap", sx * 0.17, -0.02, 1.1, 0.06, 0.42, 0.52)
    return parts


def build_machine_boiler():
    """A riveted iron boiler with brass bands, pressure gauge, side gear and a
    tall smokestack. Authored Blender Z-up, foot at z=0; stack top ~z=3.5."""
    parts = {}
    cyl(parts, "stone", 0, 0, 0.0, 0.58, 0.22, 14)          # plinth
    cyl(parts, "iron", 0, 0, 0.2, 0.5, 1.55, 16)            # boiler barrel
    cyl(parts, "brass", 0, 0, 0.55, 0.53, 0.09, 16)         # lower band
    cyl(parts, "brass", 0, 0, 1.35, 0.53, 0.09, 16)         # upper band
    sphere(parts, "iron", 0, 0, 1.78, 0.5, 14, 7)           # domed top
    # smokestack
    cyl(parts, "iron", 0, 0, 1.9, 0.17, 1.5, 12)
    cyl(parts, "brass", 0, 0, 3.32, 0.2, 0.12, 12)          # stack rim (top ~3.44)
    # firebox door + pressure gauge on the front (+Y)
    cyl(parts, "iron", 0, 0.46, 0.55, 0.22, 0.08, 10)
    disc_y(parts, "brass", 0, 0.5, 1.15, 0.13, 12)
    # exhaust pipe looping out the back
    cyl(parts, "copper", 0.0, -0.46, 0.9, 0.07, 0.9, 8)
    box(parts, "copper", 0.0, -0.46, 1.36, 0.14, 0.14, 0.12)
    # side flywheel gear
    gear_y(parts, "brass", 0.52, 0.0, 0.8, 0.24, 9)
    return parts


def build_machine_pump():
    """A horizontal engine bed with a big flywheel, piston housing and a short
    stack. Authored Blender Z-up, foot at z=0; stack top ~z=1.9."""
    parts = {}
    box(parts, "stone", 0, 0, 0.09, 1.5, 0.8, 0.18)         # bed
    box(parts, "iron", -0.1, 0, 0.5, 0.95, 0.5, 0.62)       # engine block
    cyl(parts, "brass", 0.42, 0, 0.5, 0.13, 0.7, 10)        # piston cylinder
    box(parts, "iron", 0.72, 0, 0.5, 0.12, 0.3, 0.3)        # crosshead
    # big flywheel on the front face (+Y)
    gear_y(parts, "iron", -0.1, 0.34, 0.56, 0.42, 12)
    disc_y(parts, "brass", -0.1, 0.4, 0.56, 0.1, 10)        # hub
    # short smokestack toward the back-left
    cyl(parts, "iron", -0.55, -0.15, 0.6, 0.12, 0.95, 10)
    cyl(parts, "brass", -0.55, -0.15, 1.5, 0.15, 0.1, 10)   # rim (top ~1.6)
    # copper feed pipes
    cyl(parts, "copper", 0.2, -0.3, 0.45, 0.06, 0.55, 8)
    box(parts, "copper", 0.2, -0.3, 0.72, 0.1, 0.1, 0.1)
    return parts


export_prop("lamp", build_lamp())
export_prop("tree", build_tree())
export_prop("tower", build_tower())
export_prop("cosmetics", build_cosmetics())
export_prop("machine_boiler", build_machine_boiler())
export_prop("machine_pump", build_machine_pump())


def build_grass_blade():
    """A single grass clump of tapered curved blades, modelled to unit height
    (tip at z=1). The client stamps it per tuft and derives wind-sway from z."""
    parts = {}
    blades = [(0.0, 1.0), (1.05, 0.85), (2.1, 0.9), (3.14, 0.8), (4.2, 0.95), (5.2, 0.82)]
    for ang, hh in blades:
        dx, dy = math.cos(ang) * 0.09, math.sin(ang) * 0.09
        bx, by = math.cos(ang) * 0.11 * hh, math.sin(ang) * 0.11 * hh  # tip lean
        v = [
            (-dx, -dy, 0.0), (dx, dy, 0.0),                 # base
            (dx * 0.6 + bx, dy * 0.6 + by, hh * 0.55),      # mid
            (-dx * 0.6 + bx, -dy * 0.6 + by, hh * 0.55),
            (bx * 1.3, by * 1.3, hh),                        # tip
        ]
        parts.setdefault("blade", []).append(("raw", (v, [(0, 1, 2, 3), (3, 2, 4)])))
    return parts


export_prop("grass", build_grass_blade())
print(f"@@DONE@@ {len(HOUSES)} houses + lamp/tree/tower/grass, {total} total verts -> {os.path.normpath(OUT_DIR)}")
