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
    id: "parroting",
    category: CommandCategory.Util,
    builder: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.Message)
        .setName("parroting"),
    async execute(_client, interaction: ContextMenuCommandInteraction) {
        const msg = interaction.options.get("message", true).message;
        const channel = interaction.channel;
        if (!channel || !msg) return;
        await interaction.followUp(`\`\`\`${msg.cleanContent}\`\`\``);
    },
};
