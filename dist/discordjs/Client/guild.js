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
class Guild {
    constructor(token) {
        this.token = token;
        this.channels = new Channels(token);
    }
}
exports.default = Guild;
class Channels {
    constructor(token) {
        this.token = token;
    }
    all(guild_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${constants_1.Constants.API_BASE}/guilds/${guild_id}/channels`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bot ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    return yield response.json();
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
//# sourceMappingURL=guild.js.map