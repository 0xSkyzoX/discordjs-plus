"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Author {
    constructor(token, author) {
        this.token = token;
        this.username = author.username;
        this.avatar = author.avatar;
        this.discriminator = author.discriminator;
        this.bot = author.bot;
        this.public_flags = author.public_flags;
        this.id = author.id;
        this.global_name = author.global_name;
        this.avatar_decoration = author.avatar_decoration;
    }
    avatarURL() {
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.webp?size=96`;
    }
}
exports.default = Author;
//# sourceMappingURL=author.js.map