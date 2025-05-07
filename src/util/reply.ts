import {
    type GuildMember,
    Message,
    type MessageReplyOptions,
    type User,
} from "discord.js";

/**
 * 指定されたメッセージ、ユーザー、またはギルドメンバーに対して返信を送信します。
 *
 * @param message - 返信先となる `Message`、`User`、または `GuildMember` オブジェクト
 * @param options - 返信内容を表す文字列または `MessageReplyOptions` オブジェクト
 * @returns 返信が送信された場合の `Promise`
 *
 * @example
 * ```typescript
 * // メッセージに返信
 * await reply(message, "こんにちは！");
 *
 * // ユーザーに返信
 * await reply(user, { content: "こんにちは！", ephemeral: true });
 * ```
 */
export const reply = (
    message: Message | User | GuildMember,
    options: string | MessageReplyOptions,
) => {
    const resolvedOptions = (options instanceof Object)
        ? options
        : { content: options };
    if (message instanceof Message) {
        return message.reply({
            ...resolvedOptions,
            allowedMentions: { repliedUser: false },
        });
    }
    return message.send({
        ...resolvedOptions,
        allowedMentions: { repliedUser: false },
    });
};
