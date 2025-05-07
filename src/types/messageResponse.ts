import type { ExtendedClient } from "@src/types/index.ts";
import type { Message } from "discord.js";

export type MessageResponse = {
    id: string;
    filter(message: Message): boolean;
    execute(client: ExtendedClient, message: Message): unknown;
};
