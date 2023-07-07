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
class Channel {
    constructor(token) {
        this.token = token;
    }
    get(channel_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!channel_id)
                return console.log("Invalid Channel ID, GET");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${channel_id}`, {
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
    getMessages(channel_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!channel_id)
                return console.log("Invalid Channel ID, GET");
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/channels/${channel_id}/messages`, {
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
}
exports.default = Channel;
//# sourceMappingURL=channel.js.map