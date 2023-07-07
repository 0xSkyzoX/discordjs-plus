import dotenv from "dotenv";
dotenv.config()
import Message from "../discordjs/Client/Message";
import Discord, { ActivityType } from "../discordjs/index";
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

// Discord.js FC (function)

discord.FC(async () => {
     discord.presence("idle", { activities: [{ name: "Discord.js Plus", type: ActivityType.Game }] })
})

// Discord connect, to Websocket Gateway

discord.connect((client) => {
     console.log(`${client.username} Online`)
})