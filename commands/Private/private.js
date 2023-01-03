const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("private")
    .setDescription("This is the private command"),
  async execute(interaction) {
    await interaction.reply({ content: "Netflix & Chill !!", ephemeral: true });
  },
};
