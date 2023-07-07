import { Constants } from "../constants";
import { UserInfo } from "../datatypes";

export default class Client implements UserInfo {
     private token: string
     username: string;
     bot: boolean;
     global_name: string;
     public_flags: number;
     id: string;
     avatar: string;
     avatar_decoration: string;
     discriminator: string;
     constructor(token: string) {
          this.token = token
     }
     public async getClientData() {
          try {
               const response = await fetch(`${Constants.API_BASE}/users/@me`,
               {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bot ${this.token}`
                    }
               })
               const data: UserInfo = await response.json()
               if (response.ok) {
                    this.bot = data.bot
                    this.username = data.username
                    this.discriminator = data.discriminator
                    this.global_name = data.global_name
                    this.id = data.id
                    this.public_flags = data.public_flags
                    this.avatar = data.avatar
                    this.avatar_decoration = data.avatar_decoration
               } else {
                    console.log("ERR", response.status)
               }
          } catch(err) {
               console.log(err)
          }
     }
}