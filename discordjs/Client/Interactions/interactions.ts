import { Constants } from "../../constants";
import { ChannelInfo, InteractionData, InteractionInfo, InteractionResponse, MemberInfo } from "../../datatypes";
import Channel from "../channel";
import WebSocket from 'ws';
import Guild from "../guild";

export default class Interactions implements InteractionInfo {
     private _authtoken: string;
     id: string;
     channel_id: string;
     guild: { locale: string; id: string; features: string[]; };
     version: number;
     type: number;
     member: MemberInfo;
     data: InteractionData;
     app_permissions: string;
     application_id: string;
     entitlement_sku_ids: string[];
     entitlements: string[];
     guild_locale: string;
     token: string;
     locale: string;
     channel: Channel;
     guilds: Guild
     private webSocket: WebSocket
     constructor(token: string, data: InteractionInfo, webSocket: WebSocket) {
          this._authtoken = token;
          this.id = data.id
          this.channel_id = data.channel_id
          this.guild = data.guild
          this.version = data.version
          this.type = data.type
          this.member = data.member
          this.data = data.data
          this.app_permissions = data.app_permissions
          this.application_id = data.application_id
          this.entitlement_sku_ids = data.entitlement_sku_ids
          this.entitlements = data.entitlements
          this.guild_locale = this.guild_locale
          this.token = data.token
          this.locale = data.locale
          this.channel = new Channel(token, this.channel_id)
          this.webSocket = webSocket;
          this.guilds = new Guild(token, data.guild.id)
     }
     public send(data: InteractionResponse) {
          if (!data) return console.log("invalid data")
          try {
               console.log("id: ", this.id)
               console.log("token: ", this.token)
               fetch(`${Constants.API_BASE}/interactions/${this.id}/${this.token}/callback`, {
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