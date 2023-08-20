# MONSCORDJS

This project is API Discord Handler, for making discord.js bot.
You can use this project for your bot development and feel free to contribute with us.

# Information

This is Discord.js Plus for making bots for senior developers, you can build it with Typescript and Javascript and Make it as your React.js Backend also as Client-Side.

---

# Discord Bot with Interaction and Message Management

This documentation explains the structure and usage of your Discord bot code that leverages interactions, message management, and more.

## Table of Contents

1. [Introduction](#introduction)
2. [Setup](#setup)
    - [Environment Variables](#environment-variables)
    - [Import Dependencies](#import-dependencies)
3. [Discord Bot Initialization](#discord-bot-initialization)
4. [Message Management](#message-management)
    - [Reactions Inquiry](#reactions-inquiry)
    - [Message Clear](#message-clear)
    - [Reply and Embed](#reply-and-embed)
5. [Interaction Handling](#interaction-handling)
6. [Client Function (FC)](#client-function-fc)
7. [Bot Connection](#bot-connection)
8. [Conclusion](#conclusion)

## Introduction

This bot utilizes the Discord API to interact with users, manage messages, handle interactions, and more. It includes features like message reactions inquiry, message clearing, sending replies with embeds, and responding to slash commands.

## Setup

### Environment Variables

To use this bot, make sure to provide your Discord bot token. Store it in a `.env` file as follows:

```plaintext
TOKEN=your_bot_token_here
```

### Import Dependencies

Import the required dependencies and initialize your Discord bot.

```javascript
import dotenv from "dotenv";
dotenv.config();
import Message from '../discordjs/Client/Message';
import Interactions from "../discordjs/Client/Interactions/interactions";
import Discord from "../discordjs";

const TOKEN = process.env.TOKEN;
const discord = new Discord(TOKEN);
```

## Discord Bot Initialization

Initialize the Discord bot by setting up event listeners and connecting to the WebSocket gateway.

```javascript
// Listen for Message_Create events
discord.listen("Message_Create", async (message) => {
    // ... message event handling ...
});

// Listen for Interaction_Create events
discord.listen("Interaction_Create", async (interaction) => {
    // ... interaction event handling ...
});

// Initialize presence and register slash command
discord.FC(async () => {
    // ... presence setup and slash command registration ...
});

// Connect to Discord WebSocket gateway
discord.connect((client) => {
    console.log(`${client.username} Online`);
});
```

## Message Management

### Reactions Inquiry

Inquire about reactions on messages:

```javascript
discord.listen("Message_Create", async (message) => {
    if (message.content === 'reactions') {
        // ... inquire about reactions ...
    }
});
```

### Message Clear

Clear messages with a command:

```javascript
discord.listen("Message_Create", async (message) => {
    if (message.content.startsWith("!clear")) {
        // ... clear messages ...
    }
});
```

### Reply and Embed

Reply to messages and send embeds:

```javascript
discord.listen("Message_Create", (message) => {
    if (message.content === "212") {
        // ... reply and send embed ...
    }
});
```

## Interaction Handling

Handle interactions from slash commands:

```javascript
discord.listen("Interaction_Create", async (interaction) => {
    if (interaction.data.name == "help") {
        // ... handle interaction response ...
    }
});
```

## Client Function (FC)

The `FC` function sets up the bot's presence and registers slash commands:

```javascript
discord.FC(async () => {
    // ... presence setup and slash command registration ...
});
```

## Bot Connection

Connect your bot to the Discord WebSocket gateway:

```javascript
discord.connect((client) => {
    console.log(`${client.username} Online`);
});
```

## Conclusion

This documentation provides an overview of your Discord bot's functionalities, including message management, interaction handling, and connection setup. Customize and extend this bot according to your project requirements.

---

```markdown
# Discord Bot Documentation

This repository contains a Discord bot built in TypeScript that interacts with the Discord API using the `ws` (WebSocket) library. The bot supports various functionalities such as sending messages, managing presence, handling events, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository to your local machine:
```
```bash
git clone https://github.com/your-username/your-discord-bot.git
```

2. Navigate to the project directory:

```bash
cd your-discord-bot
```

3. Install dependencies:

```bash
npm install
```

## Usage

1. Obtain a Discord bot token by creating a new bot on the [Discord Developer Portal](https://discord.com/developers/applications).

2. Rename the `config.example.ts` file in the project root to `config.ts` and fill in your bot token.

3. Customize the bot's functionality in the `Discord.ts` file. You can add more commands, event listeners, and interactions.

4. Start the bot:

```bash
npm start
```

## Features

- Sending messages to specific channels.
- Managing bot presence and activity.
- Listening to events like message creation and interactions.
- Editing and sending embed messages.

## Examples

### Sending a Message

```typescript
const discord = new Discord("YOUR_BOT_TOKEN");
discord.sendMessage("CHANNEL_ID", "Hello, Discord!");
```

### Managing Presence

```typescript
discord.presence("online", {
  activities: [{ name: "Coding", type: 0 }],
});
```

### Listening to Events

```typescript
discord.listen("Message_Create", (message) => {
  console.log("Received a new message:", message.content);
});
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Replace placeholders like `your-username`, `your-discord-bot`, `YOUR_BOT_TOKEN`, and `CHANNEL_ID` with appropriate values. Customize the examples, features, and usage instructions to match the functionalities of your bot.

Remember to add your own project-specific information, and make sure to provide clear and concise instructions for users to get started with your Discord bot.

```markdown
## Messages Class

The `Messages` class provides methods for interacting with messages within a Discord channel. This class allows you to retrieve messages from a specific channel, as well as fetch messages that were sent before a certain message ID.

### Installation

Make sure you have the required dependencies installed by following the installation instructions in the main README.

### Usage

1. Import the `Messages` class and instantiate it with your bot token and the channel ID you want to work with:

```

```typescript
import Messages from './path-to-Messages-class';
const messages = new Messages("YOUR_BOT_TOKEN", "CHANNEL_ID");
```

2. Fetch messages from the channel using the `get()` method:

```typescript
const allMessages = await messages.get();
console.log(allMessages);
```

3. Fetch messages sent before a specific message using the `before(id: string)` method:

```typescript
const messageId = "MESSAGE_ID_TO_START_FROM";
const messagesBefore = await messages.before(messageId);
console.log(messagesBefore);
```

### Example

```typescript
import { Constants } from "../constants";
import { MessageInfo } from "../@types/datatypes";

export default class Messages {
    // ... class code ...

    public async get() {
        // ... method code ...
    }

    public async before(id: string) {
        // ... method code ...
    }
}
```

Replace `YOUR_BOT_TOKEN`, `CHANNEL_ID`, and other placeholders with the appropriate values. Use the provided methods to interact with messages in the specified Discord channel.

Remember to adapt this documentation to your project's structure and to add any additional details or explanations that users might find helpful.


```markdown
## Message Class

The `Message` class represents a Discord message and provides methods for interacting with it. This class allows you to send replies, add reactions, and more.

### Installation

Make sure you have the required dependencies installed by following the installation instructions in the main README.

### Usage

1. Import the `Message` class and instantiate it with your bot token and a message data object:


```
```typescript
import Message from './path-to-Message-class';
const messageData = { /* Your message data object */ };
const message = new Message("YOUR_BOT_TOKEN", messageData);
```

2. Use the methods provided by the `Message` class to interact with the message:

```typescript
// Reply to the message
message.reply({ content: "Your reply content" });

// Add a reaction to the message
message.react("👍");
```

### Example

```typescript
import { Constants } from '../constants';
import { MessageInfo, EmbedInfo } from '../@types/datatypes';
import Author from './author';
import Channel from './channel';
import Client from './client';
import Guild from './guild';

export default class Message implements MessageInfo {
     // ... class code ...

     public reply(data?: { content?: string, embeds?: EmbedInfo }) {
          // ... method code ...
     }

     public async react(reaction: string) {
          // ... method code ...
     }
}
```

Replace `YOUR_BOT_TOKEN`, `path-to-Message-class`, and other placeholders with the appropriate values. Use the provided methods to interact with the Discord message.

```markdown
## Guild and Channels Classes

The `Guild` and `Channels` classes provide methods for interacting with Discord guilds and channels, allowing you to retrieve information about channels within a guild.

### Installation

Make sure you have the required dependencies installed by following the installation instructions in the main README.

### Usage

1. Import the `Guild` class and instantiate it with your bot token and the guild ID you want to work with:

```typescript
import Guild from './path-to-Guild-class';
const guild = new Guild("YOUR_BOT_TOKEN", "GUILD_ID");
```

2. Retrieve information about all channels within the guild using the `channels.all()` method:

```typescript
const allChannels = await guild.channels.all();
console.log(allChannels);
```

### Example

```typescript
import { Constants } from "../constants";

export default class Guild {
    // ... class code ...

    constructor(token: string, guild_id: string) {
        // ... constructor code ...
    }
}

class Channels {
    // ... class code ...

    constructor(token: string, guild_id: string) {
        // ... constructor code ...
    }

    public async all() {
        // ... method code ...
    }
}
```

Replace `YOUR_BOT_TOKEN`, `GUILD_ID`, and other placeholders with the appropriate values. Use the provided methods to interact with Discord guilds and channels.

```markdown
## Client Class

The `Client` class represents a Discord bot client and provides methods to retrieve client information, manage messages, and more.

### Installation

Make sure you have the required dependencies installed by following the installation instructions in the main README.

### Usage

1. Import the `Client` class and instantiate it with your bot token and the message info you want to associate with the client:

```typescript
import Client from './path-to-Client-class';
const client = new Client("YOUR_BOT_TOKEN", messageInfo);
```

2. Retrieve client data using the `getClientData()` method:

```

```typescript
await client.getClientData();
console.log(client.username, client.discriminator);
```

3. Delete a message associated with the client using the `deleteMessage()` method:

```typescript
client.deleteMessage();
```

### Example

```typescript
import { Constants } from "../constants";
import { MessageInfo, UserInfo } from "../datatypes";

export default class Client implements UserInfo {
    // ... class code ...

    constructor(token: string, sendInfos: MessageInfo) {
        // ... constructor code ...
    }

    public async getClientData() {
        // ... method code ...
    }

    public deleteMessage() {
        // ... method code ...
    }
}
```

Replace `YOUR_BOT_TOKEN`, `messageInfo`, and other placeholders with the appropriate values. Use the provided methods to interact with the Discord bot client.

### Client Information

The `Client` class retrieves and stores information about the Discord bot client. Here are the properties available after calling the `getClientData()` method:

- `username`: The username of the client.
- `discriminator`: The discriminator of the client.
- `bot`: Whether the client is a bot.
- `global_name`: The global name of the client.
- `id`: The unique ID of the client.
- `public_flags`: Public flags associated with the client.
- `avatar`: The client's avatar URL.
- `avatar_decoration`: The decoration on the client's avatar.

### Deleting Messages

The `deleteMessage()` method allows you to delete a message associated with the client. This can be useful for managing messages generated by the bot.

Apologies for any confusion earlier. Here's a corrected and detailed README section for the `Channel` class:

```markdown
## Channel Class

The `Channel` class represents a Discord channel and provides methods to interact with channel information and messages. It allows you to retrieve channel details, send messages, get messages, and perform bulk message deletion.

### Installation

Make sure you have the required dependencies installed by following the installation instructions in the main README.

### Usage

1. Import the `Channel` class and instantiate it with your bot token and optionally the channel ID:


```
```typescript
import Channel from './path-to-Channel-class';
const channel = new Channel("YOUR_BOT_TOKEN", "CHANNEL_ID");
```

2. Retrieve channel information using the `get()` method:

```typescript
const channelInfo = await channel.get();
console.log(channelInfo);
```

3. Send a message to the channel using the `send(data: MessageSend)` method:

```typescript
const messageData = { content: "Hello, Discord!" };
channel.send(messageData);
```

4. Get messages from the channel using the `getMessages()` method:

```typescript
const messages = await channel.getMessages();
console.log(messages);
```

5. Delete a specified number of messages using the `bulkDelete(length: number)` method:

```typescript
const numberOfMessagesToDelete = 5;
channel.bulkDelete(numberOfMessagesToDelete);
```

### Example

```typescript
import { Constants } from "../constants";
import { ChannelInfo, MessageSend } from "../@types/datatypes";
import Messages from "./Messages";

export default class Channel implements ChannelInfo {
    // ... class code ...

    constructor(token: string, channel_id: string = "") {
        // ... constructor code ...
    }

    public async get() {
        // ... method code ...
    }

    public async getMessages() {
        // ... method code ...
    }

    public send(data: MessageSend) {
        // ... method code ...
    }

    public async bulkDelete(length: number) {
        // ... method code ...
    }
}
```

Replace `YOUR_BOT_TOKEN`, `CHANNEL_ID`, and other placeholders with the appropriate values. Use the provided methods to interact with Discord channels and messages.



```markdown
## Interactions Class

The `Interactions` class handles interactions and responses related to Discord interactions. It provides methods to send responses to interactions and offers access to various interaction-related data.

### Installation

Make sure you have the required dependencies installed by following the installation instructions in the main README.

### Usage

1. Import the `Interactions` class and instantiate it with your bot token, interaction data, and the WebSocket instance used for communication:


```
```typescript
import Interactions from './path-to-Interactions-class';
const interactions = new Interactions("YOUR_BOT_TOKEN", interactionData, webSocketInstance);
```

2. Send a response to an interaction using the `send(data: InteractionResponse)` method:

```typescript
const response = { type: 4, data: { content: "Interaction response!" } };
interactions.send(response);
```

### Example

```typescript
import { Constants } from "../../constants";
import { InteractionInfo, InteractionResponse } from "../../@types/datatypes";
import Channel from "../channel";
import WebSocket from 'ws';
import Guild from "../guild";

export default class Interactions implements InteractionInfo {
    // ... class code ...

    constructor(token: string, data: InteractionInfo, webSocket: WebSocket) {
        // ... constructor code ...
    }

    public send(data: InteractionResponse) {
        // ... method code ...
    }
}
```

Replace `YOUR_BOT_TOKEN`, `interactionData`, `webSocketInstance`, and other placeholders with the appropriate values. Use the provided methods to interact with Discord interactions.

### Interaction Responses

The `Interactions` class allows you to send interaction responses using the `send(data: InteractionResponse)` method. The `data` parameter should be an object with a `type` property representing the response type (e.g., 4 for "Channel Message with Source"), and a `data` property containing response content or data.

### WebSocket Instance

The `webSocket` parameter in the `Interactions` constructor is expected to be a WebSocket instance that facilitates communication with the Discord Gateway for interactions.

## Type Definitions

### `MessageEmbed`

Represents the structure of a message embed, which can be used to enhance the appearance of a message. It can contain fields like title, description, URL, timestamp, and more.

### `MemberInfo`

Contains information about a member in a guild. This includes user-related data, roles, permissions, and other attributes.

### `InteractionData`

Describes the interaction data received when an interaction (e.g., slash command) occurs. It includes the type, name, ID, and potential options.

### `InteractionInfo`

Provides comprehensive information about an interaction. It encompasses details about the interaction, the member involved, the channel, the guild, and the data associated with the interaction.

### `MessageReference`

Defines a reference to another message, which can be useful when replying to a specific message.

### `UserInfo`

Contains essential information about a user, including their username, ID, discriminator, avatar, and bot status.

### `MessageInfo`

Represents a message's data, including its ID, content, author, timestamp, embeds, and other attributes.

### `ChannelType`

Enumerates different types of channels that can exist within a Discord server, such as text, voice, and more.

### `ChannelInfo`

Holds information about a channel, including its type, name, parent ID, permissions, and other characteristics.

### `Role`

Contains details about a role in a Discord server, including its name, permissions, color, and other attributes.

### `Emoji`

Describes an emoji within Discord, including its ID, name, roles, and other properties.

### `Sticker`

Provides information about a sticker, including its ID, name, description, and other attributes.

### `GuildInfo`

Includes extensive details about a guild (server), such as its name, icon, owner, roles, emojis, and more.

### `Intents`

Enumerates different intents that can be subscribed to in order to receive specific events from Discord, such as message events, member events, and more.

### `EmbedTypes`

Enumerates various types of embeds that can be used in a message, such as rich, image, video, and more.

### `EmbedThumbnail`

Describes the thumbnail of an embed, including its URL and dimensions.

### `EmbedAuthor`

Provides details about the author of an embed, including their name, URL, and icon.

### `EmbedInfo`

Defines the structure of an embed that can be included in a message. It encompasses fields like title, description, timestamp, and more.

### `StatusType`

Enumerates different statuses a user can have, such as idle, offline, online, and do not disturb.

### `PresenceInfo`

Contains information about a user's presence, including their activities and status.

### `ListenEvents`

Enumerates the events that your bot can listen to, such as message creation, voice updates, channel updates, and more.

### `ActivityType`

Enumerates different types of activities a user can have, such as playing a game, streaming, listening, and more.

### `InteractionTypeResponse`

Enumerates different types of interaction responses that can be sent back to Discord when handling interactions.

### `MessageSend`

Describes the structure of a message that can be sent. It includes fields like text-to-speech (TTS), content, embeds, and more.

### `InteractionResponse`

Specifies the structure of a response to an interaction. It includes the type of response and the message data to be sent.

### `ApplicationsTypes`

Enumerates different types of application registration, whether it's a global application or guild-specific.

### `OptionsType`

Enumerates different types of options that can be used in slash command registrations, such as sub-commands, strings, integers, and more.

### `RegisterApplicationInfo`

Defines the structure of information required to register a slash command application. It includes the command name, description, options, and more.
