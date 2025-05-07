import type { Event } from "@src/types/index.ts";
import { followUpError, isSlashCommand } from "@src/util/index.ts";
import { type Interaction, InteractionType } from "discord.js";
export const event: Event = {
    id: "interactionCreate",
    once: false,
    async execute(client, interaction: Interaction) {
        const isDeveloping = false;
        if (
            interaction.type === InteractionType.ApplicationCommand ||
            interaction.isContextMenuCommand()
        ) {
            await interaction.deferReply().catch(console.error);
            const command = client.commands.get(
                interaction.commandName.toLowerCase(),
            );
            if (!command) {
                (await interaction.followUp({
                    content: "このコマンドは存在しません",
                })) &&
                    client.commands.delete(
                        interaction.commandName.toLowerCase(),
                    );
                return;
            }
            if (
                isDeveloping &&
                interaction.user.id !==
                    (await client.application?.fetch())?.owner?.id
            ) {
                interaction.followUp({
                    content:
                        "現在開発中です。開発者のみコマンドを受け付けています。",
                    ephemeral: true,
                });
                return;
            }
            try {
                command.execute(client, interaction);
            } catch (e) {
                followUpError(e as Error, "", interaction);
            }
        } else if (
            interaction.type === InteractionType.ApplicationCommandAutocomplete
        ) {
            const command = client.commands.get(
                interaction.commandName.toLowerCase(),
            );
            if (!command) {
                interaction.respond([{ value: "none", name: "none" }]);
            } else {
                if (isSlashCommand(command) && command?.autocomplete) {
                    try {
                        command.autocomplete(client, interaction);
                    } catch (e) {
                        console.log("Autocomplete Error \n", e);
                    }
                }
            }
        }
    },
};
