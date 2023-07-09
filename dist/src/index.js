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
const datatypes_1 = require("../discordjs/datatypes");
const discordjs_1 = __importDefault(require("../discordjs"));
const TOKEN = process.env.TOKEN;
const discord = new discordjs_1.default(TOKEN);
class Test {
    constructor(text) {
        this.text = text;
    }
    print() {
        console.log(this.text);
    }
}
// Discord event listener function
discord.listen("Message_Create", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (message.content.startsWith("!clear")) {
        const args = message.content.split(" ");
        const argsNUM = args[1];
        if (argsNUM < 2) {
            return discord.FC(() => {
                message.reply({ content: "Error || Message Clear number should be than 2!" });
                setTimeout(() => {
                    message.client.deleteMessage();
                }, 3000);
            });
        }
        message.reply({ content: "Yo yo" });
        message.react("👍");
        message.channel.bulkDelete(argsNUM);
    }
}));
discord.listen("Interaction_Create", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.data.name == "help") {
        interaction.send({ type: datatypes_1.InteractionTypeResponse.CHANNEL_MESSAGE_WITH_SOURCE, data: { content: "Hello World" } });
        interaction.channel.send({ content: "Hello, " + interaction.member.user.username });
    }
}));
// Discord.js FC (function)
discord.FC(() => __awaiter(void 0, void 0, void 0, function* () {
    discord.presence("online", { activities: [{ name: "discord.js plus", type: datatypes_1.ActivityType.Listening }] });
    discord.client_interaction.setApplicationId("1076585679687008326");
    yield discord.client_interaction.registerSlashcommand("GLOBAL", { name: 'hello', description: 'Your command description', options: [{ name: "your", type: datatypes_1.OptionsType.STRING, description: "the best code" }] });
}));
// Discord connect, to Websocket Gateway
discord.connect((client) => {
    console.log(`${client.username} Online`);
});
//# sourceMappingURL=index.js.map