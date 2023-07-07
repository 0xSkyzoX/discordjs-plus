import dotenv from "dotenv";
dotenv.config()
import Message from "../discordjs/Client/Message";
import Discord from "../discordjs/index";
import { ActivityType, InteractionData, InteractionInfo } from "../discordjs/datatypes";
import Interactions from "../discordjs/Client/Interactions/interactions";

const TOKEN = process.env.TOKEN
const discord = new Discord(TOKEN)

// Discord event listener function

discord.listen("Message_Create", async (message: Message) => {
     if (message.author.bot) return;
     if (message.content == "Hello") {
          message.send("Hey world, "+ message.client.username)
          message.react("👍")
     }
})

discord.listen("Interaction_Create", async (interaction: Interactions) => {
     if (interaction.data.name == "help") {
          interaction.channel.send({content: "Hello"})
          interaction.reply("Yo  yo yo")
     }
})

// Discord.js FC (function)

discord.FC(async () => {
     discord.presence("idle", {activities: [{name: "discord.js plus", type: ActivityType.Listening}]})
})

// Discord connect, to Websocket Gateway

discord.connect((client) => {
     console.log(`${client.username} Online`)
})