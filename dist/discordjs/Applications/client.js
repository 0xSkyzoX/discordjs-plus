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
class ClientInteraction {
    constructor(token) {
        this.token = token;
        this.interactions = new Interactions(token);
    }
    setApplicationId(id) {
        this.application_id = id;
    }
    fetch(path, headers, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fetch(`${constants_1.Constants.API_BASE}${path}`, {
                    method: method,
                    headers: Object.assign(Object.assign({}, headers), { "Authorization": `Bot ${this.token}` }),
                    body: body
                }).then((res) => {
                    if (!res.ok) {
                        console.log("ERR ,", res.status);
                    }
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    registerSlashcommand(type, slashCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!type)
                return console.error("Invalid Application Type!");
            if (!slashCommand)
                return console.error("Invalid Application JSON informations");
            if (type && slashCommand) {
                if (type == "GLOBAL") {
                    yield this.fetch(`/applications/${this.application_id}/commands`, { "Content-Type": "application/json" }, "POST", JSON.stringify(slashCommand));
                }
            }
        });
    }
}
exports.default = ClientInteraction;
class Interactions {
    constructor(token) {
        this.token = token;
    }
    get(type, application_id, command_id, guild_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!application_id || !command_id)
                return console.log("Invalid Data to GET Application Inforamtions");
            try {
                if (type == "GLOBAL") {
                    const response = yield fetch(`${constants_1.Constants.API_BASE}/applications/${application_id}/commands/${command_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bot ${this.token}`
                        }
                    });
                    const data = yield response.json();
                    if (response.ok) {
                        return yield data;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            return new Promise((resolve, reject) => {
                resolve(() => {
                    console.log("Hey");
                });
            });
        });
    }
}
//# sourceMappingURL=client.js.map