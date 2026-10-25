import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace dev. */
export namespace dev {

    /** Namespace briiqn. */
    namespace briiqn {

        /** Namespace verbalize. */
        namespace verbalize {

            /** Namespace proto. */
            namespace proto {

                /** Properties of a ClientEnvelope. */
                interface IClientEnvelope {

                    /** ClientEnvelope sequenceNumber */
                    sequenceNumber?: (number|null);

                    /** ClientEnvelope join */
                    join?: (dev.briiqn.verbalize.proto.IJoinCommand|null);

                    /** ClientEnvelope movementInput */
                    movementInput?: (dev.briiqn.verbalize.proto.IMovementInputCommand|null);

                    /** ClientEnvelope voiceStream */
                    voiceStream?: (dev.briiqn.verbalize.proto.IVoiceStreamCommand|null);

                    /** ClientEnvelope npcAudioInteract */
                    npcAudioInteract?: (dev.briiqn.verbalize.proto.INpcAudioInteractCommand|null);

                    /** ClientEnvelope worldInteract */
                    worldInteract?: (dev.briiqn.verbalize.proto.IWorldInteractCommand|null);

                    /** ClientEnvelope avatarUpdate */
                    avatarUpdate?: (dev.briiqn.verbalize.proto.IAvatarUpdateCommand|null);
                }

                /** Represents a ClientEnvelope. */
                class ClientEnvelope implements IClientEnvelope {

                    /**
                     * Constructs a new ClientEnvelope.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IClientEnvelope);

                    /** ClientEnvelope sequenceNumber. */
                    public sequenceNumber: number;

                    /** ClientEnvelope join. */
                    public join?: (dev.briiqn.verbalize.proto.IJoinCommand|null);

                    /** ClientEnvelope movementInput. */
                    public movementInput?: (dev.briiqn.verbalize.proto.IMovementInputCommand|null);

                    /** ClientEnvelope voiceStream. */
                    public voiceStream?: (dev.briiqn.verbalize.proto.IVoiceStreamCommand|null);

                    /** ClientEnvelope npcAudioInteract. */
                    public npcAudioInteract?: (dev.briiqn.verbalize.proto.INpcAudioInteractCommand|null);

                    /** ClientEnvelope worldInteract. */
                    public worldInteract?: (dev.briiqn.verbalize.proto.IWorldInteractCommand|null);

                    /** ClientEnvelope avatarUpdate. */
                    public avatarUpdate?: (dev.briiqn.verbalize.proto.IAvatarUpdateCommand|null);

                    /** ClientEnvelope payload. */
                    public payload?: ("join"|"movementInput"|"voiceStream"|"npcAudioInteract"|"worldInteract"|"avatarUpdate");

                    /**
                     * Creates a new ClientEnvelope instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ClientEnvelope instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IClientEnvelope): dev.briiqn.verbalize.proto.ClientEnvelope;

                    /**
                     * Encodes the specified ClientEnvelope message. Does not implicitly {@link dev.briiqn.verbalize.proto.ClientEnvelope.verify|verify} messages.
                     * @param message ClientEnvelope message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IClientEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ClientEnvelope message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.ClientEnvelope.verify|verify} messages.
                     * @param message ClientEnvelope message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IClientEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ClientEnvelope message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ClientEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.ClientEnvelope;

                    /**
                     * Decodes a ClientEnvelope message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ClientEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.ClientEnvelope;

                    /**
                     * Verifies a ClientEnvelope message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ClientEnvelope message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ClientEnvelope
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.ClientEnvelope;

                    /**
                     * Creates a plain object from a ClientEnvelope message. Also converts values to other types if specified.
                     * @param message ClientEnvelope
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.ClientEnvelope, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ClientEnvelope to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ClientEnvelope
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a ServerEnvelope. */
                interface IServerEnvelope {

                    /** ServerEnvelope serverTick */
                    serverTick?: (number|null);

                    /** ServerEnvelope welcome */
                    welcome?: (dev.briiqn.verbalize.proto.IWelcomeEvent|null);

                    /** ServerEnvelope entityLifecycle */
                    entityLifecycle?: (dev.briiqn.verbalize.proto.IEntityLifecycleEvent|null);

                    /** ServerEnvelope entityDeltaTick */
                    entityDeltaTick?: (dev.briiqn.verbalize.proto.IEntityDeltaTickEvent|null);

                    /** ServerEnvelope worldDelta */
                    worldDelta?: (dev.briiqn.verbalize.proto.IWorldDeltaEvent|null);

                    /** ServerEnvelope voiceRelay */
                    voiceRelay?: (dev.briiqn.verbalize.proto.IVoiceRelayEvent|null);

                    /** ServerEnvelope npcStreamChunk */
                    npcStreamChunk?: (dev.briiqn.verbalize.proto.INpcStreamChunkEvent|null);

                    /** ServerEnvelope joinRejected */
                    joinRejected?: (dev.briiqn.verbalize.proto.IJoinRejectedEvent|null);

                    /** ServerEnvelope reputation */
                    reputation?: (dev.briiqn.verbalize.proto.IReputationEvent|null);
                }

                /** Represents a ServerEnvelope. */
                class ServerEnvelope implements IServerEnvelope {

                    /**
                     * Constructs a new ServerEnvelope.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IServerEnvelope);

                    /** ServerEnvelope serverTick. */
                    public serverTick: number;

                    /** ServerEnvelope welcome. */
                    public welcome?: (dev.briiqn.verbalize.proto.IWelcomeEvent|null);

                    /** ServerEnvelope entityLifecycle. */
                    public entityLifecycle?: (dev.briiqn.verbalize.proto.IEntityLifecycleEvent|null);

                    /** ServerEnvelope entityDeltaTick. */
                    public entityDeltaTick?: (dev.briiqn.verbalize.proto.IEntityDeltaTickEvent|null);

                    /** ServerEnvelope worldDelta. */
                    public worldDelta?: (dev.briiqn.verbalize.proto.IWorldDeltaEvent|null);

                    /** ServerEnvelope voiceRelay. */
                    public voiceRelay?: (dev.briiqn.verbalize.proto.IVoiceRelayEvent|null);

                    /** ServerEnvelope npcStreamChunk. */
                    public npcStreamChunk?: (dev.briiqn.verbalize.proto.INpcStreamChunkEvent|null);

                    /** ServerEnvelope joinRejected. */
                    public joinRejected?: (dev.briiqn.verbalize.proto.IJoinRejectedEvent|null);

                    /** ServerEnvelope reputation. */
                    public reputation?: (dev.briiqn.verbalize.proto.IReputationEvent|null);

                    /** ServerEnvelope payload. */
                    public payload?: ("welcome"|"entityLifecycle"|"entityDeltaTick"|"worldDelta"|"voiceRelay"|"npcStreamChunk"|"joinRejected"|"reputation");

                    /**
                     * Creates a new ServerEnvelope instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ServerEnvelope instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IServerEnvelope): dev.briiqn.verbalize.proto.ServerEnvelope;

                    /**
                     * Encodes the specified ServerEnvelope message. Does not implicitly {@link dev.briiqn.verbalize.proto.ServerEnvelope.verify|verify} messages.
                     * @param message ServerEnvelope message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IServerEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ServerEnvelope message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.ServerEnvelope.verify|verify} messages.
                     * @param message ServerEnvelope message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IServerEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ServerEnvelope message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ServerEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.ServerEnvelope;

                    /**
                     * Decodes a ServerEnvelope message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ServerEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.ServerEnvelope;

                    /**
                     * Verifies a ServerEnvelope message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ServerEnvelope message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ServerEnvelope
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.ServerEnvelope;

                    /**
                     * Creates a plain object from a ServerEnvelope message. Also converts values to other types if specified.
                     * @param message ServerEnvelope
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.ServerEnvelope, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ServerEnvelope to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ServerEnvelope
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a JoinCommand. */
                interface IJoinCommand {

                    /** JoinCommand username */
                    username?: (string|null);

                    /** JoinCommand password */
                    password?: (string|null);

                    /** JoinCommand roomCode */
                    roomCode?: (string|null);
                }

                /** Represents a JoinCommand. */
                class JoinCommand implements IJoinCommand {

                    /**
                     * Constructs a new JoinCommand.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IJoinCommand);

                    /** JoinCommand username. */
                    public username: string;

                    /** JoinCommand password. */
                    public password: string;

                    /** JoinCommand roomCode. */
                    public roomCode: string;

                    /**
                     * Creates a new JoinCommand instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns JoinCommand instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IJoinCommand): dev.briiqn.verbalize.proto.JoinCommand;

                    /**
                     * Encodes the specified JoinCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinCommand.verify|verify} messages.
                     * @param message JoinCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IJoinCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified JoinCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinCommand.verify|verify} messages.
                     * @param message JoinCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IJoinCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a JoinCommand message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns JoinCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.JoinCommand;

                    /**
                     * Decodes a JoinCommand message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns JoinCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.JoinCommand;

                    /**
                     * Verifies a JoinCommand message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a JoinCommand message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns JoinCommand
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.JoinCommand;

                    /**
                     * Creates a plain object from a JoinCommand message. Also converts values to other types if specified.
                     * @param message JoinCommand
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.JoinCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this JoinCommand to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for JoinCommand
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an AvatarUpdateCommand. */
                interface IAvatarUpdateCommand {

                    /** AvatarUpdateCommand hat */
                    hat?: (number|null);

                    /** AvatarUpdateCommand bodyColorHex */
                    bodyColorHex?: (number|null);

                    /** AvatarUpdateCommand eyes */
                    eyes?: (number|null);

                    /** AvatarUpdateCommand mouth */
                    mouth?: (number|null);

                    /** AvatarUpdateCommand hair */
                    hair?: (number|null);
                }

                /** Represents an AvatarUpdateCommand. */
                class AvatarUpdateCommand implements IAvatarUpdateCommand {

                    /**
                     * Constructs a new AvatarUpdateCommand.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IAvatarUpdateCommand);

                    /** AvatarUpdateCommand hat. */
                    public hat: number;

                    /** AvatarUpdateCommand bodyColorHex. */
                    public bodyColorHex: number;

                    /** AvatarUpdateCommand eyes. */
                    public eyes: number;

                    /** AvatarUpdateCommand mouth. */
                    public mouth: number;

                    /** AvatarUpdateCommand hair. */
                    public hair: number;

                    /**
                     * Creates a new AvatarUpdateCommand instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AvatarUpdateCommand instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IAvatarUpdateCommand): dev.briiqn.verbalize.proto.AvatarUpdateCommand;

                    /**
                     * Encodes the specified AvatarUpdateCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.AvatarUpdateCommand.verify|verify} messages.
                     * @param message AvatarUpdateCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IAvatarUpdateCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AvatarUpdateCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.AvatarUpdateCommand.verify|verify} messages.
                     * @param message AvatarUpdateCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IAvatarUpdateCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AvatarUpdateCommand message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AvatarUpdateCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.AvatarUpdateCommand;

                    /**
                     * Decodes an AvatarUpdateCommand message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AvatarUpdateCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.AvatarUpdateCommand;

                    /**
                     * Verifies an AvatarUpdateCommand message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AvatarUpdateCommand message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AvatarUpdateCommand
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.AvatarUpdateCommand;

                    /**
                     * Creates a plain object from an AvatarUpdateCommand message. Also converts values to other types if specified.
                     * @param message AvatarUpdateCommand
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.AvatarUpdateCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AvatarUpdateCommand to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for AvatarUpdateCommand
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a JoinRejectedEvent. */
                interface IJoinRejectedEvent {

                    /** JoinRejectedEvent reason */
                    reason?: (string|null);
                }

                /** Represents a JoinRejectedEvent. */
                class JoinRejectedEvent implements IJoinRejectedEvent {

                    /**
                     * Constructs a new JoinRejectedEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IJoinRejectedEvent);

                    /** JoinRejectedEvent reason. */
                    public reason: string;

                    /**
                     * Creates a new JoinRejectedEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns JoinRejectedEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IJoinRejectedEvent): dev.briiqn.verbalize.proto.JoinRejectedEvent;

                    /**
                     * Encodes the specified JoinRejectedEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinRejectedEvent.verify|verify} messages.
                     * @param message JoinRejectedEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IJoinRejectedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified JoinRejectedEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinRejectedEvent.verify|verify} messages.
                     * @param message JoinRejectedEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IJoinRejectedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a JoinRejectedEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns JoinRejectedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.JoinRejectedEvent;

                    /**
                     * Decodes a JoinRejectedEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns JoinRejectedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.JoinRejectedEvent;

                    /**
                     * Verifies a JoinRejectedEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a JoinRejectedEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns JoinRejectedEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.JoinRejectedEvent;

                    /**
                     * Creates a plain object from a JoinRejectedEvent message. Also converts values to other types if specified.
                     * @param message JoinRejectedEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.JoinRejectedEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this JoinRejectedEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for JoinRejectedEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a MovementInputCommand. */
                interface IMovementInputCommand {

                    /** MovementInputCommand keyBitmask */
                    keyBitmask?: (number|null);

                    /** MovementInputCommand yawMrad */
                    yawMrad?: (number|null);

                    /** MovementInputCommand pitchMrad */
                    pitchMrad?: (number|null);

                    /** MovementInputCommand micEnergyByte */
                    micEnergyByte?: (number|null);

                    /** MovementInputCommand faceState */
                    faceState?: (number|null);

                    /** MovementInputCommand headRollMrad */
                    headRollMrad?: (number|null);
                }

                /** Represents a MovementInputCommand. */
                class MovementInputCommand implements IMovementInputCommand {

                    /**
                     * Constructs a new MovementInputCommand.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IMovementInputCommand);

                    /** MovementInputCommand keyBitmask. */
                    public keyBitmask: number;

                    /** MovementInputCommand yawMrad. */
                    public yawMrad: number;

                    /** MovementInputCommand pitchMrad. */
                    public pitchMrad: number;

                    /** MovementInputCommand micEnergyByte. */
                    public micEnergyByte: number;

                    /** MovementInputCommand faceState. */
                    public faceState: number;

                    /** MovementInputCommand headRollMrad. */
                    public headRollMrad: number;

                    /**
                     * Creates a new MovementInputCommand instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MovementInputCommand instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IMovementInputCommand): dev.briiqn.verbalize.proto.MovementInputCommand;

                    /**
                     * Encodes the specified MovementInputCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.MovementInputCommand.verify|verify} messages.
                     * @param message MovementInputCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IMovementInputCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MovementInputCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.MovementInputCommand.verify|verify} messages.
                     * @param message MovementInputCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IMovementInputCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MovementInputCommand message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MovementInputCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.MovementInputCommand;

                    /**
                     * Decodes a MovementInputCommand message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MovementInputCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.MovementInputCommand;

                    /**
                     * Verifies a MovementInputCommand message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MovementInputCommand message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MovementInputCommand
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.MovementInputCommand;

                    /**
                     * Creates a plain object from a MovementInputCommand message. Also converts values to other types if specified.
                     * @param message MovementInputCommand
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.MovementInputCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MovementInputCommand to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for MovementInputCommand
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a VoiceStreamCommand. */
                interface IVoiceStreamCommand {

                    /** VoiceStreamCommand opusChunk */
                    opusChunk?: (Uint8Array|null);

                    /** VoiceStreamCommand chunkSeq */
                    chunkSeq?: (number|null);
                }

                /** Represents a VoiceStreamCommand. */
                class VoiceStreamCommand implements IVoiceStreamCommand {

                    /**
                     * Constructs a new VoiceStreamCommand.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IVoiceStreamCommand);

                    /** VoiceStreamCommand opusChunk. */
                    public opusChunk: Uint8Array;

                    /** VoiceStreamCommand chunkSeq. */
                    public chunkSeq: number;

                    /**
                     * Creates a new VoiceStreamCommand instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns VoiceStreamCommand instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IVoiceStreamCommand): dev.briiqn.verbalize.proto.VoiceStreamCommand;

                    /**
                     * Encodes the specified VoiceStreamCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceStreamCommand.verify|verify} messages.
                     * @param message VoiceStreamCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IVoiceStreamCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified VoiceStreamCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceStreamCommand.verify|verify} messages.
                     * @param message VoiceStreamCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IVoiceStreamCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a VoiceStreamCommand message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns VoiceStreamCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.VoiceStreamCommand;

                    /**
                     * Decodes a VoiceStreamCommand message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns VoiceStreamCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.VoiceStreamCommand;

                    /**
                     * Verifies a VoiceStreamCommand message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a VoiceStreamCommand message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns VoiceStreamCommand
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.VoiceStreamCommand;

                    /**
                     * Creates a plain object from a VoiceStreamCommand message. Also converts values to other types if specified.
                     * @param message VoiceStreamCommand
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.VoiceStreamCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this VoiceStreamCommand to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for VoiceStreamCommand
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a NpcAudioInteractCommand. */
                interface INpcAudioInteractCommand {

                    /** NpcAudioInteractCommand targetNetId */
                    targetNetId?: (number|null);

                    /** NpcAudioInteractCommand audioChunk */
                    audioChunk?: (Uint8Array|null);

                    /** NpcAudioInteractCommand transcriptHint */
                    transcriptHint?: (string|null);

                    /** NpcAudioInteractCommand isFinalChunk */
                    isFinalChunk?: (boolean|null);
                }

                /** Represents a NpcAudioInteractCommand. */
                class NpcAudioInteractCommand implements INpcAudioInteractCommand {

                    /**
                     * Constructs a new NpcAudioInteractCommand.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.INpcAudioInteractCommand);

                    /** NpcAudioInteractCommand targetNetId. */
                    public targetNetId: number;

                    /** NpcAudioInteractCommand audioChunk. */
                    public audioChunk: Uint8Array;

                    /** NpcAudioInteractCommand transcriptHint. */
                    public transcriptHint: string;

                    /** NpcAudioInteractCommand isFinalChunk. */
                    public isFinalChunk: boolean;

                    /**
                     * Creates a new NpcAudioInteractCommand instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns NpcAudioInteractCommand instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.INpcAudioInteractCommand): dev.briiqn.verbalize.proto.NpcAudioInteractCommand;

                    /**
                     * Encodes the specified NpcAudioInteractCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcAudioInteractCommand.verify|verify} messages.
                     * @param message NpcAudioInteractCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.INpcAudioInteractCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified NpcAudioInteractCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcAudioInteractCommand.verify|verify} messages.
                     * @param message NpcAudioInteractCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.INpcAudioInteractCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a NpcAudioInteractCommand message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns NpcAudioInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.NpcAudioInteractCommand;

                    /**
                     * Decodes a NpcAudioInteractCommand message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns NpcAudioInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.NpcAudioInteractCommand;

                    /**
                     * Verifies a NpcAudioInteractCommand message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a NpcAudioInteractCommand message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns NpcAudioInteractCommand
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.NpcAudioInteractCommand;

                    /**
                     * Creates a plain object from a NpcAudioInteractCommand message. Also converts values to other types if specified.
                     * @param message NpcAudioInteractCommand
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.NpcAudioInteractCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this NpcAudioInteractCommand to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for NpcAudioInteractCommand
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a WorldInteractCommand. */
                interface IWorldInteractCommand {

                    /** WorldInteractCommand gridX */
                    gridX?: (number|null);

                    /** WorldInteractCommand gridY */
                    gridY?: (number|null);

                    /** WorldInteractCommand gridZ */
                    gridZ?: (number|null);

                    /** WorldInteractCommand structureType */
                    structureType?: (number|null);
                }

                /** Represents a WorldInteractCommand. */
                class WorldInteractCommand implements IWorldInteractCommand {

                    /**
                     * Constructs a new WorldInteractCommand.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IWorldInteractCommand);

                    /** WorldInteractCommand gridX. */
                    public gridX: number;

                    /** WorldInteractCommand gridY. */
                    public gridY: number;

                    /** WorldInteractCommand gridZ. */
                    public gridZ: number;

                    /** WorldInteractCommand structureType. */
                    public structureType: number;

                    /**
                     * Creates a new WorldInteractCommand instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns WorldInteractCommand instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IWorldInteractCommand): dev.briiqn.verbalize.proto.WorldInteractCommand;

                    /**
                     * Encodes the specified WorldInteractCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldInteractCommand.verify|verify} messages.
                     * @param message WorldInteractCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IWorldInteractCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified WorldInteractCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldInteractCommand.verify|verify} messages.
                     * @param message WorldInteractCommand message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IWorldInteractCommand, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a WorldInteractCommand message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns WorldInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.WorldInteractCommand;

                    /**
                     * Decodes a WorldInteractCommand message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns WorldInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.WorldInteractCommand;

                    /**
                     * Verifies a WorldInteractCommand message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a WorldInteractCommand message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns WorldInteractCommand
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.WorldInteractCommand;

                    /**
                     * Creates a plain object from a WorldInteractCommand message. Also converts values to other types if specified.
                     * @param message WorldInteractCommand
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.WorldInteractCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this WorldInteractCommand to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for WorldInteractCommand
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** EntityType enum. */
                enum EntityType {
                    ENTITY_UNKNOWN = 0,
                    ENTITY_PLAYER = 1,
                    ENTITY_NPC = 2
                }

                /** Properties of an EntitySpawnInfo. */
                interface IEntitySpawnInfo {

                    /** EntitySpawnInfo netId */
                    netId?: (number|null);

                    /** EntitySpawnInfo type */
                    type?: (dev.briiqn.verbalize.proto.EntityType|null);

                    /** EntitySpawnInfo displayName */
                    displayName?: (string|null);

                    /** EntitySpawnInfo baseColorHex */
                    baseColorHex?: (number|null);

                    /** EntitySpawnInfo xMm */
                    xMm?: (number|null);

                    /** EntitySpawnInfo yMm */
                    yMm?: (number|null);

                    /** EntitySpawnInfo zMm */
                    zMm?: (number|null);

                    /** EntitySpawnInfo yawMrad */
                    yawMrad?: (number|null);

                    /** EntitySpawnInfo styleFlags */
                    styleFlags?: (number|null);

                    /** EntitySpawnInfo avatarHat */
                    avatarHat?: (number|null);

                    /** EntitySpawnInfo avatarEyes */
                    avatarEyes?: (number|null);

                    /** EntitySpawnInfo avatarMouth */
                    avatarMouth?: (number|null);

                    /** EntitySpawnInfo avatarHair */
                    avatarHair?: (number|null);
                }

                /** Represents an EntitySpawnInfo. */
                class EntitySpawnInfo implements IEntitySpawnInfo {

                    /**
                     * Constructs a new EntitySpawnInfo.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IEntitySpawnInfo);

                    /** EntitySpawnInfo netId. */
                    public netId: number;

                    /** EntitySpawnInfo type. */
                    public type: dev.briiqn.verbalize.proto.EntityType;

                    /** EntitySpawnInfo displayName. */
                    public displayName: string;

                    /** EntitySpawnInfo baseColorHex. */
                    public baseColorHex: number;

                    /** EntitySpawnInfo xMm. */
                    public xMm: number;

                    /** EntitySpawnInfo yMm. */
                    public yMm: number;

                    /** EntitySpawnInfo zMm. */
                    public zMm: number;

                    /** EntitySpawnInfo yawMrad. */
                    public yawMrad: number;

                    /** EntitySpawnInfo styleFlags. */
                    public styleFlags: number;

                    /** EntitySpawnInfo avatarHat. */
                    public avatarHat: number;

                    /** EntitySpawnInfo avatarEyes. */
                    public avatarEyes: number;

                    /** EntitySpawnInfo avatarMouth. */
                    public avatarMouth: number;

                    /** EntitySpawnInfo avatarHair. */
                    public avatarHair: number;

                    /**
                     * Creates a new EntitySpawnInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EntitySpawnInfo instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IEntitySpawnInfo): dev.briiqn.verbalize.proto.EntitySpawnInfo;

                    /**
                     * Encodes the specified EntitySpawnInfo message. Does not implicitly {@link dev.briiqn.verbalize.proto.EntitySpawnInfo.verify|verify} messages.
                     * @param message EntitySpawnInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IEntitySpawnInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EntitySpawnInfo message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.EntitySpawnInfo.verify|verify} messages.
                     * @param message EntitySpawnInfo message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IEntitySpawnInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EntitySpawnInfo message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns EntitySpawnInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.EntitySpawnInfo;

                    /**
                     * Decodes an EntitySpawnInfo message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns EntitySpawnInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.EntitySpawnInfo;

                    /**
                     * Verifies an EntitySpawnInfo message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EntitySpawnInfo message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns EntitySpawnInfo
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.EntitySpawnInfo;

                    /**
                     * Creates a plain object from an EntitySpawnInfo message. Also converts values to other types if specified.
                     * @param message EntitySpawnInfo
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.EntitySpawnInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EntitySpawnInfo to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for EntitySpawnInfo
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a QuantizedEntityTransform. */
                interface IQuantizedEntityTransform {

                    /** QuantizedEntityTransform netId */
                    netId?: (number|null);

                    /** QuantizedEntityTransform xMm */
                    xMm?: (number|null);

                    /** QuantizedEntityTransform yMm */
                    yMm?: (number|null);

                    /** QuantizedEntityTransform zMm */
                    zMm?: (number|null);

                    /** QuantizedEntityTransform vxMm */
                    vxMm?: (number|null);

                    /** QuantizedEntityTransform vzMm */
                    vzMm?: (number|null);

                    /** QuantizedEntityTransform yawMrad */
                    yawMrad?: (number|null);

                    /** QuantizedEntityTransform audioEnergyByte */
                    audioEnergyByte?: (number|null);

                    /** QuantizedEntityTransform vyMm */
                    vyMm?: (number|null);

                    /** QuantizedEntityTransform faceState */
                    faceState?: (number|null);

                    /** QuantizedEntityTransform pitchMrad */
                    pitchMrad?: (number|null);

                    /** QuantizedEntityTransform headRollMrad */
                    headRollMrad?: (number|null);

                    /** QuantizedEntityTransform actionState */
                    actionState?: (number|null);
                }

                /** Represents a QuantizedEntityTransform. */
                class QuantizedEntityTransform implements IQuantizedEntityTransform {

                    /**
                     * Constructs a new QuantizedEntityTransform.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IQuantizedEntityTransform);

                    /** QuantizedEntityTransform netId. */
                    public netId: number;

                    /** QuantizedEntityTransform xMm. */
                    public xMm: number;

                    /** QuantizedEntityTransform yMm. */
                    public yMm: number;

                    /** QuantizedEntityTransform zMm. */
                    public zMm: number;

                    /** QuantizedEntityTransform vxMm. */
                    public vxMm: number;

                    /** QuantizedEntityTransform vzMm. */
                    public vzMm: number;

                    /** QuantizedEntityTransform yawMrad. */
                    public yawMrad: number;

                    /** QuantizedEntityTransform audioEnergyByte. */
                    public audioEnergyByte: number;

                    /** QuantizedEntityTransform vyMm. */
                    public vyMm: number;

                    /** QuantizedEntityTransform faceState. */
                    public faceState: number;

                    /** QuantizedEntityTransform pitchMrad. */
                    public pitchMrad: number;

                    /** QuantizedEntityTransform headRollMrad. */
                    public headRollMrad: number;

                    /** QuantizedEntityTransform actionState. */
                    public actionState: number;

                    /**
                     * Creates a new QuantizedEntityTransform instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QuantizedEntityTransform instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IQuantizedEntityTransform): dev.briiqn.verbalize.proto.QuantizedEntityTransform;

                    /**
                     * Encodes the specified QuantizedEntityTransform message. Does not implicitly {@link dev.briiqn.verbalize.proto.QuantizedEntityTransform.verify|verify} messages.
                     * @param message QuantizedEntityTransform message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IQuantizedEntityTransform, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified QuantizedEntityTransform message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.QuantizedEntityTransform.verify|verify} messages.
                     * @param message QuantizedEntityTransform message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IQuantizedEntityTransform, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QuantizedEntityTransform message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns QuantizedEntityTransform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.QuantizedEntityTransform;

                    /**
                     * Decodes a QuantizedEntityTransform message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns QuantizedEntityTransform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.QuantizedEntityTransform;

                    /**
                     * Verifies a QuantizedEntityTransform message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a QuantizedEntityTransform message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns QuantizedEntityTransform
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.QuantizedEntityTransform;

                    /**
                     * Creates a plain object from a QuantizedEntityTransform message. Also converts values to other types if specified.
                     * @param message QuantizedEntityTransform
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.QuantizedEntityTransform, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this QuantizedEntityTransform to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for QuantizedEntityTransform
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a WorldDeltaRecord. */
                interface IWorldDeltaRecord {

                    /** WorldDeltaRecord gridX */
                    gridX?: (number|null);

                    /** WorldDeltaRecord gridY */
                    gridY?: (number|null);

                    /** WorldDeltaRecord gridZ */
                    gridZ?: (number|null);

                    /** WorldDeltaRecord structureType */
                    structureType?: (number|null);

                    /** WorldDeltaRecord stateFlags */
                    stateFlags?: (number|null);
                }

                /** Represents a WorldDeltaRecord. */
                class WorldDeltaRecord implements IWorldDeltaRecord {

                    /**
                     * Constructs a new WorldDeltaRecord.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IWorldDeltaRecord);

                    /** WorldDeltaRecord gridX. */
                    public gridX: number;

                    /** WorldDeltaRecord gridY. */
                    public gridY: number;

                    /** WorldDeltaRecord gridZ. */
                    public gridZ: number;

                    /** WorldDeltaRecord structureType. */
                    public structureType: number;

                    /** WorldDeltaRecord stateFlags. */
                    public stateFlags: number;

                    /**
                     * Creates a new WorldDeltaRecord instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns WorldDeltaRecord instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IWorldDeltaRecord): dev.briiqn.verbalize.proto.WorldDeltaRecord;

                    /**
                     * Encodes the specified WorldDeltaRecord message. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaRecord.verify|verify} messages.
                     * @param message WorldDeltaRecord message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IWorldDeltaRecord, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified WorldDeltaRecord message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaRecord.verify|verify} messages.
                     * @param message WorldDeltaRecord message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IWorldDeltaRecord, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a WorldDeltaRecord message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns WorldDeltaRecord
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.WorldDeltaRecord;

                    /**
                     * Decodes a WorldDeltaRecord message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns WorldDeltaRecord
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.WorldDeltaRecord;

                    /**
                     * Verifies a WorldDeltaRecord message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a WorldDeltaRecord message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns WorldDeltaRecord
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.WorldDeltaRecord;

                    /**
                     * Creates a plain object from a WorldDeltaRecord message. Also converts values to other types if specified.
                     * @param message WorldDeltaRecord
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.WorldDeltaRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this WorldDeltaRecord to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for WorldDeltaRecord
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a WelcomeEvent. */
                interface IWelcomeEvent {

                    /** WelcomeEvent assignedNetId */
                    assignedNetId?: (number|null);

                    /** WelcomeEvent tickRateHz */
                    tickRateHz?: (number|null);

                    /** WelcomeEvent worldSeed */
                    worldSeed?: (number|Long|null);

                    /** WelcomeEvent initialEntities */
                    initialEntities?: (dev.briiqn.verbalize.proto.IEntitySpawnInfo[]|null);

                    /** WelcomeEvent activeDeltas */
                    activeDeltas?: (dev.briiqn.verbalize.proto.IWorldDeltaRecord[]|null);

                    /** WelcomeEvent reputation */
                    reputation?: (number|null);
                }

                /** Represents a WelcomeEvent. */
                class WelcomeEvent implements IWelcomeEvent {

                    /**
                     * Constructs a new WelcomeEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IWelcomeEvent);

                    /** WelcomeEvent assignedNetId. */
                    public assignedNetId: number;

                    /** WelcomeEvent tickRateHz. */
                    public tickRateHz: number;

                    /** WelcomeEvent worldSeed. */
                    public worldSeed: (number|Long);

                    /** WelcomeEvent initialEntities. */
                    public initialEntities: dev.briiqn.verbalize.proto.IEntitySpawnInfo[];

                    /** WelcomeEvent activeDeltas. */
                    public activeDeltas: dev.briiqn.verbalize.proto.IWorldDeltaRecord[];

                    /** WelcomeEvent reputation. */
                    public reputation: number;

                    /**
                     * Creates a new WelcomeEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns WelcomeEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IWelcomeEvent): dev.briiqn.verbalize.proto.WelcomeEvent;

                    /**
                     * Encodes the specified WelcomeEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.WelcomeEvent.verify|verify} messages.
                     * @param message WelcomeEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IWelcomeEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified WelcomeEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WelcomeEvent.verify|verify} messages.
                     * @param message WelcomeEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IWelcomeEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a WelcomeEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns WelcomeEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.WelcomeEvent;

                    /**
                     * Decodes a WelcomeEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns WelcomeEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.WelcomeEvent;

                    /**
                     * Verifies a WelcomeEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a WelcomeEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns WelcomeEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.WelcomeEvent;

                    /**
                     * Creates a plain object from a WelcomeEvent message. Also converts values to other types if specified.
                     * @param message WelcomeEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.WelcomeEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this WelcomeEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for WelcomeEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a ReputationEvent. */
                interface IReputationEvent {

                    /** ReputationEvent reputation */
                    reputation?: (number|null);

                    /** ReputationEvent delta */
                    delta?: (number|null);

                    /** ReputationEvent reason */
                    reason?: (string|null);
                }

                /** Represents a ReputationEvent. */
                class ReputationEvent implements IReputationEvent {

                    /**
                     * Constructs a new ReputationEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IReputationEvent);

                    /** ReputationEvent reputation. */
                    public reputation: number;

                    /** ReputationEvent delta. */
                    public delta: number;

                    /** ReputationEvent reason. */
                    public reason: string;

                    /**
                     * Creates a new ReputationEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ReputationEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IReputationEvent): dev.briiqn.verbalize.proto.ReputationEvent;

                    /**
                     * Encodes the specified ReputationEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.ReputationEvent.verify|verify} messages.
                     * @param message ReputationEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IReputationEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ReputationEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.ReputationEvent.verify|verify} messages.
                     * @param message ReputationEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IReputationEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ReputationEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ReputationEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.ReputationEvent;

                    /**
                     * Decodes a ReputationEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ReputationEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.ReputationEvent;

                    /**
                     * Verifies a ReputationEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ReputationEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ReputationEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.ReputationEvent;

                    /**
                     * Creates a plain object from a ReputationEvent message. Also converts values to other types if specified.
                     * @param message ReputationEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.ReputationEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ReputationEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ReputationEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an EntityLifecycleEvent. */
                interface IEntityLifecycleEvent {

                    /** EntityLifecycleEvent spawned */
                    spawned?: (dev.briiqn.verbalize.proto.IEntitySpawnInfo[]|null);

                    /** EntityLifecycleEvent despawnedNetIds */
                    despawnedNetIds?: (number[]|null);
                }

                /** Represents an EntityLifecycleEvent. */
                class EntityLifecycleEvent implements IEntityLifecycleEvent {

                    /**
                     * Constructs a new EntityLifecycleEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IEntityLifecycleEvent);

                    /** EntityLifecycleEvent spawned. */
                    public spawned: dev.briiqn.verbalize.proto.IEntitySpawnInfo[];

                    /** EntityLifecycleEvent despawnedNetIds. */
                    public despawnedNetIds: number[];

                    /**
                     * Creates a new EntityLifecycleEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EntityLifecycleEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IEntityLifecycleEvent): dev.briiqn.verbalize.proto.EntityLifecycleEvent;

                    /**
                     * Encodes the specified EntityLifecycleEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityLifecycleEvent.verify|verify} messages.
                     * @param message EntityLifecycleEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IEntityLifecycleEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EntityLifecycleEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityLifecycleEvent.verify|verify} messages.
                     * @param message EntityLifecycleEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IEntityLifecycleEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EntityLifecycleEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns EntityLifecycleEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.EntityLifecycleEvent;

                    /**
                     * Decodes an EntityLifecycleEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns EntityLifecycleEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.EntityLifecycleEvent;

                    /**
                     * Verifies an EntityLifecycleEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EntityLifecycleEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns EntityLifecycleEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.EntityLifecycleEvent;

                    /**
                     * Creates a plain object from an EntityLifecycleEvent message. Also converts values to other types if specified.
                     * @param message EntityLifecycleEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.EntityLifecycleEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EntityLifecycleEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for EntityLifecycleEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an EntityDeltaTickEvent. */
                interface IEntityDeltaTickEvent {

                    /** EntityDeltaTickEvent ackInputSeq */
                    ackInputSeq?: (number|null);

                    /** EntityDeltaTickEvent dirtyEntities */
                    dirtyEntities?: (dev.briiqn.verbalize.proto.IQuantizedEntityTransform[]|null);
                }

                /** Represents an EntityDeltaTickEvent. */
                class EntityDeltaTickEvent implements IEntityDeltaTickEvent {

                    /**
                     * Constructs a new EntityDeltaTickEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IEntityDeltaTickEvent);

                    /** EntityDeltaTickEvent ackInputSeq. */
                    public ackInputSeq: number;

                    /** EntityDeltaTickEvent dirtyEntities. */
                    public dirtyEntities: dev.briiqn.verbalize.proto.IQuantizedEntityTransform[];

                    /**
                     * Creates a new EntityDeltaTickEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EntityDeltaTickEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IEntityDeltaTickEvent): dev.briiqn.verbalize.proto.EntityDeltaTickEvent;

                    /**
                     * Encodes the specified EntityDeltaTickEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityDeltaTickEvent.verify|verify} messages.
                     * @param message EntityDeltaTickEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IEntityDeltaTickEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EntityDeltaTickEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityDeltaTickEvent.verify|verify} messages.
                     * @param message EntityDeltaTickEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IEntityDeltaTickEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EntityDeltaTickEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns EntityDeltaTickEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.EntityDeltaTickEvent;

                    /**
                     * Decodes an EntityDeltaTickEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns EntityDeltaTickEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.EntityDeltaTickEvent;

                    /**
                     * Verifies an EntityDeltaTickEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EntityDeltaTickEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns EntityDeltaTickEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.EntityDeltaTickEvent;

                    /**
                     * Creates a plain object from an EntityDeltaTickEvent message. Also converts values to other types if specified.
                     * @param message EntityDeltaTickEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.EntityDeltaTickEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EntityDeltaTickEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for EntityDeltaTickEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a WorldDeltaEvent. */
                interface IWorldDeltaEvent {

                    /** WorldDeltaEvent deltas */
                    deltas?: (dev.briiqn.verbalize.proto.IWorldDeltaRecord[]|null);
                }

                /** Represents a WorldDeltaEvent. */
                class WorldDeltaEvent implements IWorldDeltaEvent {

                    /**
                     * Constructs a new WorldDeltaEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IWorldDeltaEvent);

                    /** WorldDeltaEvent deltas. */
                    public deltas: dev.briiqn.verbalize.proto.IWorldDeltaRecord[];

                    /**
                     * Creates a new WorldDeltaEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns WorldDeltaEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IWorldDeltaEvent): dev.briiqn.verbalize.proto.WorldDeltaEvent;

                    /**
                     * Encodes the specified WorldDeltaEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaEvent.verify|verify} messages.
                     * @param message WorldDeltaEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IWorldDeltaEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified WorldDeltaEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaEvent.verify|verify} messages.
                     * @param message WorldDeltaEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IWorldDeltaEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a WorldDeltaEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns WorldDeltaEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.WorldDeltaEvent;

                    /**
                     * Decodes a WorldDeltaEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns WorldDeltaEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.WorldDeltaEvent;

                    /**
                     * Verifies a WorldDeltaEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a WorldDeltaEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns WorldDeltaEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.WorldDeltaEvent;

                    /**
                     * Creates a plain object from a WorldDeltaEvent message. Also converts values to other types if specified.
                     * @param message WorldDeltaEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.WorldDeltaEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this WorldDeltaEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for WorldDeltaEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a VoiceRelayEvent. */
                interface IVoiceRelayEvent {

                    /** VoiceRelayEvent speakerNetId */
                    speakerNetId?: (number|null);

                    /** VoiceRelayEvent originXMm */
                    originXMm?: (number|null);

                    /** VoiceRelayEvent originZMm */
                    originZMm?: (number|null);

                    /** VoiceRelayEvent opusChunk */
                    opusChunk?: (Uint8Array|null);

                    /** VoiceRelayEvent chunkSeq */
                    chunkSeq?: (number|null);
                }

                /** Represents a VoiceRelayEvent. */
                class VoiceRelayEvent implements IVoiceRelayEvent {

                    /**
                     * Constructs a new VoiceRelayEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.IVoiceRelayEvent);

                    /** VoiceRelayEvent speakerNetId. */
                    public speakerNetId: number;

                    /** VoiceRelayEvent originXMm. */
                    public originXMm: number;

                    /** VoiceRelayEvent originZMm. */
                    public originZMm: number;

                    /** VoiceRelayEvent opusChunk. */
                    public opusChunk: Uint8Array;

                    /** VoiceRelayEvent chunkSeq. */
                    public chunkSeq: number;

                    /**
                     * Creates a new VoiceRelayEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns VoiceRelayEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.IVoiceRelayEvent): dev.briiqn.verbalize.proto.VoiceRelayEvent;

                    /**
                     * Encodes the specified VoiceRelayEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceRelayEvent.verify|verify} messages.
                     * @param message VoiceRelayEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.IVoiceRelayEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified VoiceRelayEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceRelayEvent.verify|verify} messages.
                     * @param message VoiceRelayEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.IVoiceRelayEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a VoiceRelayEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns VoiceRelayEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.VoiceRelayEvent;

                    /**
                     * Decodes a VoiceRelayEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns VoiceRelayEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.VoiceRelayEvent;

                    /**
                     * Verifies a VoiceRelayEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a VoiceRelayEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns VoiceRelayEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.VoiceRelayEvent;

                    /**
                     * Creates a plain object from a VoiceRelayEvent message. Also converts values to other types if specified.
                     * @param message VoiceRelayEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.VoiceRelayEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this VoiceRelayEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for VoiceRelayEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a NpcStreamChunkEvent. */
                interface INpcStreamChunkEvent {

                    /** NpcStreamChunkEvent interactionId */
                    interactionId?: (string|null);

                    /** NpcStreamChunkEvent npcNetId */
                    npcNetId?: (number|null);

                    /** NpcStreamChunkEvent textDelta */
                    textDelta?: (string|null);

                    /** NpcStreamChunkEvent audioChunk */
                    audioChunk?: (Uint8Array|null);

                    /** NpcStreamChunkEvent chunkIndex */
                    chunkIndex?: (number|null);

                    /** NpcStreamChunkEvent isComplete */
                    isComplete?: (boolean|null);
                }

                /** Represents a NpcStreamChunkEvent. */
                class NpcStreamChunkEvent implements INpcStreamChunkEvent {

                    /**
                     * Constructs a new NpcStreamChunkEvent.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: dev.briiqn.verbalize.proto.INpcStreamChunkEvent);

                    /** NpcStreamChunkEvent interactionId. */
                    public interactionId: string;

                    /** NpcStreamChunkEvent npcNetId. */
                    public npcNetId: number;

                    /** NpcStreamChunkEvent textDelta. */
                    public textDelta: string;

                    /** NpcStreamChunkEvent audioChunk. */
                    public audioChunk: Uint8Array;

                    /** NpcStreamChunkEvent chunkIndex. */
                    public chunkIndex: number;

                    /** NpcStreamChunkEvent isComplete. */
                    public isComplete: boolean;

                    /**
                     * Creates a new NpcStreamChunkEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns NpcStreamChunkEvent instance
                     */
                    public static create(properties?: dev.briiqn.verbalize.proto.INpcStreamChunkEvent): dev.briiqn.verbalize.proto.NpcStreamChunkEvent;

                    /**
                     * Encodes the specified NpcStreamChunkEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcStreamChunkEvent.verify|verify} messages.
                     * @param message NpcStreamChunkEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: dev.briiqn.verbalize.proto.INpcStreamChunkEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified NpcStreamChunkEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcStreamChunkEvent.verify|verify} messages.
                     * @param message NpcStreamChunkEvent message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: dev.briiqn.verbalize.proto.INpcStreamChunkEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a NpcStreamChunkEvent message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns NpcStreamChunkEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dev.briiqn.verbalize.proto.NpcStreamChunkEvent;

                    /**
                     * Decodes a NpcStreamChunkEvent message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns NpcStreamChunkEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dev.briiqn.verbalize.proto.NpcStreamChunkEvent;

                    /**
                     * Verifies a NpcStreamChunkEvent message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a NpcStreamChunkEvent message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns NpcStreamChunkEvent
                     */
                    public static fromObject(object: { [k: string]: any }): dev.briiqn.verbalize.proto.NpcStreamChunkEvent;

                    /**
                     * Creates a plain object from a NpcStreamChunkEvent message. Also converts values to other types if specified.
                     * @param message NpcStreamChunkEvent
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: dev.briiqn.verbalize.proto.NpcStreamChunkEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this NpcStreamChunkEvent to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for NpcStreamChunkEvent
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }
        }
    }
}
