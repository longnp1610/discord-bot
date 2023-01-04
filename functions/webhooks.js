/**
 * Return the webhooks that bot can use in the channel, if unavailable will create a new one
 *
 * @param {CommandInteraction} interaction
 */

module.exports = async (interaction) => {
  const { guild, channel } = interaction;
  const webHooks = await channel.fetchWebhooks();
  let webHook = webHooks.find((wh) => wh.token);

  // Singleton webhook
  if (!webHook) {
    return await channel.createWebhook({
      name: `MeowMoew#${interaction.user.discriminator}`,
      avatar: guild.members.cache
        .get(interaction.applicationId)
        .displayAvatarURL(),
    });
  }
  return webHook;
};
