const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servercount")
    .setDescription("Information of the shard"),
  async execute(interaction) {
    await interaction.client.shard
      .fetchClientValues("guilds.cache.size")
      .then((results) => {
        return interaction.reply({
          content: `Server count: ${results.reduce(
            (acc, guildCount) => acc + guildCount,
            0
          )}`,
          ephemeral: true,
        });
      })
      .catch(console.error);
  },
};
