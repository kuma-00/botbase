
import {
    type Commands,
    CommandType,
    type ContextMenuCommand,
    type SlashCommand,
    type SlashCommandSub,
    type SlashCommandSubGroup,
} from "@src/types/index.ts";

export const isSlashCommand = (
    command: Commands,
): command is SlashCommand => {
    return command.type === CommandType.Slash;
};

export const isContextMenuCommand = (
    command: Commands,
): command is ContextMenuCommand => {
    return command.type === CommandType.ContextMenu;
};

export const isSlashCommandSub = (
    command: Commands,
): command is SlashCommandSub => {
    return command.type === CommandType.SubCommand;
};

export const isSlashCommandSubGroup = (
    command: Commands,
): command is SlashCommandSubGroup => {
    return command.type === CommandType.SubCommandGroup;
};
