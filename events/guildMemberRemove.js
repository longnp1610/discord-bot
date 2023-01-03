const { Events } = require("discord.js");
const { serverStats } = require("../functions");

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(interaction) {
    // const client = interaction.client;
    const guild = interaction.guild;

    const findChannelByIncludeName = async (guild, name) => {
      return await guild.channels.cache.find((channel) =>
        channel.name.includes(name)
      );
    };

    const channel1 = await findChannelByIncludeName(guild, "🌏");
    const channel2 = await findChannelByIncludeName(guild, "👀");
    const channel3 = await findChannelByIncludeName(guild, "🤖");
    serverStats.execute(guild, channel1, channel2, channel3);
  },
};
