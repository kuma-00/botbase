import { requireEnv } from "@cross/env";
import type {
    ContextMenuCommand,
    Event,
    ExtendedClient,
    MessageResponse,
    SlashCommand,
    SlashCommandSub,
    SlashCommandSubGroup,
} from "@src/types/index.ts";
import { loadTsFiles } from "@src/util/index.ts";
import { fileURLToPath } from "bun";
import {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    Partials,
} from "discord.js";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
}) as ExtendedClient;

client.commands = new Collection();
client.messageResponses = [];

// Event Load
await loadTsFiles(join(__dirname, "events"), (event) => {
    const e = (event as { event: Event }).event;
    if (e?.id) {
        if (e.once) {
            client.once(e.id, (...args) => e.execute(client, ...args));
        } else {
            client.on(e.id, (...args) => e.execute(client, ...args));
        }
        console.log(
            `${"Event".padEnd(20, " ")}${e.id.padEnd(20, " ")} loaded!`,
        );
    }
});

// SlashCommand Load
await loadTsFiles(join(__dirname, "commands"), (command) => {
    const com = (command as {
        command: SlashCommand | SlashCommandSub | SlashCommandSubGroup;
    }).command;
    if (com.id) {
        client.commands.set(com.id.toLowerCase(), com);
        console.log(
            `${"SlashCommand".padEnd(20, " ")}${
                com.id.padEnd(20, " ")
            } loaded!`,
        );
    }
});

// ContextMenu Load
await loadTsFiles(join(__dirname, "contextMenus"), (contextMenu) => {
    const com = (contextMenu as { command: ContextMenuCommand }).command;
    if (com.id) {
        client.commands.set(com.id.trim().toLowerCase(), com);
        console.log(
            `${"ContextMenuCommand".padEnd(20, " ")}${
                com.id.padEnd(20, " ")
            } loaded!`,
        );
    }
});
//messageCreate Load
await loadTsFiles(join(__dirname, "messageResponse"), (messageResponse) => {
    const mr = (messageResponse as { messageResponse: MessageResponse })
        .messageResponse;
    if (mr.id) {
        client.messageResponses.push(mr);
        console.log(
            `${"MessageResponse".padEnd(20, " ")}${
                mr.id.padEnd(20, " ")
            } loaded!`,
        );
    }
});

// login with the token from .env
await client.login(requireEnv("DISCORD_TOKEN"));

client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
client.on(
    Events.ShardError,
    (error) =>
        console.error("A websocket connection encountered an error:", error),
);
