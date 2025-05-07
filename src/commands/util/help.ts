import {
    CommandCategory,
    CommandType,
    type SlashCommand,
    type SlashCommands,
} from "@src/types/index.ts";
import { isContextMenuCommand } from "@src/util/index.ts";
import {
    EmbedBuilder,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
} from "discord.js";

export const command: SlashCommand = {
    type: CommandType.Slash,
    id: "help",
    category: CommandCategory.Util,
    builder: new SlashCommandBuilder()
        .setName("help")
        .setDescription("helpを表示します"),
    async execute(client, interaction) {
        const cmd: {
            [key: string]: (SlashCommands)[];
        } = {};
        for (
            const key of [...client.commands.values()].filter(
                (command): command is SlashCommands =>
                    command.show !== false || (!isContextMenuCommand(command)),
            )
        ) {
            if (!cmd[key.category]) {
                cmd[key.category] = [];
            }
            cmd[key.category]?.push(key);
        }
        const helpEmbed = new EmbedBuilder()
            .setTitle("コマンド一覧")
            .setTimestamp(Date.now())
            .setFooter({
                text: client.user?.username ?? "",
                iconURL: client.user?.displayAvatarURL(),
            });
        for (const key in cmd) {
            if (!cmd[key]) continue;
            helpEmbed.addFields([
                {
                    name: `**${cmd[key].length} · ${key}**`,
                    value: cmd[key]
                        .map((v) => {
                            const builder = v.builder;
                            const description = (() => {
                                if (
                                    builder instanceof
                                        SlashCommandSubcommandBuilder
                                ) {
                                    return builder.description;
                                }
                                if (
                                    builder instanceof
                                        SlashCommandSubcommandGroupBuilder
                                ) {
                                    return builder.description;
                                }
                            })();
                            return `\`${v.id}\` : ${description}`;
                        })
                        .join("\n"),
                },
            ]);
        }
        helpEmbed.setDescription("説明");
        interaction.followUp({ embeds: [helpEmbed] });
    },
};
