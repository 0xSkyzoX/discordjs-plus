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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("../discordjs/index"));
const datatypes_1 = require("../discordjs/datatypes");
const TOKEN = process.env.TOKEN;
const discord = new index_1.default(TOKEN);
// Discord event listener function
discord.listen("Message_Create", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (message.content == "Hello") {
        message.channel.send({ content: "Hello G" });
        message.react("👍");
    }
}));
discord.listen("Interaction_Create", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.data.name == "help") {
        interaction.reply({ type: 4, data: { content: "yo yo yo" } });
        interaction.channel.send({ content: "Hello, " + interaction.member.user.username });
    }
}));
// Discord.js FC (function)
discord.FC(() => __awaiter(void 0, void 0, void 0, function* () {
    discord.presence("online", { activities: [{ name: "discord.js plus", type: datatypes_1.ActivityType.Listening }] });
}));
// Discord connect, to Websocket Gateway
discord.connect((client) => {
    console.log(`${client.username} Online`);
});
//# sourceMappingURL=index.js.map