import { Constants } from "../constants";
import { ChannelInfo, ChannelType, InteractionResponse, MessageSend } from "../datatypes";

export default class Channel implements ChannelInfo {
     private token: string;
     channel_id: string
     id: string;
     flags: number;
     guild_id: string;
     rate_limit_per_user: string;
     last_message_id: string;
     parent_id: string;
     permission_overwrites: any[];
     position: number;
     topic?: string;
     type: ChannelType;
     name: string;
     nsfw: boolean;
     constructor(token: string, channel_id: string= "") {
          this.token = token
          this.channel_id = channel_id
     }
     public async get() {
          if (!this.channel_id) return console.log("Invalid Channel ID, GET")
          
          try {
               const response = await fetch(`${Constants.API_BASE}/channels/${this.channel_id}`, {
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
     public async getMessages() {
          if (!this.channel_id) return console.log("Invalid Channel ID, GET")
          
          try {
               const response = await fetch(`${Constants.API_BASE}/channels/${this.channel_id}/messages`, {
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
     public send(data: MessageSend) {
          if (!data) return console.log("invalid data")
          try {
               console.log("id: ", this.id)
               console.log("token: ", this.token)
               fetch(`${Constants.API_BASE}/channels/${this.channel_id}/messages`, {
                    method:  "POST",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify(data)
               }).then((res) => {
                    if (!res.ok) {
                         console.log("ERR ",res.status)
                    }
               })
          } catch (err) {
               console.log(err)
          }
     }
}