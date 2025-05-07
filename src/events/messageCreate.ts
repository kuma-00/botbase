import type { Event } from "@src/types/index.ts";
import type { Message } from "discord.js";

export const event: Event = {
    id: "messageCreate",
    once: false,
    async execute(client, message: Message) {
        if (message.author.id === client.user?.id) return;
        for (
            const mr of client.messageResponses.filter((mr) =>
                mr.filter(message)
            )
        ) {
            mr.execute(client, message);
        }
    },
};
