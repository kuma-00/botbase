import { type CommandInteraction, EmbedBuilder } from "discord.js";

/**
 * エラー発生時にエラーメッセージをEmbed形式でfollowUpMessageとして送信します。
 *
 * @param error - 発生したエラーオブジェクト
 * @param text - エラーに関する追加情報や説明
 * @param interaction - エラーを報告するための `CommandInteraction` オブジェクト
 *
 * @example
 * ```typescript
 * try {
 *     // コマンドの処理
 * } catch (error) {
 *     await followUpError(error, "コマンドの実行中に問題が発生しました。", interaction);
 * }
 * ```
 */
export const followUpError = (
    error: Error,
    text: string,
    interaction: CommandInteraction,
) => {
    console.log(error, error?.message);
    const embed = new EmbedBuilder();
    embed
        .setAuthor({ name: "Error" })
        .setTitle("エラーが発生しました。")
        .setDescription(
            `${error}
${error?.message}
${text}`,
        )
        .setTimestamp(Date.now())
        .setColor([255, 0, 0]);
    interaction.followUp({ embeds: [embed] });
};
