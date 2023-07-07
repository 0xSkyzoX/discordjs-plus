import { Constants } from "../constants";
import Channel from "./channel";

export default class Guild{
     private token: string;
     channels: Channels;
     guild_id: string;
     constructor(token: string, guild_id: string) {
          this.token = token
          this.channels =  new Channels(token, guild_id)
          this.guild_id = guild_id
     }
}

class Channels {
     private token: string;
     private guild_id: string
     constructor(token: string, guild_id: string) {
          this.token = token;
          this.guild_id = guild_id
     }
     public async all() {
          try {
               const response = await fetch(`${Constants.API_BASE}/guilds/${this.guild_id}/channels`, {
                    method: "GET",
                    headers: {
                         'Authorization': `Bot ${this.token}`,
                         'Content-Type': 'application/json'
                    }
               })
               if (response.ok) {
                    return await response.json()
               } else {
                    console.log("ERR ", response.status)
               }
          } catch(err) {
               console.log(err)
          }
     }
}