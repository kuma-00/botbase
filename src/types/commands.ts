import type { ExtendedClient } from "@src/types/index.ts";
import type {
    AutocompleteInteraction,
    CommandInteraction,
    ContextMenuCommandBuilder,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
} from "discord.js";

export enum CommandType {
    Slash = 1,
    SubCommand = 2,
    SubCommandGroup = 3,
    ContextMenu = 4,
}

export enum CommandCategory {
    Util = 1,
    Other = 2,
}

export interface BaseCommand {
    category: CommandCategory;
    show?: boolean;
    execute(
        client: ExtendedClient,
        interaction: CommandInteraction,
    ): unknown;
    id: string;
}

export interface SlashCommand extends BaseCommand {
    type: CommandType.Slash;
    builder: SlashCommandBuilder;
    autocomplete?(
        client: ExtendedClient,
        interaction: AutocompleteInteraction,
    ): unknown;
}

export interface SlashCommandSub extends BaseCommand {
    type: CommandType.SubCommand;
    builder(sub: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder;
}

export interface SlashCommandSubGroup extends BaseCommand {
    type: CommandType.SubCommandGroup;
    builder(
        sub: SlashCommandSubcommandGroupBuilder,
    ): SlashCommandSubcommandGroupBuilder;
}

export interface ContextMenuCommand extends BaseCommand {
    type: CommandType.ContextMenu;
    builder: ContextMenuCommandBuilder;
}

export type Commands =
    | SlashCommand
    | SlashCommandSub
    | SlashCommandSubGroup
    | ContextMenuCommand;

export type SlashCommands =
    | SlashCommand
    | SlashCommandSub
    | SlashCommandSubGroup;
