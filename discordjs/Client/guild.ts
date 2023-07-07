import { Constants } from "../constants";

export default class Guild{
     private token: string;
     channels: Channels
     constructor(token: string) {
          this.token = token
          this.channels = new Channels(token)
     }
}

class Channels {
     private token: string;
     constructor(token: string) {
          this.token = token
     }
     public async all(guild_id: string) {
          try {
               const response = await fetch(`${Constants.API_BASE}/guilds/${guild_id}/channels`, {
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