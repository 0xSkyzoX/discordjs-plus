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
const constants_1 = require("../constants");
const channel_1 = __importDefault(require("./channel"));
const client_1 = __importDefault(require("./client"));
const guild_1 = __importDefault(require("./guild"));
class Message {
    constructor(token, data) {
        this.token = token;
        this.id = data.id;
        this.type = data.type;
        this.author = data.author;
        this.components = data.components;
        this.flags = data.flags;
        this.channel_id = data.channel_id;
        this.pinned = data.pinned;
        this.mention_everyone = data.mention_everyone;
        this.edited_timestamp = data.edited_timestamp;
        this.referenced_message = data.referenced_message;
        this.tts = data.tts;
        this.embeds = data.embeds;
        this.content = data.content;
        this.client = new client_1.default(token);
        this.channel = new channel_1.default(token, data.channel_id);
        this.guild = new guild_1.default(token, this.channel.guild_id);
    }
    send(content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content)
                return console.log("Invalid Message Send Content!");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${this.channel_id}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({ content: content })
                });
                const data = yield response.json();
                if (!response.ok) {
                    console.log("ERR ", response.status);
                }
                else {
                    console.log("Data Message: ", data);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * add react to a response message
     * @param reaction
     * @returns
     */
    react(reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!reaction)
                return console.log("Invalid Reaction!");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${this.channel_id}/messages/${this.id}/reactions/${encodeURIComponent(reaction)}/@me`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bot ${this.token}`,
                    }
                });
                if (!response.ok) {
                    console.log("ERR ", response.status);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map