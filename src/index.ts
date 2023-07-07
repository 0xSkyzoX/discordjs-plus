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
     const guild = message.guild.channels.all()
     if (message.content == "Hello") {
          message.send("yo yo")
          message.react("👍")
          console.log(guild)
     }
})

discord.listen("Interaction_Create", async (interaction: Interactions) => {
     if (interaction.data.name == "help") {
          interaction.send({type: 4, data: {content: "Hello World"}})
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