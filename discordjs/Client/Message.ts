import { Constants } from '../constants';
import { MessageInfo, MessageEmbed, UserInfo } from '../datatypes';
import Client from './client';

export default class Message implements MessageInfo {
     private token: string;
     id?: string;
     type?: number;
     content: string;
     channel_id?: string;
     author?: UserInfo;
     tts?: boolean;
     embeds?: MessageEmbed[];
     timestamp?: Date;
     edited_timestamp?: Date;
     flags?: number;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     components?: any[];
     referenced_message?: string;
     mention_everyone?: boolean;
     pinned?: boolean;
     client: Client;
     constructor(token: string, data: MessageInfo) {
          this.token = token;
          this.id = data.id;
          this.type = data.type;
          this.author = data.author;
          this.components = data.components;
          this.flags = data.flags;
          this.channel_id = data.channel_id;
          this.pinned = data.pinned;
          this.mention_everyone = data.mention_everyone;
          this.edited_timestamp = data.edited_timestamp;
          this.referenced_message = data.referenced_message;
          this.tts = data.tts;
          this.embeds = data.embeds;
          this.content = data.content;
          this.client = new Client(token)
     }
     public async send(content: string) {
          if (!content) return console.log("Invalid Message Send Content!")
          try {
               const response = await fetch(`${Constants.API_BASE}/channels/${this.channel_id}/messages`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({ content: content })
               })
               const data = await response.json()
               if (!response.ok) {
                    console.log("ERR ", response.status)
               } else {
                    console.log("Data Message: ", data)
               }
          } catch (err) {
               console.log(err)
          }
     }
     /**
      * add react to a response message
      * @param reaction 
      * @returns 
      */
     public async react(reaction: string) {
          if (!reaction) return console.log("Invalid Reaction!")
          try {
               const response = await fetch(`${Constants.API_BASE}/channels/${this.channel_id}/messages/${this.id}/reactions/${encodeURIComponent(reaction)}/@me`, {
                    method: "PUT",
                    headers: {
                         'Authorization': `Bot ${this.token}`,
                    }
               })
               if (!response.ok) {
                    console.log("ERR ", response.status)
               }
          } catch (err) {
               console.log(err)
          }
     }

}