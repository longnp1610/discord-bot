module.exports = {
  data: {
    name: "emoji-menu",
  },
  async execute(interaction, client) {
    const { channel } = interaction;

    await interaction.update({
      content: "Done",
      embeds: [],
      components: [],
      ephemeral: true,
    });

    await interaction.deleteReply();

    await channel.send(interaction.values[0]);
  },
};
