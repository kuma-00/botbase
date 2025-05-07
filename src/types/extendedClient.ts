import type { Commands, MessageResponse } from "@src/types/index.ts";
import type { Client, Collection } from "discord.js";

export type ExtendedClient = Client & {
    commands: Collection<string, Commands>;
    messageResponses: MessageResponse[];
};
