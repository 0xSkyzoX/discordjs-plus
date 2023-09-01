import { Constants } from "../constants";
import { ApplicationsTypes, RegisterApplicationInfo } from "../@types/datatypes";

export default class ClientInteraction {
     private token: string
     interactions: Interactions;
     application_id: string;
     constructor(token: string) {
          this.token = token
          this.interactions = new Interactions(token)
     }
     public setApplicationId(id: string) {
          this.application_id = id
     }
     public async fetch(path: string, headers: { "Content-Type": string }, method: string, body?: any ) {
          try {
               fetch(`${Constants.API_BASE}${path}`, {
                    method: method,
                    headers: {
                         ...headers,
                         "Authorization": `Bot ${this.token}`
                    },
                    body: body
               }).then((res) => {
                    if (!res.ok) {
                         console.log("ERR ,", res.status )
                    }
               })
          } catch (err) {
               throw new Error(err)
          }
     }
     public async registerSlashcommand(type: ApplicationsTypes, slashCommand: RegisterApplicationInfo) {
          if (!type) return console.error("Invalid Application Type!")
          if (!slashCommand) return console.error("Invalid Application JSON informations")

          if (type && slashCommand) {
               if (type == "GLOBAL") {
                    await this.fetch(`/applications/${this.application_id}/commands`, 
                    {"Content-Type": "application/json"}, 
                    "POST",
                    JSON.stringify(slashCommand),
                    )
               }
          }
     }
}


class Interactions {
     private token: string
     private application_id: string;
     constructor(token: string) {
          this.token = token
     }
     public async get(type: ApplicationsTypes,application_id: string, command_id: string, guild_id?: string) {
          if (!application_id || !command_id) return console.log("Invalid Data to GET Application Inforamtions")
          try {
               if (type == "GLOBAL") {
                    const response = await fetch(`${Constants.API_BASE}/applications/${application_id}/commands/${command_id}`, {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bot ${this.token}`
                         }
                    })
                    const data = await response.json()
                    if (response.ok) {
                         return await data
                    }
               }
               
          } catch(err) {
               console.log(err)
          }
          return new Promise((resolve, reject) => {
               resolve(() => {
                    console.log("Hey")
               })
          })
     }
     
}