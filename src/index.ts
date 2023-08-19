import dotenv from "dotenv";
dotenv.config()
import Message from '../discordjs/Client/Message';
import { ActivityType, ApplicationsTypes, InteractionTypeResponse, OptionsType, Role } from '../discordjs/datatypes';
import Interactions from "../discordjs/Client/Interactions/interactions";
import Discord from "../discordjs"

const TOKEN = process.env.TOKEN
const discord = new Discord(TOKEN)
class Test {
     text: string
     constructor(text: string) {
          this.text = text
     }
     print() {
          console.log(this.text)
     }
}

// Discord event listener function-

discord.listen("Message_Create", async (message: Message) => {
     if (message.author.bot) return;
     if (message.content === 'reactions') {
          console.log((await message.channel.messages.get()).reverse().map((message) => {
               if (message.reactions) {
                    return message.reactions[0].count
               }
          }))
         
     }
})

discord.listen("Message_Create", async (message: Message) => {
     if (message.author.bot) return;
     if (message.content.startsWith("!clear")) {
          const args = message.content.split(" ")
          const argsNUM: number = (args[1] as unknown) as number
          if (argsNUM < 2) {
               return discord.FC(() => {
                    message.reply({content: "Error || Message Clear number should be than 2!"})
                    setTimeout(() => {
                         message.client.deleteMessage()
                    }, 3000)
               })
          }
          message.reply({content: "Yo yo"})
          message.react("👍")
          message.channel.bulkDelete(argsNUM)
     }
})

discord.listen("Message_Create", (message: Message) => {
     if (message.author.bot) return;
     if (message.content === "212") {
          message.reply({content: "Hello Mate!"})
          discord.sendEmbed(message.channel_id, {title: "Hello World", description: "This is a Discord Bot!", color: 0xfff, author: {name: message.author.global_name, icon_url: message.author.avatarURL()}})
          console.log(message.author.avatar)
     }
} )

discord.listen("Interaction_Create", async (interaction: Interactions) => {
     if (interaction.data.name == "help") {
          interaction.send({type: InteractionTypeResponse.CHANNEL_MESSAGE_WITH_SOURCE, data: {content: "Hello"}})
          interaction.channel.send({content: "Hello, "+ interaction.member.user.username})
     }
})

// Discord.js FC (function)

discord.FC(async () => {
     discord.presence("online", {activities: [{name: "discord.js plus", type: ActivityType.Listening}]})
     discord.client_interaction.setApplicationId("1076585679687008326")
     await discord.client_interaction.registerSlashcommand("GLOBAL", {name: 'hello',description: 'Your command description', options: [{name: "your", type: OptionsType.STRING, description: "the best code"}]})
})

// Discord connect, to Websocket Gateway

discord.connect((client) => {
     console.log(`${client.username} Online`)
})