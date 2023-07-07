"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const ws_1 = __importDefault(require("ws"));
const channel_1 = __importDefault(require("./Client/channel"));
const guild_1 = __importDefault(require("./Client/guild"));
const Message_1 = __importDefault(require("./Client/Message"));
const interactions_1 = __importDefault(require("./Client/Interactions/interactions"));
const webSocket = new ws_1.default(constants_1.Constants.GATEWAY);
var InitPresenceData = {
    activities: [{ name: "", type: 0 }],
    status: "online"
};
class Discord {
    constructor(token) {
        this.token = token;
        this.channel = new channel_1.default(token);
        this.guild = new guild_1.default(token);
    }
    /**
     * changing bot presence and customize it as you want
     * @param status client online action
     * @param activities customize bot activity
     */
    presence(status, { activities: [{ name, type }] }) {
        InitPresenceData.status = status;
        InitPresenceData.activities = [{ name: name, type: type }];
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/users/@me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bot ${this.token}`
                    }
                });
                const data = yield response.json();
                if (response.ok) {
                    return data;
                }
                else {
                    console.log("ERR ", response.status);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * important to make the bot online
     * @param ready params contain client bot information
     */
    connect(ready) {
        return __awaiter(this, void 0, void 0, function* () {
            webSocket.on('open', () => {
                // identification payload
                const identificationPayload = {
                    op: 2,
                    d: {
                        token: this.token,
                        intents: 513,
                        properties: {
                            "os": "linux",
                            "browser": "my_library",
                            "device": "my_library"
                        },
                        presence: InitPresenceData,
                        session_id: null
                    },
                };
                webSocket.send(JSON.stringify(identificationPayload));
                const heartbeatInterval = 1000 * 30; // Every 30 seconds
                setInterval(() => {
                    const heartbeatPayload = {
                        op: 1,
                        d: null,
                    };
                    webSocket.send(JSON.stringify(heartbeatPayload));
                }, heartbeatInterval);
            });
            const clientInfos = yield this.getClient();
            ready(clientInfos);
        });
    }
    /**
     * listening to event
     * @param type Event
     */
    listen(type, paramsEvent) {
        webSocket.addEventListener("message", (e) => __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse(e.data.toString());
            if (type == "Message_Create") {
                if (data.t == "MESSAGE_CREATE") {
                    const _message = data.d;
                    const message = new Message_1.default(this.token, _message);
                    yield message.client.getClientData();
                    paramsEvent(message);
                }
            }
            if (type == "Interaction_Create") {
                if (data.t == "INTERACTION_CREATE") {
                    const _data = data.d;
                    console.log(data);
                    const interaction = new interactions_1.default(this.token, _data, webSocket);
                    paramsEvent(interaction);
                }
            }
        }));
        webSocket.on('error', (error) => {
            console.error('WebSocket connection error:', error);
        });
        webSocket.on('close', (code, reason) => {
            console.log('WebSocket connection closed.', 'Code:', code, 'Reason:', reason);
        });
    }
    /**
     * sending Message to a specific channel by id
     * @param channel_id choosing a channel by putting id
     * @param content message content text
     * @returns
     */
    sendMessage(channel_id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content)
                return console.log("Invalid Message Content");
            if (!channel_id)
                return console.log("Invalid Channel Id");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${channel_id}/messages`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({ content: content }),
                    method: "POST"
                });
                const data = yield response.json();
                if (!response.ok) {
                    console.log("status", response.status, " error!");
                }
                else {
                    this.messageSendData = data;
                    return data;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * Edit some specific message by add their message and channel id
     * @param value
     * @param channel_id
     * @param message_id
     * @returns Promise Void fetch Async
     */
    editMessage(value, channel_id = "", message_id = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value)
                return console.log("Invalid Value");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${this.messageSendData.channel_id || channel_id}/messages/${this.messageSendData.id || message_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({ content: value })
                });
                if (!response.ok) {
                    console.log("err status ", response.status);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * sending embed mesasge to a specific channel
     * @param channel_id message embed channel
     * @param embed informations JSON
     * @returns
     */
    sendEmbed(channel_id, embed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!embed)
                return console.log("Invalid Embed JSON");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${channel_id}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({ embeds: [embed] })
                });
                if (!response.ok) {
                    console.log("err status ", response.status);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * Discord function
     * @param function
     */
    FC(fun) {
        fun();
    }
}
exports.default = Discord;
//# sourceMappingURL=index.js.map