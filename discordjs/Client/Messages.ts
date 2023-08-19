import { Constants } from "../constants";
import { MessageInfo } from "../datatypes";

export default class Messages {
    private token: string;
    private channel_id: string;

    constructor(token: string, channel_id: string) {
        this.token = token
        this.channel_id = channel_id
    }

    public async get() {
        try {
            const response = await fetch(`${Constants.API_BASE}/channels/${this.channel_id}/messages`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bot '+this.token
                }
            })
            const data: MessageInfo[] = await response.json()
            if (response.ok) {
                return data
            }
        } catch(err) {
            console.log(err)
        }
    }
    public async before() {

    }
}