import { Constants } from '../constants';
import { MessageInfo, MessageEmbed, UserInfo, MessageSend, EmbedInfo, EmbedAuthor } from '../datatypes';
import Author from './author';
import Channel from './channel';
import Client from './client';
import Guild from './guild';

export default class Message implements MessageInfo {
     private token: string;
     id?: string;
     type?: number;
     content: string;
     channel_id?: string;
     author?: Author;
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
     channel: Channel;
     guilds: Guild;
     guild_id: string;
     messageSended: MessageInfo;
     constructor(token: string, data: MessageInfo) {
          this.token = token;
          this.id = data.id;
          this.type = data.type;
          this.author = new Author(token, data.author);
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
          this.client = new Client(token, this.messageSended)
          this.channel = new Channel(token, this.channel_id)
          this.guilds = new Guild(token, data.guild_id)
          this.guild_id = data.guild_id
     }
     
     public reply(data?: {content?: string, embeds?: EmbedInfo}) {
          try {
               fetch(`${Constants.API_BASE}/channels/${this.channel_id}/messages`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bot ${this.token}`
                    },
                    body: JSON.stringify({...data, message_reference: {message_id: this.id,
                         channel_id: this.channel_id}})
               }).then((res) => {
                    return res.json()
               }).then((data: MessageInfo) => {
                    return this.messageSended = data
               })
          } catch(err) {
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