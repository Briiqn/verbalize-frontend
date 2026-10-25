/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const dev = $root.dev = (() => {

    /**
     * Namespace dev.
     * @exports dev
     * @namespace
     */
    const dev = {};

    dev.briiqn = (function() {

        /**
         * Namespace briiqn.
         * @memberof dev
         * @namespace
         */
        const briiqn = {};

        briiqn.verbalize = (function() {

            /**
             * Namespace verbalize.
             * @memberof dev.briiqn
             * @namespace
             */
            const verbalize = {};

            verbalize.proto = (function() {

                /**
                 * Namespace proto.
                 * @memberof dev.briiqn.verbalize
                 * @namespace
                 */
                const proto = {};

                proto.ClientEnvelope = (function() {

                    /**
                     * Properties of a ClientEnvelope.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IClientEnvelope
                     * @property {number|null} [sequenceNumber] ClientEnvelope sequenceNumber
                     * @property {dev.briiqn.verbalize.proto.IJoinCommand|null} [join] ClientEnvelope join
                     * @property {dev.briiqn.verbalize.proto.IMovementInputCommand|null} [movementInput] ClientEnvelope movementInput
                     * @property {dev.briiqn.verbalize.proto.IVoiceStreamCommand|null} [voiceStream] ClientEnvelope voiceStream
                     * @property {dev.briiqn.verbalize.proto.INpcAudioInteractCommand|null} [npcAudioInteract] ClientEnvelope npcAudioInteract
                     * @property {dev.briiqn.verbalize.proto.IWorldInteractCommand|null} [worldInteract] ClientEnvelope worldInteract
                     * @property {dev.briiqn.verbalize.proto.IAvatarUpdateCommand|null} [avatarUpdate] ClientEnvelope avatarUpdate
                     */

                    /**
                     * Constructs a new ClientEnvelope.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a ClientEnvelope.
                     * @implements IClientEnvelope
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IClientEnvelope=} [properties] Properties to set
                     */
                    function ClientEnvelope(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ClientEnvelope sequenceNumber.
                     * @member {number} sequenceNumber
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.sequenceNumber = 0;

                    /**
                     * ClientEnvelope join.
                     * @member {dev.briiqn.verbalize.proto.IJoinCommand|null|undefined} join
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.join = null;

                    /**
                     * ClientEnvelope movementInput.
                     * @member {dev.briiqn.verbalize.proto.IMovementInputCommand|null|undefined} movementInput
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.movementInput = null;

                    /**
                     * ClientEnvelope voiceStream.
                     * @member {dev.briiqn.verbalize.proto.IVoiceStreamCommand|null|undefined} voiceStream
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.voiceStream = null;

                    /**
                     * ClientEnvelope npcAudioInteract.
                     * @member {dev.briiqn.verbalize.proto.INpcAudioInteractCommand|null|undefined} npcAudioInteract
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.npcAudioInteract = null;

                    /**
                     * ClientEnvelope worldInteract.
                     * @member {dev.briiqn.verbalize.proto.IWorldInteractCommand|null|undefined} worldInteract
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.worldInteract = null;

                    /**
                     * ClientEnvelope avatarUpdate.
                     * @member {dev.briiqn.verbalize.proto.IAvatarUpdateCommand|null|undefined} avatarUpdate
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    ClientEnvelope.prototype.avatarUpdate = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * ClientEnvelope payload.
                     * @member {"join"|"movementInput"|"voiceStream"|"npcAudioInteract"|"worldInteract"|"avatarUpdate"|undefined} payload
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     */
                    Object.defineProperty(ClientEnvelope.prototype, "payload", {
                        get: $util.oneOfGetter($oneOfFields = ["join", "movementInput", "voiceStream", "npcAudioInteract", "worldInteract", "avatarUpdate"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new ClientEnvelope instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IClientEnvelope=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.ClientEnvelope} ClientEnvelope instance
                     */
                    ClientEnvelope.create = function create(properties) {
                        return new ClientEnvelope(properties);
                    };

                    /**
                     * Encodes the specified ClientEnvelope message. Does not implicitly {@link dev.briiqn.verbalize.proto.ClientEnvelope.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IClientEnvelope} message ClientEnvelope message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ClientEnvelope.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.sequenceNumber != null && Object.hasOwnProperty.call(message, "sequenceNumber"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.sequenceNumber);
                        if (message.join != null && Object.hasOwnProperty.call(message, "join"))
                            $root.dev.briiqn.verbalize.proto.JoinCommand.encode(message.join, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
                        if (message.movementInput != null && Object.hasOwnProperty.call(message, "movementInput"))
                            $root.dev.briiqn.verbalize.proto.MovementInputCommand.encode(message.movementInput, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
                        if (message.voiceStream != null && Object.hasOwnProperty.call(message, "voiceStream"))
                            $root.dev.briiqn.verbalize.proto.VoiceStreamCommand.encode(message.voiceStream, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
                        if (message.npcAudioInteract != null && Object.hasOwnProperty.call(message, "npcAudioInteract"))
                            $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand.encode(message.npcAudioInteract, writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
                        if (message.worldInteract != null && Object.hasOwnProperty.call(message, "worldInteract"))
                            $root.dev.briiqn.verbalize.proto.WorldInteractCommand.encode(message.worldInteract, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
                        if (message.avatarUpdate != null && Object.hasOwnProperty.call(message, "avatarUpdate"))
                            $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand.encode(message.avatarUpdate, writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified ClientEnvelope message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.ClientEnvelope.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IClientEnvelope} message ClientEnvelope message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ClientEnvelope.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a ClientEnvelope message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.ClientEnvelope} ClientEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ClientEnvelope.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.ClientEnvelope();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.sequenceNumber = reader.uint32();
                                    break;
                                }
                            case 10: {
                                    message.join = $root.dev.briiqn.verbalize.proto.JoinCommand.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 11: {
                                    message.movementInput = $root.dev.briiqn.verbalize.proto.MovementInputCommand.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 12: {
                                    message.voiceStream = $root.dev.briiqn.verbalize.proto.VoiceStreamCommand.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 13: {
                                    message.npcAudioInteract = $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 14: {
                                    message.worldInteract = $root.dev.briiqn.verbalize.proto.WorldInteractCommand.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 15: {
                                    message.avatarUpdate = $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a ClientEnvelope message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.ClientEnvelope} ClientEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ClientEnvelope.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ClientEnvelope message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ClientEnvelope.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        let properties = {};
                        if (message.sequenceNumber != null && Object.hasOwnProperty.call(message, "sequenceNumber"))
                            if (!$util.isInteger(message.sequenceNumber))
                                return "sequenceNumber: integer expected";
                        if (message.join != null && Object.hasOwnProperty.call(message, "join")) {
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.JoinCommand.verify(message.join, long + 1);
                                if (error)
                                    return "join." + error;
                            }
                        }
                        if (message.movementInput != null && Object.hasOwnProperty.call(message, "movementInput")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.MovementInputCommand.verify(message.movementInput, long + 1);
                                if (error)
                                    return "movementInput." + error;
                            }
                        }
                        if (message.voiceStream != null && Object.hasOwnProperty.call(message, "voiceStream")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.VoiceStreamCommand.verify(message.voiceStream, long + 1);
                                if (error)
                                    return "voiceStream." + error;
                            }
                        }
                        if (message.npcAudioInteract != null && Object.hasOwnProperty.call(message, "npcAudioInteract")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand.verify(message.npcAudioInteract, long + 1);
                                if (error)
                                    return "npcAudioInteract." + error;
                            }
                        }
                        if (message.worldInteract != null && Object.hasOwnProperty.call(message, "worldInteract")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.WorldInteractCommand.verify(message.worldInteract, long + 1);
                                if (error)
                                    return "worldInteract." + error;
                            }
                        }
                        if (message.avatarUpdate != null && Object.hasOwnProperty.call(message, "avatarUpdate")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand.verify(message.avatarUpdate, long + 1);
                                if (error)
                                    return "avatarUpdate." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a ClientEnvelope message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.ClientEnvelope} ClientEnvelope
                     */
                    ClientEnvelope.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.ClientEnvelope)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.ClientEnvelope();
                        if (object.sequenceNumber != null)
                            message.sequenceNumber = object.sequenceNumber >>> 0;
                        if (object.join != null) {
                            if (!$util.isObject(object.join))
                                throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope.join: object expected");
                            message.join = $root.dev.briiqn.verbalize.proto.JoinCommand.fromObject(object.join, long + 1);
                        }
                        if (object.movementInput != null) {
                            if (!$util.isObject(object.movementInput))
                                throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope.movementInput: object expected");
                            message.movementInput = $root.dev.briiqn.verbalize.proto.MovementInputCommand.fromObject(object.movementInput, long + 1);
                        }
                        if (object.voiceStream != null) {
                            if (!$util.isObject(object.voiceStream))
                                throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope.voiceStream: object expected");
                            message.voiceStream = $root.dev.briiqn.verbalize.proto.VoiceStreamCommand.fromObject(object.voiceStream, long + 1);
                        }
                        if (object.npcAudioInteract != null) {
                            if (!$util.isObject(object.npcAudioInteract))
                                throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope.npcAudioInteract: object expected");
                            message.npcAudioInteract = $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand.fromObject(object.npcAudioInteract, long + 1);
                        }
                        if (object.worldInteract != null) {
                            if (!$util.isObject(object.worldInteract))
                                throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope.worldInteract: object expected");
                            message.worldInteract = $root.dev.briiqn.verbalize.proto.WorldInteractCommand.fromObject(object.worldInteract, long + 1);
                        }
                        if (object.avatarUpdate != null) {
                            if (!$util.isObject(object.avatarUpdate))
                                throw TypeError(".dev.briiqn.verbalize.proto.ClientEnvelope.avatarUpdate: object expected");
                            message.avatarUpdate = $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand.fromObject(object.avatarUpdate, long + 1);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a ClientEnvelope message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.ClientEnvelope} message ClientEnvelope
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ClientEnvelope.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults)
                            object.sequenceNumber = 0;
                        if (message.sequenceNumber != null && Object.hasOwnProperty.call(message, "sequenceNumber"))
                            object.sequenceNumber = message.sequenceNumber;
                        if (message.join != null && Object.hasOwnProperty.call(message, "join")) {
                            object.join = $root.dev.briiqn.verbalize.proto.JoinCommand.toObject(message.join, options, q + 1);
                            if (options.oneofs)
                                object.payload = "join";
                        }
                        if (message.movementInput != null && Object.hasOwnProperty.call(message, "movementInput")) {
                            object.movementInput = $root.dev.briiqn.verbalize.proto.MovementInputCommand.toObject(message.movementInput, options, q + 1);
                            if (options.oneofs)
                                object.payload = "movementInput";
                        }
                        if (message.voiceStream != null && Object.hasOwnProperty.call(message, "voiceStream")) {
                            object.voiceStream = $root.dev.briiqn.verbalize.proto.VoiceStreamCommand.toObject(message.voiceStream, options, q + 1);
                            if (options.oneofs)
                                object.payload = "voiceStream";
                        }
                        if (message.npcAudioInteract != null && Object.hasOwnProperty.call(message, "npcAudioInteract")) {
                            object.npcAudioInteract = $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand.toObject(message.npcAudioInteract, options, q + 1);
                            if (options.oneofs)
                                object.payload = "npcAudioInteract";
                        }
                        if (message.worldInteract != null && Object.hasOwnProperty.call(message, "worldInteract")) {
                            object.worldInteract = $root.dev.briiqn.verbalize.proto.WorldInteractCommand.toObject(message.worldInteract, options, q + 1);
                            if (options.oneofs)
                                object.payload = "worldInteract";
                        }
                        if (message.avatarUpdate != null && Object.hasOwnProperty.call(message, "avatarUpdate")) {
                            object.avatarUpdate = $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand.toObject(message.avatarUpdate, options, q + 1);
                            if (options.oneofs)
                                object.payload = "avatarUpdate";
                        }
                        return object;
                    };

                    /**
                     * Converts this ClientEnvelope to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ClientEnvelope.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ClientEnvelope
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.ClientEnvelope
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ClientEnvelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.ClientEnvelope";
                    };

                    return ClientEnvelope;
                })();

                proto.ServerEnvelope = (function() {

                    /**
                     * Properties of a ServerEnvelope.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IServerEnvelope
                     * @property {number|null} [serverTick] ServerEnvelope serverTick
                     * @property {dev.briiqn.verbalize.proto.IWelcomeEvent|null} [welcome] ServerEnvelope welcome
                     * @property {dev.briiqn.verbalize.proto.IEntityLifecycleEvent|null} [entityLifecycle] ServerEnvelope entityLifecycle
                     * @property {dev.briiqn.verbalize.proto.IEntityDeltaTickEvent|null} [entityDeltaTick] ServerEnvelope entityDeltaTick
                     * @property {dev.briiqn.verbalize.proto.IWorldDeltaEvent|null} [worldDelta] ServerEnvelope worldDelta
                     * @property {dev.briiqn.verbalize.proto.IVoiceRelayEvent|null} [voiceRelay] ServerEnvelope voiceRelay
                     * @property {dev.briiqn.verbalize.proto.INpcStreamChunkEvent|null} [npcStreamChunk] ServerEnvelope npcStreamChunk
                     * @property {dev.briiqn.verbalize.proto.IJoinRejectedEvent|null} [joinRejected] ServerEnvelope joinRejected
                     * @property {dev.briiqn.verbalize.proto.IReputationEvent|null} [reputation] ServerEnvelope reputation
                     */

                    /**
                     * Constructs a new ServerEnvelope.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a ServerEnvelope.
                     * @implements IServerEnvelope
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IServerEnvelope=} [properties] Properties to set
                     */
                    function ServerEnvelope(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ServerEnvelope serverTick.
                     * @member {number} serverTick
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.serverTick = 0;

                    /**
                     * ServerEnvelope welcome.
                     * @member {dev.briiqn.verbalize.proto.IWelcomeEvent|null|undefined} welcome
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.welcome = null;

                    /**
                     * ServerEnvelope entityLifecycle.
                     * @member {dev.briiqn.verbalize.proto.IEntityLifecycleEvent|null|undefined} entityLifecycle
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.entityLifecycle = null;

                    /**
                     * ServerEnvelope entityDeltaTick.
                     * @member {dev.briiqn.verbalize.proto.IEntityDeltaTickEvent|null|undefined} entityDeltaTick
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.entityDeltaTick = null;

                    /**
                     * ServerEnvelope worldDelta.
                     * @member {dev.briiqn.verbalize.proto.IWorldDeltaEvent|null|undefined} worldDelta
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.worldDelta = null;

                    /**
                     * ServerEnvelope voiceRelay.
                     * @member {dev.briiqn.verbalize.proto.IVoiceRelayEvent|null|undefined} voiceRelay
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.voiceRelay = null;

                    /**
                     * ServerEnvelope npcStreamChunk.
                     * @member {dev.briiqn.verbalize.proto.INpcStreamChunkEvent|null|undefined} npcStreamChunk
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.npcStreamChunk = null;

                    /**
                     * ServerEnvelope joinRejected.
                     * @member {dev.briiqn.verbalize.proto.IJoinRejectedEvent|null|undefined} joinRejected
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.joinRejected = null;

                    /**
                     * ServerEnvelope reputation.
                     * @member {dev.briiqn.verbalize.proto.IReputationEvent|null|undefined} reputation
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    ServerEnvelope.prototype.reputation = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * ServerEnvelope payload.
                     * @member {"welcome"|"entityLifecycle"|"entityDeltaTick"|"worldDelta"|"voiceRelay"|"npcStreamChunk"|"joinRejected"|"reputation"|undefined} payload
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     */
                    Object.defineProperty(ServerEnvelope.prototype, "payload", {
                        get: $util.oneOfGetter($oneOfFields = ["welcome", "entityLifecycle", "entityDeltaTick", "worldDelta", "voiceRelay", "npcStreamChunk", "joinRejected", "reputation"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new ServerEnvelope instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IServerEnvelope=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.ServerEnvelope} ServerEnvelope instance
                     */
                    ServerEnvelope.create = function create(properties) {
                        return new ServerEnvelope(properties);
                    };

                    /**
                     * Encodes the specified ServerEnvelope message. Does not implicitly {@link dev.briiqn.verbalize.proto.ServerEnvelope.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IServerEnvelope} message ServerEnvelope message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ServerEnvelope.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.serverTick);
                        if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome"))
                            $root.dev.briiqn.verbalize.proto.WelcomeEvent.encode(message.welcome, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
                        if (message.entityLifecycle != null && Object.hasOwnProperty.call(message, "entityLifecycle"))
                            $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent.encode(message.entityLifecycle, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
                        if (message.entityDeltaTick != null && Object.hasOwnProperty.call(message, "entityDeltaTick"))
                            $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent.encode(message.entityDeltaTick, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
                        if (message.worldDelta != null && Object.hasOwnProperty.call(message, "worldDelta"))
                            $root.dev.briiqn.verbalize.proto.WorldDeltaEvent.encode(message.worldDelta, writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
                        if (message.voiceRelay != null && Object.hasOwnProperty.call(message, "voiceRelay"))
                            $root.dev.briiqn.verbalize.proto.VoiceRelayEvent.encode(message.voiceRelay, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
                        if (message.npcStreamChunk != null && Object.hasOwnProperty.call(message, "npcStreamChunk"))
                            $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent.encode(message.npcStreamChunk, writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
                        if (message.joinRejected != null && Object.hasOwnProperty.call(message, "joinRejected"))
                            $root.dev.briiqn.verbalize.proto.JoinRejectedEvent.encode(message.joinRejected, writer.uint32(/* id 16, wireType 2 =*/130).fork(), q + 1).ldelim();
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            $root.dev.briiqn.verbalize.proto.ReputationEvent.encode(message.reputation, writer.uint32(/* id 17, wireType 2 =*/138).fork(), q + 1).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified ServerEnvelope message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.ServerEnvelope.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IServerEnvelope} message ServerEnvelope message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ServerEnvelope.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a ServerEnvelope message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.ServerEnvelope} ServerEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ServerEnvelope.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.ServerEnvelope();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.serverTick = reader.uint32();
                                    break;
                                }
                            case 10: {
                                    message.welcome = $root.dev.briiqn.verbalize.proto.WelcomeEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 11: {
                                    message.entityLifecycle = $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 12: {
                                    message.entityDeltaTick = $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 13: {
                                    message.worldDelta = $root.dev.briiqn.verbalize.proto.WorldDeltaEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 14: {
                                    message.voiceRelay = $root.dev.briiqn.verbalize.proto.VoiceRelayEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 15: {
                                    message.npcStreamChunk = $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 16: {
                                    message.joinRejected = $root.dev.briiqn.verbalize.proto.JoinRejectedEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            case 17: {
                                    message.reputation = $root.dev.briiqn.verbalize.proto.ReputationEvent.decode(reader, reader.uint32(), undefined, long + 1);
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a ServerEnvelope message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.ServerEnvelope} ServerEnvelope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ServerEnvelope.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ServerEnvelope message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ServerEnvelope.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        let properties = {};
                        if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                            if (!$util.isInteger(message.serverTick))
                                return "serverTick: integer expected";
                        if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome")) {
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.WelcomeEvent.verify(message.welcome, long + 1);
                                if (error)
                                    return "welcome." + error;
                            }
                        }
                        if (message.entityLifecycle != null && Object.hasOwnProperty.call(message, "entityLifecycle")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent.verify(message.entityLifecycle, long + 1);
                                if (error)
                                    return "entityLifecycle." + error;
                            }
                        }
                        if (message.entityDeltaTick != null && Object.hasOwnProperty.call(message, "entityDeltaTick")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent.verify(message.entityDeltaTick, long + 1);
                                if (error)
                                    return "entityDeltaTick." + error;
                            }
                        }
                        if (message.worldDelta != null && Object.hasOwnProperty.call(message, "worldDelta")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.WorldDeltaEvent.verify(message.worldDelta, long + 1);
                                if (error)
                                    return "worldDelta." + error;
                            }
                        }
                        if (message.voiceRelay != null && Object.hasOwnProperty.call(message, "voiceRelay")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.VoiceRelayEvent.verify(message.voiceRelay, long + 1);
                                if (error)
                                    return "voiceRelay." + error;
                            }
                        }
                        if (message.npcStreamChunk != null && Object.hasOwnProperty.call(message, "npcStreamChunk")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent.verify(message.npcStreamChunk, long + 1);
                                if (error)
                                    return "npcStreamChunk." + error;
                            }
                        }
                        if (message.joinRejected != null && Object.hasOwnProperty.call(message, "joinRejected")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.JoinRejectedEvent.verify(message.joinRejected, long + 1);
                                if (error)
                                    return "joinRejected." + error;
                            }
                        }
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation")) {
                            if (properties.payload === 1)
                                return "payload: multiple values";
                            properties.payload = 1;
                            {
                                let error = $root.dev.briiqn.verbalize.proto.ReputationEvent.verify(message.reputation, long + 1);
                                if (error)
                                    return "reputation." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a ServerEnvelope message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.ServerEnvelope} ServerEnvelope
                     */
                    ServerEnvelope.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.ServerEnvelope)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.ServerEnvelope();
                        if (object.serverTick != null)
                            message.serverTick = object.serverTick >>> 0;
                        if (object.welcome != null) {
                            if (!$util.isObject(object.welcome))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.welcome: object expected");
                            message.welcome = $root.dev.briiqn.verbalize.proto.WelcomeEvent.fromObject(object.welcome, long + 1);
                        }
                        if (object.entityLifecycle != null) {
                            if (!$util.isObject(object.entityLifecycle))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.entityLifecycle: object expected");
                            message.entityLifecycle = $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent.fromObject(object.entityLifecycle, long + 1);
                        }
                        if (object.entityDeltaTick != null) {
                            if (!$util.isObject(object.entityDeltaTick))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.entityDeltaTick: object expected");
                            message.entityDeltaTick = $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent.fromObject(object.entityDeltaTick, long + 1);
                        }
                        if (object.worldDelta != null) {
                            if (!$util.isObject(object.worldDelta))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.worldDelta: object expected");
                            message.worldDelta = $root.dev.briiqn.verbalize.proto.WorldDeltaEvent.fromObject(object.worldDelta, long + 1);
                        }
                        if (object.voiceRelay != null) {
                            if (!$util.isObject(object.voiceRelay))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.voiceRelay: object expected");
                            message.voiceRelay = $root.dev.briiqn.verbalize.proto.VoiceRelayEvent.fromObject(object.voiceRelay, long + 1);
                        }
                        if (object.npcStreamChunk != null) {
                            if (!$util.isObject(object.npcStreamChunk))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.npcStreamChunk: object expected");
                            message.npcStreamChunk = $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent.fromObject(object.npcStreamChunk, long + 1);
                        }
                        if (object.joinRejected != null) {
                            if (!$util.isObject(object.joinRejected))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.joinRejected: object expected");
                            message.joinRejected = $root.dev.briiqn.verbalize.proto.JoinRejectedEvent.fromObject(object.joinRejected, long + 1);
                        }
                        if (object.reputation != null) {
                            if (!$util.isObject(object.reputation))
                                throw TypeError(".dev.briiqn.verbalize.proto.ServerEnvelope.reputation: object expected");
                            message.reputation = $root.dev.briiqn.verbalize.proto.ReputationEvent.fromObject(object.reputation, long + 1);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a ServerEnvelope message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {dev.briiqn.verbalize.proto.ServerEnvelope} message ServerEnvelope
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ServerEnvelope.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults)
                            object.serverTick = 0;
                        if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                            object.serverTick = message.serverTick;
                        if (message.welcome != null && Object.hasOwnProperty.call(message, "welcome")) {
                            object.welcome = $root.dev.briiqn.verbalize.proto.WelcomeEvent.toObject(message.welcome, options, q + 1);
                            if (options.oneofs)
                                object.payload = "welcome";
                        }
                        if (message.entityLifecycle != null && Object.hasOwnProperty.call(message, "entityLifecycle")) {
                            object.entityLifecycle = $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent.toObject(message.entityLifecycle, options, q + 1);
                            if (options.oneofs)
                                object.payload = "entityLifecycle";
                        }
                        if (message.entityDeltaTick != null && Object.hasOwnProperty.call(message, "entityDeltaTick")) {
                            object.entityDeltaTick = $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent.toObject(message.entityDeltaTick, options, q + 1);
                            if (options.oneofs)
                                object.payload = "entityDeltaTick";
                        }
                        if (message.worldDelta != null && Object.hasOwnProperty.call(message, "worldDelta")) {
                            object.worldDelta = $root.dev.briiqn.verbalize.proto.WorldDeltaEvent.toObject(message.worldDelta, options, q + 1);
                            if (options.oneofs)
                                object.payload = "worldDelta";
                        }
                        if (message.voiceRelay != null && Object.hasOwnProperty.call(message, "voiceRelay")) {
                            object.voiceRelay = $root.dev.briiqn.verbalize.proto.VoiceRelayEvent.toObject(message.voiceRelay, options, q + 1);
                            if (options.oneofs)
                                object.payload = "voiceRelay";
                        }
                        if (message.npcStreamChunk != null && Object.hasOwnProperty.call(message, "npcStreamChunk")) {
                            object.npcStreamChunk = $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent.toObject(message.npcStreamChunk, options, q + 1);
                            if (options.oneofs)
                                object.payload = "npcStreamChunk";
                        }
                        if (message.joinRejected != null && Object.hasOwnProperty.call(message, "joinRejected")) {
                            object.joinRejected = $root.dev.briiqn.verbalize.proto.JoinRejectedEvent.toObject(message.joinRejected, options, q + 1);
                            if (options.oneofs)
                                object.payload = "joinRejected";
                        }
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation")) {
                            object.reputation = $root.dev.briiqn.verbalize.proto.ReputationEvent.toObject(message.reputation, options, q + 1);
                            if (options.oneofs)
                                object.payload = "reputation";
                        }
                        return object;
                    };

                    /**
                     * Converts this ServerEnvelope to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ServerEnvelope.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ServerEnvelope
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.ServerEnvelope
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ServerEnvelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.ServerEnvelope";
                    };

                    return ServerEnvelope;
                })();

                proto.JoinCommand = (function() {

                    /**
                     * Properties of a JoinCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IJoinCommand
                     * @property {string|null} [username] JoinCommand username
                     * @property {string|null} [password] JoinCommand password
                     * @property {string|null} [roomCode] JoinCommand roomCode
                     */

                    /**
                     * Constructs a new JoinCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a JoinCommand.
                     * @implements IJoinCommand
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IJoinCommand=} [properties] Properties to set
                     */
                    function JoinCommand(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * JoinCommand username.
                     * @member {string} username
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @instance
                     */
                    JoinCommand.prototype.username = "";

                    /**
                     * JoinCommand password.
                     * @member {string} password
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @instance
                     */
                    JoinCommand.prototype.password = "";

                    /**
                     * JoinCommand roomCode.
                     * @member {string} roomCode
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @instance
                     */
                    JoinCommand.prototype.roomCode = "";

                    /**
                     * Creates a new JoinCommand instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IJoinCommand=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.JoinCommand} JoinCommand instance
                     */
                    JoinCommand.create = function create(properties) {
                        return new JoinCommand(properties);
                    };

                    /**
                     * Encodes the specified JoinCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinCommand.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IJoinCommand} message JoinCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    JoinCommand.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                        if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                        if (message.roomCode != null && Object.hasOwnProperty.call(message, "roomCode"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomCode);
                        return writer;
                    };

                    /**
                     * Encodes the specified JoinCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinCommand.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IJoinCommand} message JoinCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    JoinCommand.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a JoinCommand message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.JoinCommand} JoinCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    JoinCommand.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.JoinCommand();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.username = reader.string();
                                    break;
                                }
                            case 2: {
                                    message.password = reader.string();
                                    break;
                                }
                            case 3: {
                                    message.roomCode = reader.string();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a JoinCommand message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.JoinCommand} JoinCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    JoinCommand.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a JoinCommand message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    JoinCommand.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                            if (!$util.isString(message.username))
                                return "username: string expected";
                        if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                            if (!$util.isString(message.password))
                                return "password: string expected";
                        if (message.roomCode != null && Object.hasOwnProperty.call(message, "roomCode"))
                            if (!$util.isString(message.roomCode))
                                return "roomCode: string expected";
                        return null;
                    };

                    /**
                     * Creates a JoinCommand message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.JoinCommand} JoinCommand
                     */
                    JoinCommand.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.JoinCommand)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.JoinCommand: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.JoinCommand();
                        if (object.username != null)
                            message.username = String(object.username);
                        if (object.password != null)
                            message.password = String(object.password);
                        if (object.roomCode != null)
                            message.roomCode = String(object.roomCode);
                        return message;
                    };

                    /**
                     * Creates a plain object from a JoinCommand message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.JoinCommand} message JoinCommand
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    JoinCommand.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.username = "";
                            object.password = "";
                            object.roomCode = "";
                        }
                        if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                            object.username = message.username;
                        if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                            object.password = message.password;
                        if (message.roomCode != null && Object.hasOwnProperty.call(message, "roomCode"))
                            object.roomCode = message.roomCode;
                        return object;
                    };

                    /**
                     * Converts this JoinCommand to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    JoinCommand.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for JoinCommand
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.JoinCommand
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    JoinCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.JoinCommand";
                    };

                    return JoinCommand;
                })();

                proto.AvatarUpdateCommand = (function() {

                    /**
                     * Properties of an AvatarUpdateCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IAvatarUpdateCommand
                     * @property {number|null} [hat] AvatarUpdateCommand hat
                     * @property {number|null} [bodyColorHex] AvatarUpdateCommand bodyColorHex
                     * @property {number|null} [eyes] AvatarUpdateCommand eyes
                     * @property {number|null} [mouth] AvatarUpdateCommand mouth
                     * @property {number|null} [hair] AvatarUpdateCommand hair
                     */

                    /**
                     * Constructs a new AvatarUpdateCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents an AvatarUpdateCommand.
                     * @implements IAvatarUpdateCommand
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IAvatarUpdateCommand=} [properties] Properties to set
                     */
                    function AvatarUpdateCommand(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * AvatarUpdateCommand hat.
                     * @member {number} hat
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @instance
                     */
                    AvatarUpdateCommand.prototype.hat = 0;

                    /**
                     * AvatarUpdateCommand bodyColorHex.
                     * @member {number} bodyColorHex
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @instance
                     */
                    AvatarUpdateCommand.prototype.bodyColorHex = 0;

                    /**
                     * AvatarUpdateCommand eyes.
                     * @member {number} eyes
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @instance
                     */
                    AvatarUpdateCommand.prototype.eyes = 0;

                    /**
                     * AvatarUpdateCommand mouth.
                     * @member {number} mouth
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @instance
                     */
                    AvatarUpdateCommand.prototype.mouth = 0;

                    /**
                     * AvatarUpdateCommand hair.
                     * @member {number} hair
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @instance
                     */
                    AvatarUpdateCommand.prototype.hair = 0;

                    /**
                     * Creates a new AvatarUpdateCommand instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IAvatarUpdateCommand=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.AvatarUpdateCommand} AvatarUpdateCommand instance
                     */
                    AvatarUpdateCommand.create = function create(properties) {
                        return new AvatarUpdateCommand(properties);
                    };

                    /**
                     * Encodes the specified AvatarUpdateCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.AvatarUpdateCommand.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IAvatarUpdateCommand} message AvatarUpdateCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AvatarUpdateCommand.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.hat != null && Object.hasOwnProperty.call(message, "hat"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.hat);
                        if (message.bodyColorHex != null && Object.hasOwnProperty.call(message, "bodyColorHex"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.bodyColorHex);
                        if (message.eyes != null && Object.hasOwnProperty.call(message, "eyes"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.eyes);
                        if (message.mouth != null && Object.hasOwnProperty.call(message, "mouth"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.mouth);
                        if (message.hair != null && Object.hasOwnProperty.call(message, "hair"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.hair);
                        return writer;
                    };

                    /**
                     * Encodes the specified AvatarUpdateCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.AvatarUpdateCommand.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IAvatarUpdateCommand} message AvatarUpdateCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AvatarUpdateCommand.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes an AvatarUpdateCommand message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.AvatarUpdateCommand} AvatarUpdateCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AvatarUpdateCommand.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.hat = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.bodyColorHex = reader.uint32();
                                    break;
                                }
                            case 3: {
                                    message.eyes = reader.uint32();
                                    break;
                                }
                            case 4: {
                                    message.mouth = reader.uint32();
                                    break;
                                }
                            case 5: {
                                    message.hair = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes an AvatarUpdateCommand message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.AvatarUpdateCommand} AvatarUpdateCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AvatarUpdateCommand.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an AvatarUpdateCommand message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    AvatarUpdateCommand.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.hat != null && Object.hasOwnProperty.call(message, "hat"))
                            if (!$util.isInteger(message.hat))
                                return "hat: integer expected";
                        if (message.bodyColorHex != null && Object.hasOwnProperty.call(message, "bodyColorHex"))
                            if (!$util.isInteger(message.bodyColorHex))
                                return "bodyColorHex: integer expected";
                        if (message.eyes != null && Object.hasOwnProperty.call(message, "eyes"))
                            if (!$util.isInteger(message.eyes))
                                return "eyes: integer expected";
                        if (message.mouth != null && Object.hasOwnProperty.call(message, "mouth"))
                            if (!$util.isInteger(message.mouth))
                                return "mouth: integer expected";
                        if (message.hair != null && Object.hasOwnProperty.call(message, "hair"))
                            if (!$util.isInteger(message.hair))
                                return "hair: integer expected";
                        return null;
                    };

                    /**
                     * Creates an AvatarUpdateCommand message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.AvatarUpdateCommand} AvatarUpdateCommand
                     */
                    AvatarUpdateCommand.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.AvatarUpdateCommand: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.AvatarUpdateCommand();
                        if (object.hat != null)
                            message.hat = object.hat >>> 0;
                        if (object.bodyColorHex != null)
                            message.bodyColorHex = object.bodyColorHex >>> 0;
                        if (object.eyes != null)
                            message.eyes = object.eyes >>> 0;
                        if (object.mouth != null)
                            message.mouth = object.mouth >>> 0;
                        if (object.hair != null)
                            message.hair = object.hair >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from an AvatarUpdateCommand message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.AvatarUpdateCommand} message AvatarUpdateCommand
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    AvatarUpdateCommand.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.hat = 0;
                            object.bodyColorHex = 0;
                            object.eyes = 0;
                            object.mouth = 0;
                            object.hair = 0;
                        }
                        if (message.hat != null && Object.hasOwnProperty.call(message, "hat"))
                            object.hat = message.hat;
                        if (message.bodyColorHex != null && Object.hasOwnProperty.call(message, "bodyColorHex"))
                            object.bodyColorHex = message.bodyColorHex;
                        if (message.eyes != null && Object.hasOwnProperty.call(message, "eyes"))
                            object.eyes = message.eyes;
                        if (message.mouth != null && Object.hasOwnProperty.call(message, "mouth"))
                            object.mouth = message.mouth;
                        if (message.hair != null && Object.hasOwnProperty.call(message, "hair"))
                            object.hair = message.hair;
                        return object;
                    };

                    /**
                     * Converts this AvatarUpdateCommand to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    AvatarUpdateCommand.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for AvatarUpdateCommand
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.AvatarUpdateCommand
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    AvatarUpdateCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.AvatarUpdateCommand";
                    };

                    return AvatarUpdateCommand;
                })();

                proto.JoinRejectedEvent = (function() {

                    /**
                     * Properties of a JoinRejectedEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IJoinRejectedEvent
                     * @property {string|null} [reason] JoinRejectedEvent reason
                     */

                    /**
                     * Constructs a new JoinRejectedEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a JoinRejectedEvent.
                     * @implements IJoinRejectedEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IJoinRejectedEvent=} [properties] Properties to set
                     */
                    function JoinRejectedEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * JoinRejectedEvent reason.
                     * @member {string} reason
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @instance
                     */
                    JoinRejectedEvent.prototype.reason = "";

                    /**
                     * Creates a new JoinRejectedEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IJoinRejectedEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.JoinRejectedEvent} JoinRejectedEvent instance
                     */
                    JoinRejectedEvent.create = function create(properties) {
                        return new JoinRejectedEvent(properties);
                    };

                    /**
                     * Encodes the specified JoinRejectedEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinRejectedEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IJoinRejectedEvent} message JoinRejectedEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    JoinRejectedEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.reason);
                        return writer;
                    };

                    /**
                     * Encodes the specified JoinRejectedEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.JoinRejectedEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IJoinRejectedEvent} message JoinRejectedEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    JoinRejectedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a JoinRejectedEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.JoinRejectedEvent} JoinRejectedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    JoinRejectedEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.JoinRejectedEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.reason = reader.string();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a JoinRejectedEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.JoinRejectedEvent} JoinRejectedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    JoinRejectedEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a JoinRejectedEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    JoinRejectedEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                            if (!$util.isString(message.reason))
                                return "reason: string expected";
                        return null;
                    };

                    /**
                     * Creates a JoinRejectedEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.JoinRejectedEvent} JoinRejectedEvent
                     */
                    JoinRejectedEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.JoinRejectedEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.JoinRejectedEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.JoinRejectedEvent();
                        if (object.reason != null)
                            message.reason = String(object.reason);
                        return message;
                    };

                    /**
                     * Creates a plain object from a JoinRejectedEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.JoinRejectedEvent} message JoinRejectedEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    JoinRejectedEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults)
                            object.reason = "";
                        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                            object.reason = message.reason;
                        return object;
                    };

                    /**
                     * Converts this JoinRejectedEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    JoinRejectedEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for JoinRejectedEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.JoinRejectedEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    JoinRejectedEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.JoinRejectedEvent";
                    };

                    return JoinRejectedEvent;
                })();

                proto.MovementInputCommand = (function() {

                    /**
                     * Properties of a MovementInputCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IMovementInputCommand
                     * @property {number|null} [keyBitmask] MovementInputCommand keyBitmask
                     * @property {number|null} [yawMrad] MovementInputCommand yawMrad
                     * @property {number|null} [pitchMrad] MovementInputCommand pitchMrad
                     * @property {number|null} [micEnergyByte] MovementInputCommand micEnergyByte
                     * @property {number|null} [faceState] MovementInputCommand faceState
                     * @property {number|null} [headRollMrad] MovementInputCommand headRollMrad
                     */

                    /**
                     * Constructs a new MovementInputCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a MovementInputCommand.
                     * @implements IMovementInputCommand
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IMovementInputCommand=} [properties] Properties to set
                     */
                    function MovementInputCommand(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * MovementInputCommand keyBitmask.
                     * @member {number} keyBitmask
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     */
                    MovementInputCommand.prototype.keyBitmask = 0;

                    /**
                     * MovementInputCommand yawMrad.
                     * @member {number} yawMrad
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     */
                    MovementInputCommand.prototype.yawMrad = 0;

                    /**
                     * MovementInputCommand pitchMrad.
                     * @member {number} pitchMrad
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     */
                    MovementInputCommand.prototype.pitchMrad = 0;

                    /**
                     * MovementInputCommand micEnergyByte.
                     * @member {number} micEnergyByte
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     */
                    MovementInputCommand.prototype.micEnergyByte = 0;

                    /**
                     * MovementInputCommand faceState.
                     * @member {number} faceState
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     */
                    MovementInputCommand.prototype.faceState = 0;

                    /**
                     * MovementInputCommand headRollMrad.
                     * @member {number} headRollMrad
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     */
                    MovementInputCommand.prototype.headRollMrad = 0;

                    /**
                     * Creates a new MovementInputCommand instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IMovementInputCommand=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.MovementInputCommand} MovementInputCommand instance
                     */
                    MovementInputCommand.create = function create(properties) {
                        return new MovementInputCommand(properties);
                    };

                    /**
                     * Encodes the specified MovementInputCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.MovementInputCommand.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IMovementInputCommand} message MovementInputCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovementInputCommand.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.keyBitmask != null && Object.hasOwnProperty.call(message, "keyBitmask"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.keyBitmask);
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.yawMrad);
                        if (message.pitchMrad != null && Object.hasOwnProperty.call(message, "pitchMrad"))
                            writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.pitchMrad);
                        if (message.micEnergyByte != null && Object.hasOwnProperty.call(message, "micEnergyByte"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.micEnergyByte);
                        if (message.faceState != null && Object.hasOwnProperty.call(message, "faceState"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.faceState);
                        if (message.headRollMrad != null && Object.hasOwnProperty.call(message, "headRollMrad"))
                            writer.uint32(/* id 6, wireType 0 =*/48).sint32(message.headRollMrad);
                        return writer;
                    };

                    /**
                     * Encodes the specified MovementInputCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.MovementInputCommand.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IMovementInputCommand} message MovementInputCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovementInputCommand.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a MovementInputCommand message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.MovementInputCommand} MovementInputCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovementInputCommand.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.MovementInputCommand();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.keyBitmask = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.yawMrad = reader.sint32();
                                    break;
                                }
                            case 3: {
                                    message.pitchMrad = reader.sint32();
                                    break;
                                }
                            case 4: {
                                    message.micEnergyByte = reader.uint32();
                                    break;
                                }
                            case 5: {
                                    message.faceState = reader.uint32();
                                    break;
                                }
                            case 6: {
                                    message.headRollMrad = reader.sint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a MovementInputCommand message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.MovementInputCommand} MovementInputCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovementInputCommand.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a MovementInputCommand message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovementInputCommand.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.keyBitmask != null && Object.hasOwnProperty.call(message, "keyBitmask"))
                            if (!$util.isInteger(message.keyBitmask))
                                return "keyBitmask: integer expected";
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            if (!$util.isInteger(message.yawMrad))
                                return "yawMrad: integer expected";
                        if (message.pitchMrad != null && Object.hasOwnProperty.call(message, "pitchMrad"))
                            if (!$util.isInteger(message.pitchMrad))
                                return "pitchMrad: integer expected";
                        if (message.micEnergyByte != null && Object.hasOwnProperty.call(message, "micEnergyByte"))
                            if (!$util.isInteger(message.micEnergyByte))
                                return "micEnergyByte: integer expected";
                        if (message.faceState != null && Object.hasOwnProperty.call(message, "faceState"))
                            if (!$util.isInteger(message.faceState))
                                return "faceState: integer expected";
                        if (message.headRollMrad != null && Object.hasOwnProperty.call(message, "headRollMrad"))
                            if (!$util.isInteger(message.headRollMrad))
                                return "headRollMrad: integer expected";
                        return null;
                    };

                    /**
                     * Creates a MovementInputCommand message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.MovementInputCommand} MovementInputCommand
                     */
                    MovementInputCommand.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.MovementInputCommand)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.MovementInputCommand: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.MovementInputCommand();
                        if (object.keyBitmask != null)
                            message.keyBitmask = object.keyBitmask >>> 0;
                        if (object.yawMrad != null)
                            message.yawMrad = object.yawMrad | 0;
                        if (object.pitchMrad != null)
                            message.pitchMrad = object.pitchMrad | 0;
                        if (object.micEnergyByte != null)
                            message.micEnergyByte = object.micEnergyByte >>> 0;
                        if (object.faceState != null)
                            message.faceState = object.faceState >>> 0;
                        if (object.headRollMrad != null)
                            message.headRollMrad = object.headRollMrad | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a MovementInputCommand message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.MovementInputCommand} message MovementInputCommand
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovementInputCommand.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.keyBitmask = 0;
                            object.yawMrad = 0;
                            object.pitchMrad = 0;
                            object.micEnergyByte = 0;
                            object.faceState = 0;
                            object.headRollMrad = 0;
                        }
                        if (message.keyBitmask != null && Object.hasOwnProperty.call(message, "keyBitmask"))
                            object.keyBitmask = message.keyBitmask;
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            object.yawMrad = message.yawMrad;
                        if (message.pitchMrad != null && Object.hasOwnProperty.call(message, "pitchMrad"))
                            object.pitchMrad = message.pitchMrad;
                        if (message.micEnergyByte != null && Object.hasOwnProperty.call(message, "micEnergyByte"))
                            object.micEnergyByte = message.micEnergyByte;
                        if (message.faceState != null && Object.hasOwnProperty.call(message, "faceState"))
                            object.faceState = message.faceState;
                        if (message.headRollMrad != null && Object.hasOwnProperty.call(message, "headRollMrad"))
                            object.headRollMrad = message.headRollMrad;
                        return object;
                    };

                    /**
                     * Converts this MovementInputCommand to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovementInputCommand.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for MovementInputCommand
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.MovementInputCommand
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    MovementInputCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.MovementInputCommand";
                    };

                    return MovementInputCommand;
                })();

                proto.VoiceStreamCommand = (function() {

                    /**
                     * Properties of a VoiceStreamCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IVoiceStreamCommand
                     * @property {Uint8Array|null} [opusChunk] VoiceStreamCommand opusChunk
                     * @property {number|null} [chunkSeq] VoiceStreamCommand chunkSeq
                     */

                    /**
                     * Constructs a new VoiceStreamCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a VoiceStreamCommand.
                     * @implements IVoiceStreamCommand
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IVoiceStreamCommand=} [properties] Properties to set
                     */
                    function VoiceStreamCommand(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * VoiceStreamCommand opusChunk.
                     * @member {Uint8Array} opusChunk
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @instance
                     */
                    VoiceStreamCommand.prototype.opusChunk = $util.newBuffer([]);

                    /**
                     * VoiceStreamCommand chunkSeq.
                     * @member {number} chunkSeq
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @instance
                     */
                    VoiceStreamCommand.prototype.chunkSeq = 0;

                    /**
                     * Creates a new VoiceStreamCommand instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IVoiceStreamCommand=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.VoiceStreamCommand} VoiceStreamCommand instance
                     */
                    VoiceStreamCommand.create = function create(properties) {
                        return new VoiceStreamCommand(properties);
                    };

                    /**
                     * Encodes the specified VoiceStreamCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceStreamCommand.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IVoiceStreamCommand} message VoiceStreamCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    VoiceStreamCommand.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.opusChunk != null && Object.hasOwnProperty.call(message, "opusChunk"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.opusChunk);
                        if (message.chunkSeq != null && Object.hasOwnProperty.call(message, "chunkSeq"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.chunkSeq);
                        return writer;
                    };

                    /**
                     * Encodes the specified VoiceStreamCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceStreamCommand.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IVoiceStreamCommand} message VoiceStreamCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    VoiceStreamCommand.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a VoiceStreamCommand message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.VoiceStreamCommand} VoiceStreamCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    VoiceStreamCommand.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.VoiceStreamCommand();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.opusChunk = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.chunkSeq = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a VoiceStreamCommand message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.VoiceStreamCommand} VoiceStreamCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    VoiceStreamCommand.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a VoiceStreamCommand message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    VoiceStreamCommand.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.opusChunk != null && Object.hasOwnProperty.call(message, "opusChunk"))
                            if (!(message.opusChunk && typeof message.opusChunk.length === "number" || $util.isString(message.opusChunk)))
                                return "opusChunk: buffer expected";
                        if (message.chunkSeq != null && Object.hasOwnProperty.call(message, "chunkSeq"))
                            if (!$util.isInteger(message.chunkSeq))
                                return "chunkSeq: integer expected";
                        return null;
                    };

                    /**
                     * Creates a VoiceStreamCommand message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.VoiceStreamCommand} VoiceStreamCommand
                     */
                    VoiceStreamCommand.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.VoiceStreamCommand)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.VoiceStreamCommand: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.VoiceStreamCommand();
                        if (object.opusChunk != null)
                            if (typeof object.opusChunk === "string")
                                $util.base64.decode(object.opusChunk, message.opusChunk = $util.newBuffer($util.base64.length(object.opusChunk)), 0);
                            else if (object.opusChunk.length >= 0)
                                message.opusChunk = object.opusChunk;
                        if (object.chunkSeq != null)
                            message.chunkSeq = object.chunkSeq >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a VoiceStreamCommand message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.VoiceStreamCommand} message VoiceStreamCommand
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    VoiceStreamCommand.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.opusChunk = "";
                            else {
                                object.opusChunk = [];
                                if (options.bytes !== Array)
                                    object.opusChunk = $util.newBuffer(object.opusChunk);
                            }
                            object.chunkSeq = 0;
                        }
                        if (message.opusChunk != null && Object.hasOwnProperty.call(message, "opusChunk"))
                            object.opusChunk = options.bytes === String ? $util.base64.encode(message.opusChunk, 0, message.opusChunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.opusChunk) : message.opusChunk;
                        if (message.chunkSeq != null && Object.hasOwnProperty.call(message, "chunkSeq"))
                            object.chunkSeq = message.chunkSeq;
                        return object;
                    };

                    /**
                     * Converts this VoiceStreamCommand to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    VoiceStreamCommand.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for VoiceStreamCommand
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.VoiceStreamCommand
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    VoiceStreamCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.VoiceStreamCommand";
                    };

                    return VoiceStreamCommand;
                })();

                proto.NpcAudioInteractCommand = (function() {

                    /**
                     * Properties of a NpcAudioInteractCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface INpcAudioInteractCommand
                     * @property {number|null} [targetNetId] NpcAudioInteractCommand targetNetId
                     * @property {Uint8Array|null} [audioChunk] NpcAudioInteractCommand audioChunk
                     * @property {string|null} [transcriptHint] NpcAudioInteractCommand transcriptHint
                     * @property {boolean|null} [isFinalChunk] NpcAudioInteractCommand isFinalChunk
                     */

                    /**
                     * Constructs a new NpcAudioInteractCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a NpcAudioInteractCommand.
                     * @implements INpcAudioInteractCommand
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.INpcAudioInteractCommand=} [properties] Properties to set
                     */
                    function NpcAudioInteractCommand(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * NpcAudioInteractCommand targetNetId.
                     * @member {number} targetNetId
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @instance
                     */
                    NpcAudioInteractCommand.prototype.targetNetId = 0;

                    /**
                     * NpcAudioInteractCommand audioChunk.
                     * @member {Uint8Array} audioChunk
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @instance
                     */
                    NpcAudioInteractCommand.prototype.audioChunk = $util.newBuffer([]);

                    /**
                     * NpcAudioInteractCommand transcriptHint.
                     * @member {string} transcriptHint
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @instance
                     */
                    NpcAudioInteractCommand.prototype.transcriptHint = "";

                    /**
                     * NpcAudioInteractCommand isFinalChunk.
                     * @member {boolean} isFinalChunk
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @instance
                     */
                    NpcAudioInteractCommand.prototype.isFinalChunk = false;

                    /**
                     * Creates a new NpcAudioInteractCommand instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.INpcAudioInteractCommand=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.NpcAudioInteractCommand} NpcAudioInteractCommand instance
                     */
                    NpcAudioInteractCommand.create = function create(properties) {
                        return new NpcAudioInteractCommand(properties);
                    };

                    /**
                     * Encodes the specified NpcAudioInteractCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcAudioInteractCommand.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.INpcAudioInteractCommand} message NpcAudioInteractCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    NpcAudioInteractCommand.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.targetNetId != null && Object.hasOwnProperty.call(message, "targetNetId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.targetNetId);
                        if (message.audioChunk != null && Object.hasOwnProperty.call(message, "audioChunk"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.audioChunk);
                        if (message.transcriptHint != null && Object.hasOwnProperty.call(message, "transcriptHint"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.transcriptHint);
                        if (message.isFinalChunk != null && Object.hasOwnProperty.call(message, "isFinalChunk"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isFinalChunk);
                        return writer;
                    };

                    /**
                     * Encodes the specified NpcAudioInteractCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcAudioInteractCommand.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.INpcAudioInteractCommand} message NpcAudioInteractCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    NpcAudioInteractCommand.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a NpcAudioInteractCommand message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.NpcAudioInteractCommand} NpcAudioInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    NpcAudioInteractCommand.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.targetNetId = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.audioChunk = reader.bytes();
                                    break;
                                }
                            case 3: {
                                    message.transcriptHint = reader.string();
                                    break;
                                }
                            case 4: {
                                    message.isFinalChunk = reader.bool();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a NpcAudioInteractCommand message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.NpcAudioInteractCommand} NpcAudioInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    NpcAudioInteractCommand.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a NpcAudioInteractCommand message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    NpcAudioInteractCommand.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.targetNetId != null && Object.hasOwnProperty.call(message, "targetNetId"))
                            if (!$util.isInteger(message.targetNetId))
                                return "targetNetId: integer expected";
                        if (message.audioChunk != null && Object.hasOwnProperty.call(message, "audioChunk"))
                            if (!(message.audioChunk && typeof message.audioChunk.length === "number" || $util.isString(message.audioChunk)))
                                return "audioChunk: buffer expected";
                        if (message.transcriptHint != null && Object.hasOwnProperty.call(message, "transcriptHint"))
                            if (!$util.isString(message.transcriptHint))
                                return "transcriptHint: string expected";
                        if (message.isFinalChunk != null && Object.hasOwnProperty.call(message, "isFinalChunk"))
                            if (typeof message.isFinalChunk !== "boolean")
                                return "isFinalChunk: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a NpcAudioInteractCommand message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.NpcAudioInteractCommand} NpcAudioInteractCommand
                     */
                    NpcAudioInteractCommand.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.NpcAudioInteractCommand: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.NpcAudioInteractCommand();
                        if (object.targetNetId != null)
                            message.targetNetId = object.targetNetId >>> 0;
                        if (object.audioChunk != null)
                            if (typeof object.audioChunk === "string")
                                $util.base64.decode(object.audioChunk, message.audioChunk = $util.newBuffer($util.base64.length(object.audioChunk)), 0);
                            else if (object.audioChunk.length >= 0)
                                message.audioChunk = object.audioChunk;
                        if (object.transcriptHint != null)
                            message.transcriptHint = String(object.transcriptHint);
                        if (object.isFinalChunk != null)
                            message.isFinalChunk = Boolean(object.isFinalChunk);
                        return message;
                    };

                    /**
                     * Creates a plain object from a NpcAudioInteractCommand message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.NpcAudioInteractCommand} message NpcAudioInteractCommand
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    NpcAudioInteractCommand.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.targetNetId = 0;
                            if (options.bytes === String)
                                object.audioChunk = "";
                            else {
                                object.audioChunk = [];
                                if (options.bytes !== Array)
                                    object.audioChunk = $util.newBuffer(object.audioChunk);
                            }
                            object.transcriptHint = "";
                            object.isFinalChunk = false;
                        }
                        if (message.targetNetId != null && Object.hasOwnProperty.call(message, "targetNetId"))
                            object.targetNetId = message.targetNetId;
                        if (message.audioChunk != null && Object.hasOwnProperty.call(message, "audioChunk"))
                            object.audioChunk = options.bytes === String ? $util.base64.encode(message.audioChunk, 0, message.audioChunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.audioChunk) : message.audioChunk;
                        if (message.transcriptHint != null && Object.hasOwnProperty.call(message, "transcriptHint"))
                            object.transcriptHint = message.transcriptHint;
                        if (message.isFinalChunk != null && Object.hasOwnProperty.call(message, "isFinalChunk"))
                            object.isFinalChunk = message.isFinalChunk;
                        return object;
                    };

                    /**
                     * Converts this NpcAudioInteractCommand to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    NpcAudioInteractCommand.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for NpcAudioInteractCommand
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.NpcAudioInteractCommand
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    NpcAudioInteractCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.NpcAudioInteractCommand";
                    };

                    return NpcAudioInteractCommand;
                })();

                proto.WorldInteractCommand = (function() {

                    /**
                     * Properties of a WorldInteractCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IWorldInteractCommand
                     * @property {number|null} [gridX] WorldInteractCommand gridX
                     * @property {number|null} [gridY] WorldInteractCommand gridY
                     * @property {number|null} [gridZ] WorldInteractCommand gridZ
                     * @property {number|null} [structureType] WorldInteractCommand structureType
                     */

                    /**
                     * Constructs a new WorldInteractCommand.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a WorldInteractCommand.
                     * @implements IWorldInteractCommand
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IWorldInteractCommand=} [properties] Properties to set
                     */
                    function WorldInteractCommand(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * WorldInteractCommand gridX.
                     * @member {number} gridX
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @instance
                     */
                    WorldInteractCommand.prototype.gridX = 0;

                    /**
                     * WorldInteractCommand gridY.
                     * @member {number} gridY
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @instance
                     */
                    WorldInteractCommand.prototype.gridY = 0;

                    /**
                     * WorldInteractCommand gridZ.
                     * @member {number} gridZ
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @instance
                     */
                    WorldInteractCommand.prototype.gridZ = 0;

                    /**
                     * WorldInteractCommand structureType.
                     * @member {number} structureType
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @instance
                     */
                    WorldInteractCommand.prototype.structureType = 0;

                    /**
                     * Creates a new WorldInteractCommand instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldInteractCommand=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.WorldInteractCommand} WorldInteractCommand instance
                     */
                    WorldInteractCommand.create = function create(properties) {
                        return new WorldInteractCommand(properties);
                    };

                    /**
                     * Encodes the specified WorldInteractCommand message. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldInteractCommand.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldInteractCommand} message WorldInteractCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WorldInteractCommand.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.gridX != null && Object.hasOwnProperty.call(message, "gridX"))
                            writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.gridX);
                        if (message.gridY != null && Object.hasOwnProperty.call(message, "gridY"))
                            writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.gridY);
                        if (message.gridZ != null && Object.hasOwnProperty.call(message, "gridZ"))
                            writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.gridZ);
                        if (message.structureType != null && Object.hasOwnProperty.call(message, "structureType"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.structureType);
                        return writer;
                    };

                    /**
                     * Encodes the specified WorldInteractCommand message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldInteractCommand.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldInteractCommand} message WorldInteractCommand message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WorldInteractCommand.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a WorldInteractCommand message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.WorldInteractCommand} WorldInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WorldInteractCommand.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.WorldInteractCommand();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.gridX = reader.sint32();
                                    break;
                                }
                            case 2: {
                                    message.gridY = reader.sint32();
                                    break;
                                }
                            case 3: {
                                    message.gridZ = reader.sint32();
                                    break;
                                }
                            case 4: {
                                    message.structureType = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a WorldInteractCommand message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.WorldInteractCommand} WorldInteractCommand
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WorldInteractCommand.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a WorldInteractCommand message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    WorldInteractCommand.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.gridX != null && Object.hasOwnProperty.call(message, "gridX"))
                            if (!$util.isInteger(message.gridX))
                                return "gridX: integer expected";
                        if (message.gridY != null && Object.hasOwnProperty.call(message, "gridY"))
                            if (!$util.isInteger(message.gridY))
                                return "gridY: integer expected";
                        if (message.gridZ != null && Object.hasOwnProperty.call(message, "gridZ"))
                            if (!$util.isInteger(message.gridZ))
                                return "gridZ: integer expected";
                        if (message.structureType != null && Object.hasOwnProperty.call(message, "structureType"))
                            if (!$util.isInteger(message.structureType))
                                return "structureType: integer expected";
                        return null;
                    };

                    /**
                     * Creates a WorldInteractCommand message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.WorldInteractCommand} WorldInteractCommand
                     */
                    WorldInteractCommand.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.WorldInteractCommand)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.WorldInteractCommand: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.WorldInteractCommand();
                        if (object.gridX != null)
                            message.gridX = object.gridX | 0;
                        if (object.gridY != null)
                            message.gridY = object.gridY | 0;
                        if (object.gridZ != null)
                            message.gridZ = object.gridZ | 0;
                        if (object.structureType != null)
                            message.structureType = object.structureType >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a WorldInteractCommand message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {dev.briiqn.verbalize.proto.WorldInteractCommand} message WorldInteractCommand
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    WorldInteractCommand.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.gridX = 0;
                            object.gridY = 0;
                            object.gridZ = 0;
                            object.structureType = 0;
                        }
                        if (message.gridX != null && Object.hasOwnProperty.call(message, "gridX"))
                            object.gridX = message.gridX;
                        if (message.gridY != null && Object.hasOwnProperty.call(message, "gridY"))
                            object.gridY = message.gridY;
                        if (message.gridZ != null && Object.hasOwnProperty.call(message, "gridZ"))
                            object.gridZ = message.gridZ;
                        if (message.structureType != null && Object.hasOwnProperty.call(message, "structureType"))
                            object.structureType = message.structureType;
                        return object;
                    };

                    /**
                     * Converts this WorldInteractCommand to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    WorldInteractCommand.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for WorldInteractCommand
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.WorldInteractCommand
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    WorldInteractCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.WorldInteractCommand";
                    };

                    return WorldInteractCommand;
                })();

                /**
                 * EntityType enum.
                 * @name dev.briiqn.verbalize.proto.EntityType
                 * @enum {number}
                 * @property {number} ENTITY_UNKNOWN=0 ENTITY_UNKNOWN value
                 * @property {number} ENTITY_PLAYER=1 ENTITY_PLAYER value
                 * @property {number} ENTITY_NPC=2 ENTITY_NPC value
                 */
                proto.EntityType = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "ENTITY_UNKNOWN"] = 0;
                    values[valuesById[1] = "ENTITY_PLAYER"] = 1;
                    values[valuesById[2] = "ENTITY_NPC"] = 2;
                    return values;
                })();

                proto.EntitySpawnInfo = (function() {

                    /**
                     * Properties of an EntitySpawnInfo.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IEntitySpawnInfo
                     * @property {number|null} [netId] EntitySpawnInfo netId
                     * @property {dev.briiqn.verbalize.proto.EntityType|null} [type] EntitySpawnInfo type
                     * @property {string|null} [displayName] EntitySpawnInfo displayName
                     * @property {number|null} [baseColorHex] EntitySpawnInfo baseColorHex
                     * @property {number|null} [xMm] EntitySpawnInfo xMm
                     * @property {number|null} [yMm] EntitySpawnInfo yMm
                     * @property {number|null} [zMm] EntitySpawnInfo zMm
                     * @property {number|null} [yawMrad] EntitySpawnInfo yawMrad
                     * @property {number|null} [styleFlags] EntitySpawnInfo styleFlags
                     * @property {number|null} [avatarHat] EntitySpawnInfo avatarHat
                     * @property {number|null} [avatarEyes] EntitySpawnInfo avatarEyes
                     * @property {number|null} [avatarMouth] EntitySpawnInfo avatarMouth
                     * @property {number|null} [avatarHair] EntitySpawnInfo avatarHair
                     */

                    /**
                     * Constructs a new EntitySpawnInfo.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents an EntitySpawnInfo.
                     * @implements IEntitySpawnInfo
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IEntitySpawnInfo=} [properties] Properties to set
                     */
                    function EntitySpawnInfo(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * EntitySpawnInfo netId.
                     * @member {number} netId
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.netId = 0;

                    /**
                     * EntitySpawnInfo type.
                     * @member {dev.briiqn.verbalize.proto.EntityType} type
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.type = 0;

                    /**
                     * EntitySpawnInfo displayName.
                     * @member {string} displayName
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.displayName = "";

                    /**
                     * EntitySpawnInfo baseColorHex.
                     * @member {number} baseColorHex
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.baseColorHex = 0;

                    /**
                     * EntitySpawnInfo xMm.
                     * @member {number} xMm
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.xMm = 0;

                    /**
                     * EntitySpawnInfo yMm.
                     * @member {number} yMm
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.yMm = 0;

                    /**
                     * EntitySpawnInfo zMm.
                     * @member {number} zMm
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.zMm = 0;

                    /**
                     * EntitySpawnInfo yawMrad.
                     * @member {number} yawMrad
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.yawMrad = 0;

                    /**
                     * EntitySpawnInfo styleFlags.
                     * @member {number} styleFlags
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.styleFlags = 0;

                    /**
                     * EntitySpawnInfo avatarHat.
                     * @member {number} avatarHat
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.avatarHat = 0;

                    /**
                     * EntitySpawnInfo avatarEyes.
                     * @member {number} avatarEyes
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.avatarEyes = 0;

                    /**
                     * EntitySpawnInfo avatarMouth.
                     * @member {number} avatarMouth
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.avatarMouth = 0;

                    /**
                     * EntitySpawnInfo avatarHair.
                     * @member {number} avatarHair
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     */
                    EntitySpawnInfo.prototype.avatarHair = 0;

                    /**
                     * Creates a new EntitySpawnInfo instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntitySpawnInfo=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.EntitySpawnInfo} EntitySpawnInfo instance
                     */
                    EntitySpawnInfo.create = function create(properties) {
                        return new EntitySpawnInfo(properties);
                    };

                    /**
                     * Encodes the specified EntitySpawnInfo message. Does not implicitly {@link dev.briiqn.verbalize.proto.EntitySpawnInfo.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntitySpawnInfo} message EntitySpawnInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntitySpawnInfo.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.netId != null && Object.hasOwnProperty.call(message, "netId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.netId);
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                        if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.displayName);
                        if (message.baseColorHex != null && Object.hasOwnProperty.call(message, "baseColorHex"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.baseColorHex);
                        if (message.xMm != null && Object.hasOwnProperty.call(message, "xMm"))
                            writer.uint32(/* id 5, wireType 0 =*/40).sint32(message.xMm);
                        if (message.yMm != null && Object.hasOwnProperty.call(message, "yMm"))
                            writer.uint32(/* id 6, wireType 0 =*/48).sint32(message.yMm);
                        if (message.zMm != null && Object.hasOwnProperty.call(message, "zMm"))
                            writer.uint32(/* id 7, wireType 0 =*/56).sint32(message.zMm);
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            writer.uint32(/* id 8, wireType 0 =*/64).sint32(message.yawMrad);
                        if (message.styleFlags != null && Object.hasOwnProperty.call(message, "styleFlags"))
                            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.styleFlags);
                        if (message.avatarHat != null && Object.hasOwnProperty.call(message, "avatarHat"))
                            writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.avatarHat);
                        if (message.avatarEyes != null && Object.hasOwnProperty.call(message, "avatarEyes"))
                            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.avatarEyes);
                        if (message.avatarMouth != null && Object.hasOwnProperty.call(message, "avatarMouth"))
                            writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.avatarMouth);
                        if (message.avatarHair != null && Object.hasOwnProperty.call(message, "avatarHair"))
                            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.avatarHair);
                        return writer;
                    };

                    /**
                     * Encodes the specified EntitySpawnInfo message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.EntitySpawnInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntitySpawnInfo} message EntitySpawnInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntitySpawnInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes an EntitySpawnInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.EntitySpawnInfo} EntitySpawnInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntitySpawnInfo.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.EntitySpawnInfo();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.netId = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.type = reader.int32();
                                    break;
                                }
                            case 3: {
                                    message.displayName = reader.string();
                                    break;
                                }
                            case 4: {
                                    message.baseColorHex = reader.uint32();
                                    break;
                                }
                            case 5: {
                                    message.xMm = reader.sint32();
                                    break;
                                }
                            case 6: {
                                    message.yMm = reader.sint32();
                                    break;
                                }
                            case 7: {
                                    message.zMm = reader.sint32();
                                    break;
                                }
                            case 8: {
                                    message.yawMrad = reader.sint32();
                                    break;
                                }
                            case 9: {
                                    message.styleFlags = reader.uint32();
                                    break;
                                }
                            case 10: {
                                    message.avatarHat = reader.uint32();
                                    break;
                                }
                            case 11: {
                                    message.avatarEyes = reader.uint32();
                                    break;
                                }
                            case 12: {
                                    message.avatarMouth = reader.uint32();
                                    break;
                                }
                            case 13: {
                                    message.avatarHair = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes an EntitySpawnInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.EntitySpawnInfo} EntitySpawnInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntitySpawnInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an EntitySpawnInfo message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    EntitySpawnInfo.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.netId != null && Object.hasOwnProperty.call(message, "netId"))
                            if (!$util.isInteger(message.netId))
                                return "netId: integer expected";
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            switch (message.type) {
                            default:
                                return "type: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                        if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                            if (!$util.isString(message.displayName))
                                return "displayName: string expected";
                        if (message.baseColorHex != null && Object.hasOwnProperty.call(message, "baseColorHex"))
                            if (!$util.isInteger(message.baseColorHex))
                                return "baseColorHex: integer expected";
                        if (message.xMm != null && Object.hasOwnProperty.call(message, "xMm"))
                            if (!$util.isInteger(message.xMm))
                                return "xMm: integer expected";
                        if (message.yMm != null && Object.hasOwnProperty.call(message, "yMm"))
                            if (!$util.isInteger(message.yMm))
                                return "yMm: integer expected";
                        if (message.zMm != null && Object.hasOwnProperty.call(message, "zMm"))
                            if (!$util.isInteger(message.zMm))
                                return "zMm: integer expected";
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            if (!$util.isInteger(message.yawMrad))
                                return "yawMrad: integer expected";
                        if (message.styleFlags != null && Object.hasOwnProperty.call(message, "styleFlags"))
                            if (!$util.isInteger(message.styleFlags))
                                return "styleFlags: integer expected";
                        if (message.avatarHat != null && Object.hasOwnProperty.call(message, "avatarHat"))
                            if (!$util.isInteger(message.avatarHat))
                                return "avatarHat: integer expected";
                        if (message.avatarEyes != null && Object.hasOwnProperty.call(message, "avatarEyes"))
                            if (!$util.isInteger(message.avatarEyes))
                                return "avatarEyes: integer expected";
                        if (message.avatarMouth != null && Object.hasOwnProperty.call(message, "avatarMouth"))
                            if (!$util.isInteger(message.avatarMouth))
                                return "avatarMouth: integer expected";
                        if (message.avatarHair != null && Object.hasOwnProperty.call(message, "avatarHair"))
                            if (!$util.isInteger(message.avatarHair))
                                return "avatarHair: integer expected";
                        return null;
                    };

                    /**
                     * Creates an EntitySpawnInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.EntitySpawnInfo} EntitySpawnInfo
                     */
                    EntitySpawnInfo.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.EntitySpawnInfo)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.EntitySpawnInfo: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.EntitySpawnInfo();
                        if (object.netId != null)
                            message.netId = object.netId >>> 0;
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "ENTITY_UNKNOWN":
                        case 0:
                            message.type = 0;
                            break;
                        case "ENTITY_PLAYER":
                        case 1:
                            message.type = 1;
                            break;
                        case "ENTITY_NPC":
                        case 2:
                            message.type = 2;
                            break;
                        }
                        if (object.displayName != null)
                            message.displayName = String(object.displayName);
                        if (object.baseColorHex != null)
                            message.baseColorHex = object.baseColorHex >>> 0;
                        if (object.xMm != null)
                            message.xMm = object.xMm | 0;
                        if (object.yMm != null)
                            message.yMm = object.yMm | 0;
                        if (object.zMm != null)
                            message.zMm = object.zMm | 0;
                        if (object.yawMrad != null)
                            message.yawMrad = object.yawMrad | 0;
                        if (object.styleFlags != null)
                            message.styleFlags = object.styleFlags >>> 0;
                        if (object.avatarHat != null)
                            message.avatarHat = object.avatarHat >>> 0;
                        if (object.avatarEyes != null)
                            message.avatarEyes = object.avatarEyes >>> 0;
                        if (object.avatarMouth != null)
                            message.avatarMouth = object.avatarMouth >>> 0;
                        if (object.avatarHair != null)
                            message.avatarHair = object.avatarHair >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from an EntitySpawnInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {dev.briiqn.verbalize.proto.EntitySpawnInfo} message EntitySpawnInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    EntitySpawnInfo.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.netId = 0;
                            object.type = options.enums === String ? "ENTITY_UNKNOWN" : 0;
                            object.displayName = "";
                            object.baseColorHex = 0;
                            object.xMm = 0;
                            object.yMm = 0;
                            object.zMm = 0;
                            object.yawMrad = 0;
                            object.styleFlags = 0;
                            object.avatarHat = 0;
                            object.avatarEyes = 0;
                            object.avatarMouth = 0;
                            object.avatarHair = 0;
                        }
                        if (message.netId != null && Object.hasOwnProperty.call(message, "netId"))
                            object.netId = message.netId;
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            object.type = options.enums === String ? $root.dev.briiqn.verbalize.proto.EntityType[message.type] === undefined ? message.type : $root.dev.briiqn.verbalize.proto.EntityType[message.type] : message.type;
                        if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                            object.displayName = message.displayName;
                        if (message.baseColorHex != null && Object.hasOwnProperty.call(message, "baseColorHex"))
                            object.baseColorHex = message.baseColorHex;
                        if (message.xMm != null && Object.hasOwnProperty.call(message, "xMm"))
                            object.xMm = message.xMm;
                        if (message.yMm != null && Object.hasOwnProperty.call(message, "yMm"))
                            object.yMm = message.yMm;
                        if (message.zMm != null && Object.hasOwnProperty.call(message, "zMm"))
                            object.zMm = message.zMm;
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            object.yawMrad = message.yawMrad;
                        if (message.styleFlags != null && Object.hasOwnProperty.call(message, "styleFlags"))
                            object.styleFlags = message.styleFlags;
                        if (message.avatarHat != null && Object.hasOwnProperty.call(message, "avatarHat"))
                            object.avatarHat = message.avatarHat;
                        if (message.avatarEyes != null && Object.hasOwnProperty.call(message, "avatarEyes"))
                            object.avatarEyes = message.avatarEyes;
                        if (message.avatarMouth != null && Object.hasOwnProperty.call(message, "avatarMouth"))
                            object.avatarMouth = message.avatarMouth;
                        if (message.avatarHair != null && Object.hasOwnProperty.call(message, "avatarHair"))
                            object.avatarHair = message.avatarHair;
                        return object;
                    };

                    /**
                     * Converts this EntitySpawnInfo to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    EntitySpawnInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for EntitySpawnInfo
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.EntitySpawnInfo
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    EntitySpawnInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.EntitySpawnInfo";
                    };

                    return EntitySpawnInfo;
                })();

                proto.QuantizedEntityTransform = (function() {

                    /**
                     * Properties of a QuantizedEntityTransform.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IQuantizedEntityTransform
                     * @property {number|null} [netId] QuantizedEntityTransform netId
                     * @property {number|null} [xMm] QuantizedEntityTransform xMm
                     * @property {number|null} [yMm] QuantizedEntityTransform yMm
                     * @property {number|null} [zMm] QuantizedEntityTransform zMm
                     * @property {number|null} [vxMm] QuantizedEntityTransform vxMm
                     * @property {number|null} [vzMm] QuantizedEntityTransform vzMm
                     * @property {number|null} [yawMrad] QuantizedEntityTransform yawMrad
                     * @property {number|null} [audioEnergyByte] QuantizedEntityTransform audioEnergyByte
                     * @property {number|null} [vyMm] QuantizedEntityTransform vyMm
                     * @property {number|null} [faceState] QuantizedEntityTransform faceState
                     * @property {number|null} [pitchMrad] QuantizedEntityTransform pitchMrad
                     * @property {number|null} [headRollMrad] QuantizedEntityTransform headRollMrad
                     * @property {number|null} [actionState] QuantizedEntityTransform actionState
                     */

                    /**
                     * Constructs a new QuantizedEntityTransform.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a QuantizedEntityTransform.
                     * @implements IQuantizedEntityTransform
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IQuantizedEntityTransform=} [properties] Properties to set
                     */
                    function QuantizedEntityTransform(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * QuantizedEntityTransform netId.
                     * @member {number} netId
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.netId = 0;

                    /**
                     * QuantizedEntityTransform xMm.
                     * @member {number} xMm
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.xMm = 0;

                    /**
                     * QuantizedEntityTransform yMm.
                     * @member {number} yMm
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.yMm = 0;

                    /**
                     * QuantizedEntityTransform zMm.
                     * @member {number} zMm
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.zMm = 0;

                    /**
                     * QuantizedEntityTransform vxMm.
                     * @member {number} vxMm
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.vxMm = 0;

                    /**
                     * QuantizedEntityTransform vzMm.
                     * @member {number} vzMm
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.vzMm = 0;

                    /**
                     * QuantizedEntityTransform yawMrad.
                     * @member {number} yawMrad
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.yawMrad = 0;

                    /**
                     * QuantizedEntityTransform audioEnergyByte.
                     * @member {number} audioEnergyByte
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.audioEnergyByte = 0;

                    /**
                     * QuantizedEntityTransform vyMm.
                     * @member {number} vyMm
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.vyMm = 0;

                    /**
                     * QuantizedEntityTransform faceState.
                     * @member {number} faceState
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.faceState = 0;

                    /**
                     * QuantizedEntityTransform pitchMrad.
                     * @member {number} pitchMrad
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.pitchMrad = 0;

                    /**
                     * QuantizedEntityTransform headRollMrad.
                     * @member {number} headRollMrad
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.headRollMrad = 0;

                    /**
                     * QuantizedEntityTransform actionState.
                     * @member {number} actionState
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     */
                    QuantizedEntityTransform.prototype.actionState = 0;

                    /**
                     * Creates a new QuantizedEntityTransform instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IQuantizedEntityTransform=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.QuantizedEntityTransform} QuantizedEntityTransform instance
                     */
                    QuantizedEntityTransform.create = function create(properties) {
                        return new QuantizedEntityTransform(properties);
                    };

                    /**
                     * Encodes the specified QuantizedEntityTransform message. Does not implicitly {@link dev.briiqn.verbalize.proto.QuantizedEntityTransform.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IQuantizedEntityTransform} message QuantizedEntityTransform message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    QuantizedEntityTransform.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.netId != null && Object.hasOwnProperty.call(message, "netId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.netId);
                        if (message.xMm != null && Object.hasOwnProperty.call(message, "xMm"))
                            writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.xMm);
                        if (message.yMm != null && Object.hasOwnProperty.call(message, "yMm"))
                            writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.yMm);
                        if (message.zMm != null && Object.hasOwnProperty.call(message, "zMm"))
                            writer.uint32(/* id 4, wireType 0 =*/32).sint32(message.zMm);
                        if (message.vxMm != null && Object.hasOwnProperty.call(message, "vxMm"))
                            writer.uint32(/* id 5, wireType 0 =*/40).sint32(message.vxMm);
                        if (message.vzMm != null && Object.hasOwnProperty.call(message, "vzMm"))
                            writer.uint32(/* id 6, wireType 0 =*/48).sint32(message.vzMm);
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            writer.uint32(/* id 7, wireType 0 =*/56).sint32(message.yawMrad);
                        if (message.audioEnergyByte != null && Object.hasOwnProperty.call(message, "audioEnergyByte"))
                            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.audioEnergyByte);
                        if (message.vyMm != null && Object.hasOwnProperty.call(message, "vyMm"))
                            writer.uint32(/* id 9, wireType 0 =*/72).sint32(message.vyMm);
                        if (message.faceState != null && Object.hasOwnProperty.call(message, "faceState"))
                            writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.faceState);
                        if (message.pitchMrad != null && Object.hasOwnProperty.call(message, "pitchMrad"))
                            writer.uint32(/* id 11, wireType 0 =*/88).sint32(message.pitchMrad);
                        if (message.headRollMrad != null && Object.hasOwnProperty.call(message, "headRollMrad"))
                            writer.uint32(/* id 12, wireType 0 =*/96).sint32(message.headRollMrad);
                        if (message.actionState != null && Object.hasOwnProperty.call(message, "actionState"))
                            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.actionState);
                        return writer;
                    };

                    /**
                     * Encodes the specified QuantizedEntityTransform message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.QuantizedEntityTransform.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IQuantizedEntityTransform} message QuantizedEntityTransform message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    QuantizedEntityTransform.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a QuantizedEntityTransform message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.QuantizedEntityTransform} QuantizedEntityTransform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    QuantizedEntityTransform.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.netId = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.xMm = reader.sint32();
                                    break;
                                }
                            case 3: {
                                    message.yMm = reader.sint32();
                                    break;
                                }
                            case 4: {
                                    message.zMm = reader.sint32();
                                    break;
                                }
                            case 5: {
                                    message.vxMm = reader.sint32();
                                    break;
                                }
                            case 6: {
                                    message.vzMm = reader.sint32();
                                    break;
                                }
                            case 7: {
                                    message.yawMrad = reader.sint32();
                                    break;
                                }
                            case 8: {
                                    message.audioEnergyByte = reader.uint32();
                                    break;
                                }
                            case 9: {
                                    message.vyMm = reader.sint32();
                                    break;
                                }
                            case 10: {
                                    message.faceState = reader.uint32();
                                    break;
                                }
                            case 11: {
                                    message.pitchMrad = reader.sint32();
                                    break;
                                }
                            case 12: {
                                    message.headRollMrad = reader.sint32();
                                    break;
                                }
                            case 13: {
                                    message.actionState = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a QuantizedEntityTransform message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.QuantizedEntityTransform} QuantizedEntityTransform
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    QuantizedEntityTransform.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a QuantizedEntityTransform message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    QuantizedEntityTransform.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.netId != null && Object.hasOwnProperty.call(message, "netId"))
                            if (!$util.isInteger(message.netId))
                                return "netId: integer expected";
                        if (message.xMm != null && Object.hasOwnProperty.call(message, "xMm"))
                            if (!$util.isInteger(message.xMm))
                                return "xMm: integer expected";
                        if (message.yMm != null && Object.hasOwnProperty.call(message, "yMm"))
                            if (!$util.isInteger(message.yMm))
                                return "yMm: integer expected";
                        if (message.zMm != null && Object.hasOwnProperty.call(message, "zMm"))
                            if (!$util.isInteger(message.zMm))
                                return "zMm: integer expected";
                        if (message.vxMm != null && Object.hasOwnProperty.call(message, "vxMm"))
                            if (!$util.isInteger(message.vxMm))
                                return "vxMm: integer expected";
                        if (message.vzMm != null && Object.hasOwnProperty.call(message, "vzMm"))
                            if (!$util.isInteger(message.vzMm))
                                return "vzMm: integer expected";
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            if (!$util.isInteger(message.yawMrad))
                                return "yawMrad: integer expected";
                        if (message.audioEnergyByte != null && Object.hasOwnProperty.call(message, "audioEnergyByte"))
                            if (!$util.isInteger(message.audioEnergyByte))
                                return "audioEnergyByte: integer expected";
                        if (message.vyMm != null && Object.hasOwnProperty.call(message, "vyMm"))
                            if (!$util.isInteger(message.vyMm))
                                return "vyMm: integer expected";
                        if (message.faceState != null && Object.hasOwnProperty.call(message, "faceState"))
                            if (!$util.isInteger(message.faceState))
                                return "faceState: integer expected";
                        if (message.pitchMrad != null && Object.hasOwnProperty.call(message, "pitchMrad"))
                            if (!$util.isInteger(message.pitchMrad))
                                return "pitchMrad: integer expected";
                        if (message.headRollMrad != null && Object.hasOwnProperty.call(message, "headRollMrad"))
                            if (!$util.isInteger(message.headRollMrad))
                                return "headRollMrad: integer expected";
                        if (message.actionState != null && Object.hasOwnProperty.call(message, "actionState"))
                            if (!$util.isInteger(message.actionState))
                                return "actionState: integer expected";
                        return null;
                    };

                    /**
                     * Creates a QuantizedEntityTransform message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.QuantizedEntityTransform} QuantizedEntityTransform
                     */
                    QuantizedEntityTransform.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.QuantizedEntityTransform: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform();
                        if (object.netId != null)
                            message.netId = object.netId >>> 0;
                        if (object.xMm != null)
                            message.xMm = object.xMm | 0;
                        if (object.yMm != null)
                            message.yMm = object.yMm | 0;
                        if (object.zMm != null)
                            message.zMm = object.zMm | 0;
                        if (object.vxMm != null)
                            message.vxMm = object.vxMm | 0;
                        if (object.vzMm != null)
                            message.vzMm = object.vzMm | 0;
                        if (object.yawMrad != null)
                            message.yawMrad = object.yawMrad | 0;
                        if (object.audioEnergyByte != null)
                            message.audioEnergyByte = object.audioEnergyByte >>> 0;
                        if (object.vyMm != null)
                            message.vyMm = object.vyMm | 0;
                        if (object.faceState != null)
                            message.faceState = object.faceState >>> 0;
                        if (object.pitchMrad != null)
                            message.pitchMrad = object.pitchMrad | 0;
                        if (object.headRollMrad != null)
                            message.headRollMrad = object.headRollMrad | 0;
                        if (object.actionState != null)
                            message.actionState = object.actionState >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a QuantizedEntityTransform message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {dev.briiqn.verbalize.proto.QuantizedEntityTransform} message QuantizedEntityTransform
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    QuantizedEntityTransform.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.netId = 0;
                            object.xMm = 0;
                            object.yMm = 0;
                            object.zMm = 0;
                            object.vxMm = 0;
                            object.vzMm = 0;
                            object.yawMrad = 0;
                            object.audioEnergyByte = 0;
                            object.vyMm = 0;
                            object.faceState = 0;
                            object.pitchMrad = 0;
                            object.headRollMrad = 0;
                            object.actionState = 0;
                        }
                        if (message.netId != null && Object.hasOwnProperty.call(message, "netId"))
                            object.netId = message.netId;
                        if (message.xMm != null && Object.hasOwnProperty.call(message, "xMm"))
                            object.xMm = message.xMm;
                        if (message.yMm != null && Object.hasOwnProperty.call(message, "yMm"))
                            object.yMm = message.yMm;
                        if (message.zMm != null && Object.hasOwnProperty.call(message, "zMm"))
                            object.zMm = message.zMm;
                        if (message.vxMm != null && Object.hasOwnProperty.call(message, "vxMm"))
                            object.vxMm = message.vxMm;
                        if (message.vzMm != null && Object.hasOwnProperty.call(message, "vzMm"))
                            object.vzMm = message.vzMm;
                        if (message.yawMrad != null && Object.hasOwnProperty.call(message, "yawMrad"))
                            object.yawMrad = message.yawMrad;
                        if (message.audioEnergyByte != null && Object.hasOwnProperty.call(message, "audioEnergyByte"))
                            object.audioEnergyByte = message.audioEnergyByte;
                        if (message.vyMm != null && Object.hasOwnProperty.call(message, "vyMm"))
                            object.vyMm = message.vyMm;
                        if (message.faceState != null && Object.hasOwnProperty.call(message, "faceState"))
                            object.faceState = message.faceState;
                        if (message.pitchMrad != null && Object.hasOwnProperty.call(message, "pitchMrad"))
                            object.pitchMrad = message.pitchMrad;
                        if (message.headRollMrad != null && Object.hasOwnProperty.call(message, "headRollMrad"))
                            object.headRollMrad = message.headRollMrad;
                        if (message.actionState != null && Object.hasOwnProperty.call(message, "actionState"))
                            object.actionState = message.actionState;
                        return object;
                    };

                    /**
                     * Converts this QuantizedEntityTransform to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    QuantizedEntityTransform.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for QuantizedEntityTransform
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.QuantizedEntityTransform
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    QuantizedEntityTransform.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.QuantizedEntityTransform";
                    };

                    return QuantizedEntityTransform;
                })();

                proto.WorldDeltaRecord = (function() {

                    /**
                     * Properties of a WorldDeltaRecord.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IWorldDeltaRecord
                     * @property {number|null} [gridX] WorldDeltaRecord gridX
                     * @property {number|null} [gridY] WorldDeltaRecord gridY
                     * @property {number|null} [gridZ] WorldDeltaRecord gridZ
                     * @property {number|null} [structureType] WorldDeltaRecord structureType
                     * @property {number|null} [stateFlags] WorldDeltaRecord stateFlags
                     */

                    /**
                     * Constructs a new WorldDeltaRecord.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a WorldDeltaRecord.
                     * @implements IWorldDeltaRecord
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaRecord=} [properties] Properties to set
                     */
                    function WorldDeltaRecord(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * WorldDeltaRecord gridX.
                     * @member {number} gridX
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @instance
                     */
                    WorldDeltaRecord.prototype.gridX = 0;

                    /**
                     * WorldDeltaRecord gridY.
                     * @member {number} gridY
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @instance
                     */
                    WorldDeltaRecord.prototype.gridY = 0;

                    /**
                     * WorldDeltaRecord gridZ.
                     * @member {number} gridZ
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @instance
                     */
                    WorldDeltaRecord.prototype.gridZ = 0;

                    /**
                     * WorldDeltaRecord structureType.
                     * @member {number} structureType
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @instance
                     */
                    WorldDeltaRecord.prototype.structureType = 0;

                    /**
                     * WorldDeltaRecord stateFlags.
                     * @member {number} stateFlags
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @instance
                     */
                    WorldDeltaRecord.prototype.stateFlags = 0;

                    /**
                     * Creates a new WorldDeltaRecord instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaRecord=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaRecord} WorldDeltaRecord instance
                     */
                    WorldDeltaRecord.create = function create(properties) {
                        return new WorldDeltaRecord(properties);
                    };

                    /**
                     * Encodes the specified WorldDeltaRecord message. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaRecord.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaRecord} message WorldDeltaRecord message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WorldDeltaRecord.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.gridX != null && Object.hasOwnProperty.call(message, "gridX"))
                            writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.gridX);
                        if (message.gridY != null && Object.hasOwnProperty.call(message, "gridY"))
                            writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.gridY);
                        if (message.gridZ != null && Object.hasOwnProperty.call(message, "gridZ"))
                            writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.gridZ);
                        if (message.structureType != null && Object.hasOwnProperty.call(message, "structureType"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.structureType);
                        if (message.stateFlags != null && Object.hasOwnProperty.call(message, "stateFlags"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.stateFlags);
                        return writer;
                    };

                    /**
                     * Encodes the specified WorldDeltaRecord message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaRecord.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaRecord} message WorldDeltaRecord message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WorldDeltaRecord.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a WorldDeltaRecord message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaRecord} WorldDeltaRecord
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WorldDeltaRecord.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.WorldDeltaRecord();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.gridX = reader.sint32();
                                    break;
                                }
                            case 2: {
                                    message.gridY = reader.sint32();
                                    break;
                                }
                            case 3: {
                                    message.gridZ = reader.sint32();
                                    break;
                                }
                            case 4: {
                                    message.structureType = reader.uint32();
                                    break;
                                }
                            case 5: {
                                    message.stateFlags = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a WorldDeltaRecord message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaRecord} WorldDeltaRecord
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WorldDeltaRecord.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a WorldDeltaRecord message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    WorldDeltaRecord.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.gridX != null && Object.hasOwnProperty.call(message, "gridX"))
                            if (!$util.isInteger(message.gridX))
                                return "gridX: integer expected";
                        if (message.gridY != null && Object.hasOwnProperty.call(message, "gridY"))
                            if (!$util.isInteger(message.gridY))
                                return "gridY: integer expected";
                        if (message.gridZ != null && Object.hasOwnProperty.call(message, "gridZ"))
                            if (!$util.isInteger(message.gridZ))
                                return "gridZ: integer expected";
                        if (message.structureType != null && Object.hasOwnProperty.call(message, "structureType"))
                            if (!$util.isInteger(message.structureType))
                                return "structureType: integer expected";
                        if (message.stateFlags != null && Object.hasOwnProperty.call(message, "stateFlags"))
                            if (!$util.isInteger(message.stateFlags))
                                return "stateFlags: integer expected";
                        return null;
                    };

                    /**
                     * Creates a WorldDeltaRecord message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaRecord} WorldDeltaRecord
                     */
                    WorldDeltaRecord.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.WorldDeltaRecord)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.WorldDeltaRecord: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.WorldDeltaRecord();
                        if (object.gridX != null)
                            message.gridX = object.gridX | 0;
                        if (object.gridY != null)
                            message.gridY = object.gridY | 0;
                        if (object.gridZ != null)
                            message.gridZ = object.gridZ | 0;
                        if (object.structureType != null)
                            message.structureType = object.structureType >>> 0;
                        if (object.stateFlags != null)
                            message.stateFlags = object.stateFlags >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a WorldDeltaRecord message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {dev.briiqn.verbalize.proto.WorldDeltaRecord} message WorldDeltaRecord
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    WorldDeltaRecord.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.gridX = 0;
                            object.gridY = 0;
                            object.gridZ = 0;
                            object.structureType = 0;
                            object.stateFlags = 0;
                        }
                        if (message.gridX != null && Object.hasOwnProperty.call(message, "gridX"))
                            object.gridX = message.gridX;
                        if (message.gridY != null && Object.hasOwnProperty.call(message, "gridY"))
                            object.gridY = message.gridY;
                        if (message.gridZ != null && Object.hasOwnProperty.call(message, "gridZ"))
                            object.gridZ = message.gridZ;
                        if (message.structureType != null && Object.hasOwnProperty.call(message, "structureType"))
                            object.structureType = message.structureType;
                        if (message.stateFlags != null && Object.hasOwnProperty.call(message, "stateFlags"))
                            object.stateFlags = message.stateFlags;
                        return object;
                    };

                    /**
                     * Converts this WorldDeltaRecord to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    WorldDeltaRecord.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for WorldDeltaRecord
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaRecord
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    WorldDeltaRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.WorldDeltaRecord";
                    };

                    return WorldDeltaRecord;
                })();

                proto.WelcomeEvent = (function() {

                    /**
                     * Properties of a WelcomeEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IWelcomeEvent
                     * @property {number|null} [assignedNetId] WelcomeEvent assignedNetId
                     * @property {number|null} [tickRateHz] WelcomeEvent tickRateHz
                     * @property {number|Long|null} [worldSeed] WelcomeEvent worldSeed
                     * @property {Array.<dev.briiqn.verbalize.proto.IEntitySpawnInfo>|null} [initialEntities] WelcomeEvent initialEntities
                     * @property {Array.<dev.briiqn.verbalize.proto.IWorldDeltaRecord>|null} [activeDeltas] WelcomeEvent activeDeltas
                     * @property {number|null} [reputation] WelcomeEvent reputation
                     */

                    /**
                     * Constructs a new WelcomeEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a WelcomeEvent.
                     * @implements IWelcomeEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IWelcomeEvent=} [properties] Properties to set
                     */
                    function WelcomeEvent(properties) {
                        this.initialEntities = [];
                        this.activeDeltas = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * WelcomeEvent assignedNetId.
                     * @member {number} assignedNetId
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     */
                    WelcomeEvent.prototype.assignedNetId = 0;

                    /**
                     * WelcomeEvent tickRateHz.
                     * @member {number} tickRateHz
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     */
                    WelcomeEvent.prototype.tickRateHz = 0;

                    /**
                     * WelcomeEvent worldSeed.
                     * @member {number|Long} worldSeed
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     */
                    WelcomeEvent.prototype.worldSeed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * WelcomeEvent initialEntities.
                     * @member {Array.<dev.briiqn.verbalize.proto.IEntitySpawnInfo>} initialEntities
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     */
                    WelcomeEvent.prototype.initialEntities = $util.emptyArray;

                    /**
                     * WelcomeEvent activeDeltas.
                     * @member {Array.<dev.briiqn.verbalize.proto.IWorldDeltaRecord>} activeDeltas
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     */
                    WelcomeEvent.prototype.activeDeltas = $util.emptyArray;

                    /**
                     * WelcomeEvent reputation.
                     * @member {number} reputation
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     */
                    WelcomeEvent.prototype.reputation = 0;

                    /**
                     * Creates a new WelcomeEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWelcomeEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.WelcomeEvent} WelcomeEvent instance
                     */
                    WelcomeEvent.create = function create(properties) {
                        return new WelcomeEvent(properties);
                    };

                    /**
                     * Encodes the specified WelcomeEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.WelcomeEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWelcomeEvent} message WelcomeEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WelcomeEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.assignedNetId != null && Object.hasOwnProperty.call(message, "assignedNetId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.assignedNetId);
                        if (message.tickRateHz != null && Object.hasOwnProperty.call(message, "tickRateHz"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.tickRateHz);
                        if (message.worldSeed != null && Object.hasOwnProperty.call(message, "worldSeed"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.worldSeed);
                        if (message.initialEntities != null && message.initialEntities.length)
                            for (let i = 0; i < message.initialEntities.length; ++i)
                                $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.encode(message.initialEntities[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                        if (message.activeDeltas != null && message.activeDeltas.length)
                            for (let i = 0; i < message.activeDeltas.length; ++i)
                                $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.encode(message.activeDeltas[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            writer.uint32(/* id 6, wireType 0 =*/48).sint32(message.reputation);
                        return writer;
                    };

                    /**
                     * Encodes the specified WelcomeEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WelcomeEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWelcomeEvent} message WelcomeEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WelcomeEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a WelcomeEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.WelcomeEvent} WelcomeEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WelcomeEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.WelcomeEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.assignedNetId = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.tickRateHz = reader.uint32();
                                    break;
                                }
                            case 3: {
                                    message.worldSeed = reader.uint64();
                                    break;
                                }
                            case 4: {
                                    if (!(message.initialEntities && message.initialEntities.length))
                                        message.initialEntities = [];
                                    message.initialEntities.push($root.dev.briiqn.verbalize.proto.EntitySpawnInfo.decode(reader, reader.uint32(), undefined, long + 1));
                                    break;
                                }
                            case 5: {
                                    if (!(message.activeDeltas && message.activeDeltas.length))
                                        message.activeDeltas = [];
                                    message.activeDeltas.push($root.dev.briiqn.verbalize.proto.WorldDeltaRecord.decode(reader, reader.uint32(), undefined, long + 1));
                                    break;
                                }
                            case 6: {
                                    message.reputation = reader.sint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a WelcomeEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.WelcomeEvent} WelcomeEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WelcomeEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a WelcomeEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    WelcomeEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.assignedNetId != null && Object.hasOwnProperty.call(message, "assignedNetId"))
                            if (!$util.isInteger(message.assignedNetId))
                                return "assignedNetId: integer expected";
                        if (message.tickRateHz != null && Object.hasOwnProperty.call(message, "tickRateHz"))
                            if (!$util.isInteger(message.tickRateHz))
                                return "tickRateHz: integer expected";
                        if (message.worldSeed != null && Object.hasOwnProperty.call(message, "worldSeed"))
                            if (!$util.isInteger(message.worldSeed) && !(message.worldSeed && $util.isInteger(message.worldSeed.low) && $util.isInteger(message.worldSeed.high)))
                                return "worldSeed: integer|Long expected";
                        if (message.initialEntities != null && Object.hasOwnProperty.call(message, "initialEntities")) {
                            if (!Array.isArray(message.initialEntities))
                                return "initialEntities: array expected";
                            for (let i = 0; i < message.initialEntities.length; ++i) {
                                let error = $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.verify(message.initialEntities[i], long + 1);
                                if (error)
                                    return "initialEntities." + error;
                            }
                        }
                        if (message.activeDeltas != null && Object.hasOwnProperty.call(message, "activeDeltas")) {
                            if (!Array.isArray(message.activeDeltas))
                                return "activeDeltas: array expected";
                            for (let i = 0; i < message.activeDeltas.length; ++i) {
                                let error = $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.verify(message.activeDeltas[i], long + 1);
                                if (error)
                                    return "activeDeltas." + error;
                            }
                        }
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            if (!$util.isInteger(message.reputation))
                                return "reputation: integer expected";
                        return null;
                    };

                    /**
                     * Creates a WelcomeEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.WelcomeEvent} WelcomeEvent
                     */
                    WelcomeEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.WelcomeEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.WelcomeEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.WelcomeEvent();
                        if (object.assignedNetId != null)
                            message.assignedNetId = object.assignedNetId >>> 0;
                        if (object.tickRateHz != null)
                            message.tickRateHz = object.tickRateHz >>> 0;
                        if (object.worldSeed != null)
                            if ($util.Long)
                                message.worldSeed = $util.Long.fromValue(object.worldSeed, true);
                            else if (typeof object.worldSeed === "string")
                                message.worldSeed = parseInt(object.worldSeed, 10);
                            else if (typeof object.worldSeed === "number")
                                message.worldSeed = object.worldSeed;
                            else if (typeof object.worldSeed === "object")
                                message.worldSeed = new $util.LongBits(object.worldSeed.low >>> 0, object.worldSeed.high >>> 0).toNumber(true);
                        if (object.initialEntities) {
                            if (!Array.isArray(object.initialEntities))
                                throw TypeError(".dev.briiqn.verbalize.proto.WelcomeEvent.initialEntities: array expected");
                            message.initialEntities = [];
                            for (let i = 0; i < object.initialEntities.length; ++i) {
                                if (!$util.isObject(object.initialEntities[i]))
                                    throw TypeError(".dev.briiqn.verbalize.proto.WelcomeEvent.initialEntities: object expected");
                                message.initialEntities[i] = $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.fromObject(object.initialEntities[i], long + 1);
                            }
                        }
                        if (object.activeDeltas) {
                            if (!Array.isArray(object.activeDeltas))
                                throw TypeError(".dev.briiqn.verbalize.proto.WelcomeEvent.activeDeltas: array expected");
                            message.activeDeltas = [];
                            for (let i = 0; i < object.activeDeltas.length; ++i) {
                                if (!$util.isObject(object.activeDeltas[i]))
                                    throw TypeError(".dev.briiqn.verbalize.proto.WelcomeEvent.activeDeltas: object expected");
                                message.activeDeltas[i] = $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.fromObject(object.activeDeltas[i], long + 1);
                            }
                        }
                        if (object.reputation != null)
                            message.reputation = object.reputation | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a WelcomeEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.WelcomeEvent} message WelcomeEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    WelcomeEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.arrays || options.defaults) {
                            object.initialEntities = [];
                            object.activeDeltas = [];
                        }
                        if (options.defaults) {
                            object.assignedNetId = 0;
                            object.tickRateHz = 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.worldSeed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                            } else
                                object.worldSeed = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                            object.reputation = 0;
                        }
                        if (message.assignedNetId != null && Object.hasOwnProperty.call(message, "assignedNetId"))
                            object.assignedNetId = message.assignedNetId;
                        if (message.tickRateHz != null && Object.hasOwnProperty.call(message, "tickRateHz"))
                            object.tickRateHz = message.tickRateHz;
                        if (message.worldSeed != null && Object.hasOwnProperty.call(message, "worldSeed"))
                            if (typeof BigInt !== "undefined" && options.longs === BigInt)
                                object.worldSeed = typeof message.worldSeed === "number" ? BigInt(message.worldSeed) : $util.Long.fromBits(message.worldSeed.low >>> 0, message.worldSeed.high >>> 0, true).toBigInt();
                            else if (typeof message.worldSeed === "number")
                                object.worldSeed = options.longs === String ? String(message.worldSeed) : message.worldSeed;
                            else
                                object.worldSeed = options.longs === String ? $util.Long.prototype.toString.call(message.worldSeed) : options.longs === Number ? new $util.LongBits(message.worldSeed.low >>> 0, message.worldSeed.high >>> 0).toNumber(true) : message.worldSeed;
                        if (message.initialEntities && message.initialEntities.length) {
                            object.initialEntities = [];
                            for (let j = 0; j < message.initialEntities.length; ++j)
                                object.initialEntities[j] = $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.toObject(message.initialEntities[j], options, q + 1);
                        }
                        if (message.activeDeltas && message.activeDeltas.length) {
                            object.activeDeltas = [];
                            for (let j = 0; j < message.activeDeltas.length; ++j)
                                object.activeDeltas[j] = $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.toObject(message.activeDeltas[j], options, q + 1);
                        }
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            object.reputation = message.reputation;
                        return object;
                    };

                    /**
                     * Converts this WelcomeEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    WelcomeEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for WelcomeEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.WelcomeEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    WelcomeEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.WelcomeEvent";
                    };

                    return WelcomeEvent;
                })();

                proto.ReputationEvent = (function() {

                    /**
                     * Properties of a ReputationEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IReputationEvent
                     * @property {number|null} [reputation] ReputationEvent reputation
                     * @property {number|null} [delta] ReputationEvent delta
                     * @property {string|null} [reason] ReputationEvent reason
                     */

                    /**
                     * Constructs a new ReputationEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a ReputationEvent.
                     * @implements IReputationEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IReputationEvent=} [properties] Properties to set
                     */
                    function ReputationEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ReputationEvent reputation.
                     * @member {number} reputation
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @instance
                     */
                    ReputationEvent.prototype.reputation = 0;

                    /**
                     * ReputationEvent delta.
                     * @member {number} delta
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @instance
                     */
                    ReputationEvent.prototype.delta = 0;

                    /**
                     * ReputationEvent reason.
                     * @member {string} reason
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @instance
                     */
                    ReputationEvent.prototype.reason = "";

                    /**
                     * Creates a new ReputationEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IReputationEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.ReputationEvent} ReputationEvent instance
                     */
                    ReputationEvent.create = function create(properties) {
                        return new ReputationEvent(properties);
                    };

                    /**
                     * Encodes the specified ReputationEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.ReputationEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IReputationEvent} message ReputationEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ReputationEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.reputation);
                        if (message.delta != null && Object.hasOwnProperty.call(message, "delta"))
                            writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.delta);
                        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.reason);
                        return writer;
                    };

                    /**
                     * Encodes the specified ReputationEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.ReputationEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IReputationEvent} message ReputationEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ReputationEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a ReputationEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.ReputationEvent} ReputationEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ReputationEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.ReputationEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.reputation = reader.sint32();
                                    break;
                                }
                            case 2: {
                                    message.delta = reader.sint32();
                                    break;
                                }
                            case 3: {
                                    message.reason = reader.string();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a ReputationEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.ReputationEvent} ReputationEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ReputationEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ReputationEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ReputationEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            if (!$util.isInteger(message.reputation))
                                return "reputation: integer expected";
                        if (message.delta != null && Object.hasOwnProperty.call(message, "delta"))
                            if (!$util.isInteger(message.delta))
                                return "delta: integer expected";
                        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                            if (!$util.isString(message.reason))
                                return "reason: string expected";
                        return null;
                    };

                    /**
                     * Creates a ReputationEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.ReputationEvent} ReputationEvent
                     */
                    ReputationEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.ReputationEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.ReputationEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.ReputationEvent();
                        if (object.reputation != null)
                            message.reputation = object.reputation | 0;
                        if (object.delta != null)
                            message.delta = object.delta | 0;
                        if (object.reason != null)
                            message.reason = String(object.reason);
                        return message;
                    };

                    /**
                     * Creates a plain object from a ReputationEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.ReputationEvent} message ReputationEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ReputationEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.reputation = 0;
                            object.delta = 0;
                            object.reason = "";
                        }
                        if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                            object.reputation = message.reputation;
                        if (message.delta != null && Object.hasOwnProperty.call(message, "delta"))
                            object.delta = message.delta;
                        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                            object.reason = message.reason;
                        return object;
                    };

                    /**
                     * Converts this ReputationEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ReputationEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ReputationEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.ReputationEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ReputationEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.ReputationEvent";
                    };

                    return ReputationEvent;
                })();

                proto.EntityLifecycleEvent = (function() {

                    /**
                     * Properties of an EntityLifecycleEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IEntityLifecycleEvent
                     * @property {Array.<dev.briiqn.verbalize.proto.IEntitySpawnInfo>|null} [spawned] EntityLifecycleEvent spawned
                     * @property {Array.<number>|null} [despawnedNetIds] EntityLifecycleEvent despawnedNetIds
                     */

                    /**
                     * Constructs a new EntityLifecycleEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents an EntityLifecycleEvent.
                     * @implements IEntityLifecycleEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IEntityLifecycleEvent=} [properties] Properties to set
                     */
                    function EntityLifecycleEvent(properties) {
                        this.spawned = [];
                        this.despawnedNetIds = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * EntityLifecycleEvent spawned.
                     * @member {Array.<dev.briiqn.verbalize.proto.IEntitySpawnInfo>} spawned
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @instance
                     */
                    EntityLifecycleEvent.prototype.spawned = $util.emptyArray;

                    /**
                     * EntityLifecycleEvent despawnedNetIds.
                     * @member {Array.<number>} despawnedNetIds
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @instance
                     */
                    EntityLifecycleEvent.prototype.despawnedNetIds = $util.emptyArray;

                    /**
                     * Creates a new EntityLifecycleEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntityLifecycleEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.EntityLifecycleEvent} EntityLifecycleEvent instance
                     */
                    EntityLifecycleEvent.create = function create(properties) {
                        return new EntityLifecycleEvent(properties);
                    };

                    /**
                     * Encodes the specified EntityLifecycleEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityLifecycleEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntityLifecycleEvent} message EntityLifecycleEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntityLifecycleEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.spawned != null && message.spawned.length)
                            for (let i = 0; i < message.spawned.length; ++i)
                                $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.encode(message.spawned[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                        if (message.despawnedNetIds != null && message.despawnedNetIds.length) {
                            writer.uint32(/* id 2, wireType 2 =*/18).fork();
                            for (let i = 0; i < message.despawnedNetIds.length; ++i)
                                writer.uint32(message.despawnedNetIds[i]);
                            writer.ldelim();
                        }
                        return writer;
                    };

                    /**
                     * Encodes the specified EntityLifecycleEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityLifecycleEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntityLifecycleEvent} message EntityLifecycleEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntityLifecycleEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes an EntityLifecycleEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.EntityLifecycleEvent} EntityLifecycleEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntityLifecycleEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    if (!(message.spawned && message.spawned.length))
                                        message.spawned = [];
                                    message.spawned.push($root.dev.briiqn.verbalize.proto.EntitySpawnInfo.decode(reader, reader.uint32(), undefined, long + 1));
                                    break;
                                }
                            case 2: {
                                    if (!(message.despawnedNetIds && message.despawnedNetIds.length))
                                        message.despawnedNetIds = [];
                                    if ((tag & 7) === 2) {
                                        let end2 = reader.uint32() + reader.pos;
                                        if (end2 > reader.len)
                                            throw RangeError("index out of range");
                                        reader.len = end2;
                                        while (reader.pos < end2)
                                            message.despawnedNetIds.push(reader.uint32());
                                        if (reader.pos !== end2)
                                            throw RangeError("index out of range");
                                        reader.len = end;
                                    } else
                                        message.despawnedNetIds.push(reader.uint32());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes an EntityLifecycleEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.EntityLifecycleEvent} EntityLifecycleEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntityLifecycleEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an EntityLifecycleEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    EntityLifecycleEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.spawned != null && Object.hasOwnProperty.call(message, "spawned")) {
                            if (!Array.isArray(message.spawned))
                                return "spawned: array expected";
                            for (let i = 0; i < message.spawned.length; ++i) {
                                let error = $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.verify(message.spawned[i], long + 1);
                                if (error)
                                    return "spawned." + error;
                            }
                        }
                        if (message.despawnedNetIds != null && Object.hasOwnProperty.call(message, "despawnedNetIds")) {
                            if (!Array.isArray(message.despawnedNetIds))
                                return "despawnedNetIds: array expected";
                            for (let i = 0; i < message.despawnedNetIds.length; ++i)
                                if (!$util.isInteger(message.despawnedNetIds[i]))
                                    return "despawnedNetIds: integer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates an EntityLifecycleEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.EntityLifecycleEvent} EntityLifecycleEvent
                     */
                    EntityLifecycleEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.EntityLifecycleEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.EntityLifecycleEvent();
                        if (object.spawned) {
                            if (!Array.isArray(object.spawned))
                                throw TypeError(".dev.briiqn.verbalize.proto.EntityLifecycleEvent.spawned: array expected");
                            message.spawned = [];
                            for (let i = 0; i < object.spawned.length; ++i) {
                                if (!$util.isObject(object.spawned[i]))
                                    throw TypeError(".dev.briiqn.verbalize.proto.EntityLifecycleEvent.spawned: object expected");
                                message.spawned[i] = $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.fromObject(object.spawned[i], long + 1);
                            }
                        }
                        if (object.despawnedNetIds) {
                            if (!Array.isArray(object.despawnedNetIds))
                                throw TypeError(".dev.briiqn.verbalize.proto.EntityLifecycleEvent.despawnedNetIds: array expected");
                            message.despawnedNetIds = [];
                            for (let i = 0; i < object.despawnedNetIds.length; ++i)
                                message.despawnedNetIds[i] = object.despawnedNetIds[i] >>> 0;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an EntityLifecycleEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.EntityLifecycleEvent} message EntityLifecycleEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    EntityLifecycleEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.arrays || options.defaults) {
                            object.spawned = [];
                            object.despawnedNetIds = [];
                        }
                        if (message.spawned && message.spawned.length) {
                            object.spawned = [];
                            for (let j = 0; j < message.spawned.length; ++j)
                                object.spawned[j] = $root.dev.briiqn.verbalize.proto.EntitySpawnInfo.toObject(message.spawned[j], options, q + 1);
                        }
                        if (message.despawnedNetIds && message.despawnedNetIds.length) {
                            object.despawnedNetIds = [];
                            for (let j = 0; j < message.despawnedNetIds.length; ++j)
                                object.despawnedNetIds[j] = message.despawnedNetIds[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this EntityLifecycleEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    EntityLifecycleEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for EntityLifecycleEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.EntityLifecycleEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    EntityLifecycleEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.EntityLifecycleEvent";
                    };

                    return EntityLifecycleEvent;
                })();

                proto.EntityDeltaTickEvent = (function() {

                    /**
                     * Properties of an EntityDeltaTickEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IEntityDeltaTickEvent
                     * @property {number|null} [ackInputSeq] EntityDeltaTickEvent ackInputSeq
                     * @property {Array.<dev.briiqn.verbalize.proto.IQuantizedEntityTransform>|null} [dirtyEntities] EntityDeltaTickEvent dirtyEntities
                     */

                    /**
                     * Constructs a new EntityDeltaTickEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents an EntityDeltaTickEvent.
                     * @implements IEntityDeltaTickEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IEntityDeltaTickEvent=} [properties] Properties to set
                     */
                    function EntityDeltaTickEvent(properties) {
                        this.dirtyEntities = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * EntityDeltaTickEvent ackInputSeq.
                     * @member {number} ackInputSeq
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @instance
                     */
                    EntityDeltaTickEvent.prototype.ackInputSeq = 0;

                    /**
                     * EntityDeltaTickEvent dirtyEntities.
                     * @member {Array.<dev.briiqn.verbalize.proto.IQuantizedEntityTransform>} dirtyEntities
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @instance
                     */
                    EntityDeltaTickEvent.prototype.dirtyEntities = $util.emptyArray;

                    /**
                     * Creates a new EntityDeltaTickEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntityDeltaTickEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.EntityDeltaTickEvent} EntityDeltaTickEvent instance
                     */
                    EntityDeltaTickEvent.create = function create(properties) {
                        return new EntityDeltaTickEvent(properties);
                    };

                    /**
                     * Encodes the specified EntityDeltaTickEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityDeltaTickEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntityDeltaTickEvent} message EntityDeltaTickEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntityDeltaTickEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.ackInputSeq != null && Object.hasOwnProperty.call(message, "ackInputSeq"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ackInputSeq);
                        if (message.dirtyEntities != null && message.dirtyEntities.length)
                            for (let i = 0; i < message.dirtyEntities.length; ++i)
                                $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform.encode(message.dirtyEntities[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified EntityDeltaTickEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.EntityDeltaTickEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IEntityDeltaTickEvent} message EntityDeltaTickEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntityDeltaTickEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes an EntityDeltaTickEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.EntityDeltaTickEvent} EntityDeltaTickEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntityDeltaTickEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.ackInputSeq = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    if (!(message.dirtyEntities && message.dirtyEntities.length))
                                        message.dirtyEntities = [];
                                    message.dirtyEntities.push($root.dev.briiqn.verbalize.proto.QuantizedEntityTransform.decode(reader, reader.uint32(), undefined, long + 1));
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes an EntityDeltaTickEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.EntityDeltaTickEvent} EntityDeltaTickEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntityDeltaTickEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an EntityDeltaTickEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    EntityDeltaTickEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.ackInputSeq != null && Object.hasOwnProperty.call(message, "ackInputSeq"))
                            if (!$util.isInteger(message.ackInputSeq))
                                return "ackInputSeq: integer expected";
                        if (message.dirtyEntities != null && Object.hasOwnProperty.call(message, "dirtyEntities")) {
                            if (!Array.isArray(message.dirtyEntities))
                                return "dirtyEntities: array expected";
                            for (let i = 0; i < message.dirtyEntities.length; ++i) {
                                let error = $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform.verify(message.dirtyEntities[i], long + 1);
                                if (error)
                                    return "dirtyEntities." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates an EntityDeltaTickEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.EntityDeltaTickEvent} EntityDeltaTickEvent
                     */
                    EntityDeltaTickEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.EntityDeltaTickEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.EntityDeltaTickEvent();
                        if (object.ackInputSeq != null)
                            message.ackInputSeq = object.ackInputSeq >>> 0;
                        if (object.dirtyEntities) {
                            if (!Array.isArray(object.dirtyEntities))
                                throw TypeError(".dev.briiqn.verbalize.proto.EntityDeltaTickEvent.dirtyEntities: array expected");
                            message.dirtyEntities = [];
                            for (let i = 0; i < object.dirtyEntities.length; ++i) {
                                if (!$util.isObject(object.dirtyEntities[i]))
                                    throw TypeError(".dev.briiqn.verbalize.proto.EntityDeltaTickEvent.dirtyEntities: object expected");
                                message.dirtyEntities[i] = $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform.fromObject(object.dirtyEntities[i], long + 1);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an EntityDeltaTickEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.EntityDeltaTickEvent} message EntityDeltaTickEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    EntityDeltaTickEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.dirtyEntities = [];
                        if (options.defaults)
                            object.ackInputSeq = 0;
                        if (message.ackInputSeq != null && Object.hasOwnProperty.call(message, "ackInputSeq"))
                            object.ackInputSeq = message.ackInputSeq;
                        if (message.dirtyEntities && message.dirtyEntities.length) {
                            object.dirtyEntities = [];
                            for (let j = 0; j < message.dirtyEntities.length; ++j)
                                object.dirtyEntities[j] = $root.dev.briiqn.verbalize.proto.QuantizedEntityTransform.toObject(message.dirtyEntities[j], options, q + 1);
                        }
                        return object;
                    };

                    /**
                     * Converts this EntityDeltaTickEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    EntityDeltaTickEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for EntityDeltaTickEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.EntityDeltaTickEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    EntityDeltaTickEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.EntityDeltaTickEvent";
                    };

                    return EntityDeltaTickEvent;
                })();

                proto.WorldDeltaEvent = (function() {

                    /**
                     * Properties of a WorldDeltaEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IWorldDeltaEvent
                     * @property {Array.<dev.briiqn.verbalize.proto.IWorldDeltaRecord>|null} [deltas] WorldDeltaEvent deltas
                     */

                    /**
                     * Constructs a new WorldDeltaEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a WorldDeltaEvent.
                     * @implements IWorldDeltaEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaEvent=} [properties] Properties to set
                     */
                    function WorldDeltaEvent(properties) {
                        this.deltas = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * WorldDeltaEvent deltas.
                     * @member {Array.<dev.briiqn.verbalize.proto.IWorldDeltaRecord>} deltas
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @instance
                     */
                    WorldDeltaEvent.prototype.deltas = $util.emptyArray;

                    /**
                     * Creates a new WorldDeltaEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaEvent} WorldDeltaEvent instance
                     */
                    WorldDeltaEvent.create = function create(properties) {
                        return new WorldDeltaEvent(properties);
                    };

                    /**
                     * Encodes the specified WorldDeltaEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaEvent} message WorldDeltaEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WorldDeltaEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.deltas != null && message.deltas.length)
                            for (let i = 0; i < message.deltas.length; ++i)
                                $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.encode(message.deltas[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified WorldDeltaEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.WorldDeltaEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IWorldDeltaEvent} message WorldDeltaEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    WorldDeltaEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a WorldDeltaEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaEvent} WorldDeltaEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WorldDeltaEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.WorldDeltaEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    if (!(message.deltas && message.deltas.length))
                                        message.deltas = [];
                                    message.deltas.push($root.dev.briiqn.verbalize.proto.WorldDeltaRecord.decode(reader, reader.uint32(), undefined, long + 1));
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a WorldDeltaEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaEvent} WorldDeltaEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    WorldDeltaEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a WorldDeltaEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    WorldDeltaEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.deltas != null && Object.hasOwnProperty.call(message, "deltas")) {
                            if (!Array.isArray(message.deltas))
                                return "deltas: array expected";
                            for (let i = 0; i < message.deltas.length; ++i) {
                                let error = $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.verify(message.deltas[i], long + 1);
                                if (error)
                                    return "deltas." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a WorldDeltaEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.WorldDeltaEvent} WorldDeltaEvent
                     */
                    WorldDeltaEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.WorldDeltaEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.WorldDeltaEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.WorldDeltaEvent();
                        if (object.deltas) {
                            if (!Array.isArray(object.deltas))
                                throw TypeError(".dev.briiqn.verbalize.proto.WorldDeltaEvent.deltas: array expected");
                            message.deltas = [];
                            for (let i = 0; i < object.deltas.length; ++i) {
                                if (!$util.isObject(object.deltas[i]))
                                    throw TypeError(".dev.briiqn.verbalize.proto.WorldDeltaEvent.deltas: object expected");
                                message.deltas[i] = $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.fromObject(object.deltas[i], long + 1);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a WorldDeltaEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.WorldDeltaEvent} message WorldDeltaEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    WorldDeltaEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.deltas = [];
                        if (message.deltas && message.deltas.length) {
                            object.deltas = [];
                            for (let j = 0; j < message.deltas.length; ++j)
                                object.deltas[j] = $root.dev.briiqn.verbalize.proto.WorldDeltaRecord.toObject(message.deltas[j], options, q + 1);
                        }
                        return object;
                    };

                    /**
                     * Converts this WorldDeltaEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    WorldDeltaEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for WorldDeltaEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.WorldDeltaEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    WorldDeltaEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.WorldDeltaEvent";
                    };

                    return WorldDeltaEvent;
                })();

                proto.VoiceRelayEvent = (function() {

                    /**
                     * Properties of a VoiceRelayEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface IVoiceRelayEvent
                     * @property {number|null} [speakerNetId] VoiceRelayEvent speakerNetId
                     * @property {number|null} [originXMm] VoiceRelayEvent originXMm
                     * @property {number|null} [originZMm] VoiceRelayEvent originZMm
                     * @property {Uint8Array|null} [opusChunk] VoiceRelayEvent opusChunk
                     * @property {number|null} [chunkSeq] VoiceRelayEvent chunkSeq
                     */

                    /**
                     * Constructs a new VoiceRelayEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a VoiceRelayEvent.
                     * @implements IVoiceRelayEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.IVoiceRelayEvent=} [properties] Properties to set
                     */
                    function VoiceRelayEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * VoiceRelayEvent speakerNetId.
                     * @member {number} speakerNetId
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @instance
                     */
                    VoiceRelayEvent.prototype.speakerNetId = 0;

                    /**
                     * VoiceRelayEvent originXMm.
                     * @member {number} originXMm
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @instance
                     */
                    VoiceRelayEvent.prototype.originXMm = 0;

                    /**
                     * VoiceRelayEvent originZMm.
                     * @member {number} originZMm
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @instance
                     */
                    VoiceRelayEvent.prototype.originZMm = 0;

                    /**
                     * VoiceRelayEvent opusChunk.
                     * @member {Uint8Array} opusChunk
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @instance
                     */
                    VoiceRelayEvent.prototype.opusChunk = $util.newBuffer([]);

                    /**
                     * VoiceRelayEvent chunkSeq.
                     * @member {number} chunkSeq
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @instance
                     */
                    VoiceRelayEvent.prototype.chunkSeq = 0;

                    /**
                     * Creates a new VoiceRelayEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IVoiceRelayEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.VoiceRelayEvent} VoiceRelayEvent instance
                     */
                    VoiceRelayEvent.create = function create(properties) {
                        return new VoiceRelayEvent(properties);
                    };

                    /**
                     * Encodes the specified VoiceRelayEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceRelayEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IVoiceRelayEvent} message VoiceRelayEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    VoiceRelayEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.speakerNetId != null && Object.hasOwnProperty.call(message, "speakerNetId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.speakerNetId);
                        if (message.originXMm != null && Object.hasOwnProperty.call(message, "originXMm"))
                            writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.originXMm);
                        if (message.originZMm != null && Object.hasOwnProperty.call(message, "originZMm"))
                            writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.originZMm);
                        if (message.opusChunk != null && Object.hasOwnProperty.call(message, "opusChunk"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.opusChunk);
                        if (message.chunkSeq != null && Object.hasOwnProperty.call(message, "chunkSeq"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.chunkSeq);
                        return writer;
                    };

                    /**
                     * Encodes the specified VoiceRelayEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.VoiceRelayEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.IVoiceRelayEvent} message VoiceRelayEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    VoiceRelayEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a VoiceRelayEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.VoiceRelayEvent} VoiceRelayEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    VoiceRelayEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.VoiceRelayEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.speakerNetId = reader.uint32();
                                    break;
                                }
                            case 2: {
                                    message.originXMm = reader.sint32();
                                    break;
                                }
                            case 3: {
                                    message.originZMm = reader.sint32();
                                    break;
                                }
                            case 4: {
                                    message.opusChunk = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.chunkSeq = reader.uint32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a VoiceRelayEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.VoiceRelayEvent} VoiceRelayEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    VoiceRelayEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a VoiceRelayEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    VoiceRelayEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.speakerNetId != null && Object.hasOwnProperty.call(message, "speakerNetId"))
                            if (!$util.isInteger(message.speakerNetId))
                                return "speakerNetId: integer expected";
                        if (message.originXMm != null && Object.hasOwnProperty.call(message, "originXMm"))
                            if (!$util.isInteger(message.originXMm))
                                return "originXMm: integer expected";
                        if (message.originZMm != null && Object.hasOwnProperty.call(message, "originZMm"))
                            if (!$util.isInteger(message.originZMm))
                                return "originZMm: integer expected";
                        if (message.opusChunk != null && Object.hasOwnProperty.call(message, "opusChunk"))
                            if (!(message.opusChunk && typeof message.opusChunk.length === "number" || $util.isString(message.opusChunk)))
                                return "opusChunk: buffer expected";
                        if (message.chunkSeq != null && Object.hasOwnProperty.call(message, "chunkSeq"))
                            if (!$util.isInteger(message.chunkSeq))
                                return "chunkSeq: integer expected";
                        return null;
                    };

                    /**
                     * Creates a VoiceRelayEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.VoiceRelayEvent} VoiceRelayEvent
                     */
                    VoiceRelayEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.VoiceRelayEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.VoiceRelayEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.VoiceRelayEvent();
                        if (object.speakerNetId != null)
                            message.speakerNetId = object.speakerNetId >>> 0;
                        if (object.originXMm != null)
                            message.originXMm = object.originXMm | 0;
                        if (object.originZMm != null)
                            message.originZMm = object.originZMm | 0;
                        if (object.opusChunk != null)
                            if (typeof object.opusChunk === "string")
                                $util.base64.decode(object.opusChunk, message.opusChunk = $util.newBuffer($util.base64.length(object.opusChunk)), 0);
                            else if (object.opusChunk.length >= 0)
                                message.opusChunk = object.opusChunk;
                        if (object.chunkSeq != null)
                            message.chunkSeq = object.chunkSeq >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a VoiceRelayEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.VoiceRelayEvent} message VoiceRelayEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    VoiceRelayEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.speakerNetId = 0;
                            object.originXMm = 0;
                            object.originZMm = 0;
                            if (options.bytes === String)
                                object.opusChunk = "";
                            else {
                                object.opusChunk = [];
                                if (options.bytes !== Array)
                                    object.opusChunk = $util.newBuffer(object.opusChunk);
                            }
                            object.chunkSeq = 0;
                        }
                        if (message.speakerNetId != null && Object.hasOwnProperty.call(message, "speakerNetId"))
                            object.speakerNetId = message.speakerNetId;
                        if (message.originXMm != null && Object.hasOwnProperty.call(message, "originXMm"))
                            object.originXMm = message.originXMm;
                        if (message.originZMm != null && Object.hasOwnProperty.call(message, "originZMm"))
                            object.originZMm = message.originZMm;
                        if (message.opusChunk != null && Object.hasOwnProperty.call(message, "opusChunk"))
                            object.opusChunk = options.bytes === String ? $util.base64.encode(message.opusChunk, 0, message.opusChunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.opusChunk) : message.opusChunk;
                        if (message.chunkSeq != null && Object.hasOwnProperty.call(message, "chunkSeq"))
                            object.chunkSeq = message.chunkSeq;
                        return object;
                    };

                    /**
                     * Converts this VoiceRelayEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    VoiceRelayEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for VoiceRelayEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.VoiceRelayEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    VoiceRelayEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.VoiceRelayEvent";
                    };

                    return VoiceRelayEvent;
                })();

                proto.NpcStreamChunkEvent = (function() {

                    /**
                     * Properties of a NpcStreamChunkEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @interface INpcStreamChunkEvent
                     * @property {string|null} [interactionId] NpcStreamChunkEvent interactionId
                     * @property {number|null} [npcNetId] NpcStreamChunkEvent npcNetId
                     * @property {string|null} [textDelta] NpcStreamChunkEvent textDelta
                     * @property {Uint8Array|null} [audioChunk] NpcStreamChunkEvent audioChunk
                     * @property {number|null} [chunkIndex] NpcStreamChunkEvent chunkIndex
                     * @property {boolean|null} [isComplete] NpcStreamChunkEvent isComplete
                     */

                    /**
                     * Constructs a new NpcStreamChunkEvent.
                     * @memberof dev.briiqn.verbalize.proto
                     * @classdesc Represents a NpcStreamChunkEvent.
                     * @implements INpcStreamChunkEvent
                     * @constructor
                     * @param {dev.briiqn.verbalize.proto.INpcStreamChunkEvent=} [properties] Properties to set
                     */
                    function NpcStreamChunkEvent(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * NpcStreamChunkEvent interactionId.
                     * @member {string} interactionId
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     */
                    NpcStreamChunkEvent.prototype.interactionId = "";

                    /**
                     * NpcStreamChunkEvent npcNetId.
                     * @member {number} npcNetId
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     */
                    NpcStreamChunkEvent.prototype.npcNetId = 0;

                    /**
                     * NpcStreamChunkEvent textDelta.
                     * @member {string} textDelta
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     */
                    NpcStreamChunkEvent.prototype.textDelta = "";

                    /**
                     * NpcStreamChunkEvent audioChunk.
                     * @member {Uint8Array} audioChunk
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     */
                    NpcStreamChunkEvent.prototype.audioChunk = $util.newBuffer([]);

                    /**
                     * NpcStreamChunkEvent chunkIndex.
                     * @member {number} chunkIndex
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     */
                    NpcStreamChunkEvent.prototype.chunkIndex = 0;

                    /**
                     * NpcStreamChunkEvent isComplete.
                     * @member {boolean} isComplete
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     */
                    NpcStreamChunkEvent.prototype.isComplete = false;

                    /**
                     * Creates a new NpcStreamChunkEvent instance using the specified properties.
                     * @function create
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.INpcStreamChunkEvent=} [properties] Properties to set
                     * @returns {dev.briiqn.verbalize.proto.NpcStreamChunkEvent} NpcStreamChunkEvent instance
                     */
                    NpcStreamChunkEvent.create = function create(properties) {
                        return new NpcStreamChunkEvent(properties);
                    };

                    /**
                     * Encodes the specified NpcStreamChunkEvent message. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcStreamChunkEvent.verify|verify} messages.
                     * @function encode
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.INpcStreamChunkEvent} message NpcStreamChunkEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    NpcStreamChunkEvent.encode = function encode(message, writer, q) {
                        if (!writer)
                            writer = $Writer.create();
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        if (message.interactionId != null && Object.hasOwnProperty.call(message, "interactionId"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.interactionId);
                        if (message.npcNetId != null && Object.hasOwnProperty.call(message, "npcNetId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.npcNetId);
                        if (message.textDelta != null && Object.hasOwnProperty.call(message, "textDelta"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.textDelta);
                        if (message.audioChunk != null && Object.hasOwnProperty.call(message, "audioChunk"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.audioChunk);
                        if (message.chunkIndex != null && Object.hasOwnProperty.call(message, "chunkIndex"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.chunkIndex);
                        if (message.isComplete != null && Object.hasOwnProperty.call(message, "isComplete"))
                            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isComplete);
                        return writer;
                    };

                    /**
                     * Encodes the specified NpcStreamChunkEvent message, length delimited. Does not implicitly {@link dev.briiqn.verbalize.proto.NpcStreamChunkEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.INpcStreamChunkEvent} message NpcStreamChunkEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    NpcStreamChunkEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                    };

                    /**
                     * Decodes a NpcStreamChunkEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {dev.briiqn.verbalize.proto.NpcStreamChunkEvent} NpcStreamChunkEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    NpcStreamChunkEvent.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end, message;
                        if (length === undefined)
                            end = reader.len;
                        else {
                            end = reader.pos + length;
                            if (end > reader.len)
                                throw RangeError("index out of range");
                            length = reader.len;
                            reader.len = end;
                        }
                        message = new $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.interactionId = reader.string();
                                    break;
                                }
                            case 2: {
                                    message.npcNetId = reader.uint32();
                                    break;
                                }
                            case 3: {
                                    message.textDelta = reader.string();
                                    break;
                                }
                            case 4: {
                                    message.audioChunk = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.chunkIndex = reader.uint32();
                                    break;
                                }
                            case 6: {
                                    message.isComplete = reader.bool();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        if (length !== undefined) {
                            if (reader.pos !== end)
                                throw RangeError("index out of range");
                            reader.len = length;
                        }
                        return message;
                    };

                    /**
                     * Decodes a NpcStreamChunkEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {dev.briiqn.verbalize.proto.NpcStreamChunkEvent} NpcStreamChunkEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    NpcStreamChunkEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a NpcStreamChunkEvent message.
                     * @function verify
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    NpcStreamChunkEvent.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        if (message.interactionId != null && Object.hasOwnProperty.call(message, "interactionId"))
                            if (!$util.isString(message.interactionId))
                                return "interactionId: string expected";
                        if (message.npcNetId != null && Object.hasOwnProperty.call(message, "npcNetId"))
                            if (!$util.isInteger(message.npcNetId))
                                return "npcNetId: integer expected";
                        if (message.textDelta != null && Object.hasOwnProperty.call(message, "textDelta"))
                            if (!$util.isString(message.textDelta))
                                return "textDelta: string expected";
                        if (message.audioChunk != null && Object.hasOwnProperty.call(message, "audioChunk"))
                            if (!(message.audioChunk && typeof message.audioChunk.length === "number" || $util.isString(message.audioChunk)))
                                return "audioChunk: buffer expected";
                        if (message.chunkIndex != null && Object.hasOwnProperty.call(message, "chunkIndex"))
                            if (!$util.isInteger(message.chunkIndex))
                                return "chunkIndex: integer expected";
                        if (message.isComplete != null && Object.hasOwnProperty.call(message, "isComplete"))
                            if (typeof message.isComplete !== "boolean")
                                return "isComplete: boolean expected";
                        return null;
                    };

                    /**
                     * Creates a NpcStreamChunkEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {dev.briiqn.verbalize.proto.NpcStreamChunkEvent} NpcStreamChunkEvent
                     */
                    NpcStreamChunkEvent.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent)
                            return object;
                        if (!$util.isObject(object))
                            throw TypeError(".dev.briiqn.verbalize.proto.NpcStreamChunkEvent: object expected");
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.dev.briiqn.verbalize.proto.NpcStreamChunkEvent();
                        if (object.interactionId != null)
                            message.interactionId = String(object.interactionId);
                        if (object.npcNetId != null)
                            message.npcNetId = object.npcNetId >>> 0;
                        if (object.textDelta != null)
                            message.textDelta = String(object.textDelta);
                        if (object.audioChunk != null)
                            if (typeof object.audioChunk === "string")
                                $util.base64.decode(object.audioChunk, message.audioChunk = $util.newBuffer($util.base64.length(object.audioChunk)), 0);
                            else if (object.audioChunk.length >= 0)
                                message.audioChunk = object.audioChunk;
                        if (object.chunkIndex != null)
                            message.chunkIndex = object.chunkIndex >>> 0;
                        if (object.isComplete != null)
                            message.isComplete = Boolean(object.isComplete);
                        return message;
                    };

                    /**
                     * Creates a plain object from a NpcStreamChunkEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {dev.briiqn.verbalize.proto.NpcStreamChunkEvent} message NpcStreamChunkEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    NpcStreamChunkEvent.toObject = function toObject(message, options, q) {
                        if (!options)
                            options = {};
                        if (q === undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw Error("max depth exceeded");
                        let object = {};
                        if (options.defaults) {
                            object.interactionId = "";
                            object.npcNetId = 0;
                            object.textDelta = "";
                            if (options.bytes === String)
                                object.audioChunk = "";
                            else {
                                object.audioChunk = [];
                                if (options.bytes !== Array)
                                    object.audioChunk = $util.newBuffer(object.audioChunk);
                            }
                            object.chunkIndex = 0;
                            object.isComplete = false;
                        }
                        if (message.interactionId != null && Object.hasOwnProperty.call(message, "interactionId"))
                            object.interactionId = message.interactionId;
                        if (message.npcNetId != null && Object.hasOwnProperty.call(message, "npcNetId"))
                            object.npcNetId = message.npcNetId;
                        if (message.textDelta != null && Object.hasOwnProperty.call(message, "textDelta"))
                            object.textDelta = message.textDelta;
                        if (message.audioChunk != null && Object.hasOwnProperty.call(message, "audioChunk"))
                            object.audioChunk = options.bytes === String ? $util.base64.encode(message.audioChunk, 0, message.audioChunk.length) : options.bytes === Array ? Array.prototype.slice.call(message.audioChunk) : message.audioChunk;
                        if (message.chunkIndex != null && Object.hasOwnProperty.call(message, "chunkIndex"))
                            object.chunkIndex = message.chunkIndex;
                        if (message.isComplete != null && Object.hasOwnProperty.call(message, "isComplete"))
                            object.isComplete = message.isComplete;
                        return object;
                    };

                    /**
                     * Converts this NpcStreamChunkEvent to JSON.
                     * @function toJSON
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    NpcStreamChunkEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for NpcStreamChunkEvent
                     * @function getTypeUrl
                     * @memberof dev.briiqn.verbalize.proto.NpcStreamChunkEvent
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    NpcStreamChunkEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/dev.briiqn.verbalize.proto.NpcStreamChunkEvent";
                    };

                    return NpcStreamChunkEvent;
                })();

                return proto;
            })();

            return verbalize;
        })();

        return briiqn;
    })();

    return dev;
})();

export { $root as default };
