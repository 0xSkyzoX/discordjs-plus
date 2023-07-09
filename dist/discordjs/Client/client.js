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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class Client {
    constructor(token, sendInfos) {
        this.token = token;
        this.sendInfo = sendInfos;
    }
    getClientData() {
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
                    this.bot = data.bot;
                    this.username = data.username;
                    this.discriminator = data.discriminator;
                    this.global_name = data.global_name;
                    this.id = data.id;
                    this.public_flags = data.public_flags;
                    this.avatar = data.avatar;
                    this.avatar_decoration = data.avatar_decoration;
                }
                else {
                    console.log("ERR", response.status);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteMessage() {
        try {
            fetch(`${constants_1.Constants.API_BASE}/channels/${this.sendInfo.channel_id}/messages/${this.sendInfo.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bot ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if (!res.ok) {
                    console.log("ERR, ", res.status);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map