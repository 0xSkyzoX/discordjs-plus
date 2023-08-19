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
const Messages_1 = __importDefault(require("./Messages"));
class Channel {
    constructor(token, channel_id = "") {
        this.token = token;
        this.channel_id = channel_id;
        this.messages = new Messages_1.default(token, channel_id);
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel_id)
                return console.log("Invalid Channel ID, GET");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${this.channel_id}`, {
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
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel_id)
                return console.log("Invalid Channel ID, GET");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${this.channel_id}/messages`, {
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
    send(data) {
        if (!data)
            return console.log("invalid data");
        try {
            fetch(`${constants_1.Constants.API_BASE}/channels/${this.channel_id}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bot ${this.token}`
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if (!res.ok) {
                    console.log("ERR ", res.status);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    bulkDelete(length) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.getMessages();
            const messagesIDS = messages.slice(0, length).map((msg) => msg.id);
            try {
                fetch(`${constants_1.Constants.API_BASE}/channels/${this.channel_id}/messages/bulk-delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({ messages: messagesIDS })
                }).then((res) => {
                    if (!res.ok) {
                        console.log("ERR, ", res.status);
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = Channel;
//# sourceMappingURL=channel.js.map