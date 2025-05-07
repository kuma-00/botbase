import {
  CommandCategory,
  CommandType,
  type SlashCommand,
} from "@src/types/index.ts";
import { SlashCommandBuilder } from "discord.js";

export const command: SlashCommand = {
  type: CommandType.Slash,
  id: "ping",
  category: CommandCategory.Util,
  builder: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong! と返事をします"),
  execute(client, interaction) {
    return interaction.followUp(`Pong ! **${client.ws.ping}ms**`);
  },
};
