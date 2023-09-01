export type MessageEmbed = {
    title?: string;
    type?: "rich" | "image" | "video" | "gifv" | "article" | "link";
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
};

export type MemberInfo = {
    user: UserInfo;
    unusual_dm_activity_util: any;
    roles: string[];
    premium_since: any;
    permissions: string;
    pending: boolean;
    nick: any;
    mute: boolean;
    joined_at: string;
    flags: number;
    deaf: boolean;
    communication_disabled_until: any;
    avatar: string;
}

export type InteractionData = {
    type: number;
    name: string;
    id: string;
    options?: string[]
}

export type InteractionInfo = {
    version: number;
    type: number;
    token: string;
    member: MemberInfo;
    locale: string;
    id: string;
    guild_locale: string;
    guild: { locale: string, id: string, features: string[] };
    entitlements: string[];
    entitlement_sku_ids: string[];
    data: InteractionData;
    channel_id: string;
    channel: ChannelInfo;
    application_id: string;
    app_permissions: string;
}

export type MessageReference = {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
    fail_if_not_exists?: boolean;
};

export type UserInfo = {
    username: string;
    public_flags: number;
    id: string;
    global_name: string;
    discriminator: string;
    bot: boolean;
    avatar_decoration: string;
    avatar: string;
};

export type MessageInfo = {
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
    guild_id: string;
};

export enum ChannelType {
    GUILD_TEXT = 0, // a text channel within a server
    DM = 1, // a direct message between users
    GUILD_VOICE = 2, // a voice channel within a server
    GROUP_DM = 3, // a direct message between multiple users
    GUILD_CATEGORY = 4,	// an organizational category that contains up to 50 channels
    GUILD_ANNOUNCEMENT = 5, // a channel that users can follow and crosspost into their own server (formerly news channels)
    ANNOUNCEMENT_THREAD = 10, //a temporary sub-channel within a GUILD_ANNOUNCEMENT channel
    PUBLIC_THREAD = 11, // a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
    PRIVATE_THREAD = 12, // a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
    GUILD_STAGE_VOICE = 13, // a voice channel for hosting events with an audience
    GUILD_DIRECTORY = 14, // the channel in a hub containing the listed servers
    GUILD_FORUM = 15, // Channel that can only contain threads
}

export type ChannelInfo = {
    id: string;
    type: ChannelType;
    last_message_id: string;
    flags: number;
    guild_id: string;
    name: string;
    parent_id: string;
    rate_limit_per_user: string;
    topic?: string;
    position: number;
    permission_overwrites: any[]; // FIXME: Implement an actual type
    nsfw: boolean;
};

export type Role = {
    id: string;
    name: string;
    description: string | null;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    tags: {
         bot_id: string;
    };
    flags: number;
};

export type Emoji = {
    id: string;
    name: string;
    roles: string[];
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
};

export type Sticker = {
    id: string;
    name: string;
    tags: string;
    type: number;
    format_type: number;
    description: string;
    asset: string;
    available: boolean;
    guild_id: string;
};

export type GuildInfo = {
    id: string;
    name: string;
    icon: string;
    description: string;
    home_header: null;
    splash: string;
    discovery_splash: string;
    features: string[];
    banner: string;
    owner_id: string;
    application_id: null;
    region: string;
    afk_channel_id: string;
    afk_timeout: number;
    system_channel_id: string;
    system_channel_flags: number;
    widget_enabled: boolean;
    widget_channel_id: string;
    verification_level: number;
    roles: Role[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences: null;
    max_members: number;
    max_stage_video_channel_users: number;
    max_video_channel_users: number;
    vanity_url_code: string;
    premium_tier: number;
    premium_subscription_count: number;
    preferred_locale: string;
    rules_channel_id: string;
    safety_alerts_channel_id: string;
    public_updates_channel_id: string;
    hub_type: null;
    premium_progress_bar_enabled: boolean;
    latest_onboarding_question_id: null;
    nsfw: boolean;
    nsfw_level: number;
    emojis: Emoji[];
    stickers: Sticker[];
    incidents_data: null;
    embed_enabled: boolean;
    embed_channel_id: string;
};

export enum Intents {
    GUILDS = 1 << 0,
    GUILD_MEMBERS = 1 << 1,
    GUILD_MODERATION = 1 << 2,
    GUILD_EMOJIS_AND_STICKERS = 1 << 3,
    GUILD_INTEGRATIONS = 1 << 4,
    GUILD_WEBHOOKS = 1 << 5,
    GUILD_INVITES = 1 << 6,
    GUILD_VOICE_STATES = 1 << 7,
    GUILD_PRESENCES = 1 << 8,
    GUILD_MESSAGES = 1 << 9,
    GUILD_MESSAGE_REACTIONS = 1 << 10,
    GUILD_MESSAGE_TYPING = 1 << 11,
    DIRECT_MESSAGES = 1 << 12,
    DIRECT_MESSAGE_REACTIONS = 1 << 13,
    DIRECT_MESSAGE_TYPING = 1 << 14,
    MESSAGE_CONTENT = 1 << 15,
    GUILD_SCHEDULED_EVENTS = 1 << 16,
    AUTO_MODERATION_CONFIGURATION = 1 << 20,
    AUTO_MODERATION_EXECUTION = 1 << 21
}

export type EmbedTypes = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

export type EmbedThumbnail = {
    url: string;
    proxy_url?: string;
    height?: string;
    width?: string;
}

export type EmbedAuthor = {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export type EmbedInfo = {
    title?: string;
    type?: EmbedTypes;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    thumbnail?: EmbedThumbnail;
    author?: EmbedAuthor;
}
export type StatusType = "idle" | "offline" | "online" | "dnd"

export type PresenceInfo = {
    activities: [{ name: string, type: ActivityType }],
    status: StatusType
}

export type ListenEvents = "MessageCreate" | "MessageRemove" | "MessageUpdate" | "VoiceUpdate" | "VoiceDelete" | "Channel_reate" | "ChannelRemove" | "ChannelUpdate" | "InteractionCreate"

export enum ActivityType {
    Game = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
}

export interface Activities {
    activities: [{ name: string, type: ActivityType }]
}
export enum InteractionTypeResponse {
    PONG=1,
    CHANNEL_MESSAGE_WITH_SOURCE=4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE=5,
    DEFERRED_UPDATE_MESSAGE=6,
    UPDATE_MESSAGE=7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT=8,
    MODAL=9
}

export interface MessageSend  {
    tts?: boolean;
    content?: string;
    embeds?: EmbedInfo[];
    flags?: number;
    allowed_mentions?: {
         replied_user: boolean;
    }
}

export type InteractionResponse = {
    type: InteractionTypeResponse,
    data: MessageSend
}

export type ApplicationsTypes = "GLOBAL" | "GUILD"

export enum OptionsType {
    SUB_COMMAND=1,
    SUB_COMMAND_GROUP=2,
    STRING=3,
    INTEGER=4,
    BOOLEAN=5,
    USER=6,
    CHANNEL=7,
    ROLE=8,
    MENTIONABLE= 9,
    NUMBER=10,
    ATTACHMENT= 11
}
export type RegisterApplicationInfo = {
    name: string;
    description?: string;
    name_localizations?: string;
    description_localizations?: string;
    options?: [{
         name: string, 
         description?: string,
         type: OptionsType,
         required?: boolean,
         choices?: [{name: string, value: string,
              name_localizations?: string
         }],
         options?: [{
              name: string;
              description?: string;
              type: OptionsType,
              required?: boolean 
         }]
         channel_types?: ChannelType
    }]
}