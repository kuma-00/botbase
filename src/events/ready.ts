import { requireEnv } from "@cross/env";
import type { Event } from "@src/types/index.ts";
import { isContextMenuCommand, isSlashCommand } from "@src/util/commands.ts";
import { ActivityType } from "discord.js";

export const event: Event = {
    id: "ready",
    once: true,
    async execute(client): Promise<void> {
        const commands = Array.from(client.commands.values());
        (await client.guilds.fetch(requireEnv("GUILD_ID"))).commands.set(
            commands
                .filter((com) =>
                    isSlashCommand(com) || isContextMenuCommand(com)
                )
                .map((com) => com.builder.toJSON()),
        );
        console.log(`${client.user?.username} is ready !`);
    },
};
