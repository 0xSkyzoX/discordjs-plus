import { Constants } from "../constants";

export default class Channel {
     private token: string;
     
     constructor(token: string) {
          this.token = token
     }
     public async get(channel_id: string) {
          if (!channel_id) return console.log("Invalid Channel ID, GET")
          
          try {
               const response = await fetch(`${Constants.API_BASE}/channels/${channel_id}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bot ${this.token}`
                    }
               })
               const data = await response.json()
               if (response.ok) {
                    return data
               } else {
                    console.log("ERR ", response.status)
               }
          } catch(err) {
               console.log(err)
          }
     }
     public async getMessages(channel_id : string) {
          if (!channel_id) return console.log("Invalid Channel ID, GET")
          
          try {
               const response = await fetch(`${Constants.API_BASE}/channels/${channel_id}/messages`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bot ${this.token}`
                    }
               })
               const data = await response.json()
               if (response.ok) {
                    return data
               } else {
                    console.log("ERR ", response.status)
               }
          } catch(err) {
               console.log(err)
          }
     }
}