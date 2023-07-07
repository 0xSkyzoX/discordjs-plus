"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const channel_1 = __importDefault(require("../channel"));
class Interactions {
    constructor(token, data, webSocket) {
        this._authtoken = token;
        this.id = data.id;
        this.channel_id = data.channel_id;
        this.guild = data.guild;
        this.version = data.version;
        this.type = data.type;
        this.member = data.member;
        this.data = data.data;
        this.app_permissions = data.app_permissions;
        this.application_id = data.application_id;
        this.entitlement_sku_ids = data.entitlement_sku_ids;
        this.entitlements = data.entitlements;
        this.guild_locale = this.guild_locale;
        this.token = data.token;
        this.locale = data.locale;
        this.channel = new channel_1.default(token, this.channel_id);
        this.webSocket = webSocket;
    }
    reply(data) {
        if (!data)
            return console.log("invalid data");
        try {
            fetch(`${constants_1.Constants.API_BASE}/interactions/${this.id}/${this.token}/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bot ${this._authtoken}`
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
}
exports.default = Interactions;
//# sourceMappingURL=interactions.js.map