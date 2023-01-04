const webhooks = require("../../functions/webhooks");

module.exports = {
  // prettier-ignore
  data: {name: "emoji-menu",},
  async execute(interaction, client) {
    const { channel, guild } = interaction;

    // Get the user's guild avatar not the main one
    const userAvatar = interaction.user.displayAvatarURL();
    const userName = interaction.member.displayName;

    await interaction.update({
      content: "Done",
      embeds: [],
      components: [],
      ephemeral: true,
    });

    const webHook = await webhooks(interaction);

    await webHook.send({
      content: interaction.values[0],
      username: userName,
      avatarURL: userAvatar,
    });

    await interaction.deleteReply();
  },
};
