import dotenv from "dotenv";
dotenv.config()
import Message from "../discordjs/Client/Message";
import Discord from "../discordjs/index";
import { ActivityType} from "../discordjs/datatypes";
import Interactions from "../discordjs/Client/Interactions/interactions";

const TOKEN = process.env.TOKEN
const discord = new Discord(TOKEN)

// Discord event listener function

discord.listen("Message_Create", async (message: Message) => {
     if (message.author.bot) return;
     if (message.content == "Hello") {
          message.channel.send({content: "Hello G"})
          message.react("👍")
     }
})

discord.listen("Interaction_Create", async (interaction: Interactions) => {
     if (interaction.data.name == "help") {
          interaction.reply({type: 4, data: {content: "yo yo yo"}})
          interaction.channel.send({content: "Hello, "+ interaction.member.user.username})
     }
})

// Discord.js FC (function)

discord.FC(async () => {
     discord.presence("online", {activities: [{name: "discord.js plus", type: ActivityType.Listening}]})
})

// Discord connect, to Websocket Gateway

discord.connect((client) => {
     console.log(`${client.username} Online`)
})