import { UserInfo } from "../@types/datatypes";

export default class Author implements UserInfo {
     username: string;
     public_flags: number;
     global_name: string;
     bot: boolean;
     avatar: string;
     avatar_decoration: string;
     discriminator: string;
     id: string;
     private token: string;
     constructor(token: string, author: UserInfo) {
          this.token = token
          this.username = author.username
          this.avatar = author.avatar
          this.discriminator = author.discriminator
          this.bot = author.bot
          this.public_flags = author.public_flags
          this.id = author.id
          this.global_name = author.global_name
          this.avatar_decoration = author.avatar_decoration
     }
     public avatarURL() {
          return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.webp?size=96`
     }
}