import {
    CommandCategory,
    CommandType,
    type ContextMenuCommand,
} from "@src/types/index.ts";
import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    type ContextMenuCommandInteraction,
} from "discord.js";

export const command: ContextMenuCommand = {
    type: CommandType.ContextMenu,
    id: "notnickname",
    category: CommandCategory.Util,
    builder: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.User)
        .setName("notnickname"),
    async execute(_client, interaction: ContextMenuCommandInteraction) {
        const msg = interaction.options.get("user", true).user;
        const channel = interaction.channel;
        if (!channel || !msg) return;
        await interaction.followUp(`\`\`\`${msg.globalName}\`\`\``);
    },
};
