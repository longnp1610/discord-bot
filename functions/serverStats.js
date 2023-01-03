/**
 * Show the stat of the server in the channel namespace
 * @param guild discord's server
 * @param channel1 The channel used to display total members
 * @param channel2 The channel used to display normal members
 * @param channel3 The channel used to display bot
 */

module.exports.execute = async (guild, channel1, channel2, channel3) => {
  const members = await guild.members?.fetch();
  channel1.setName(`🌏 Total Members: ${guild.memberCount}`);
  channel2.setName(`👀 Human: ${members.filter((m) => !m.user.bot).size}`);
  channel3.setName(`🤖 Bot: ${members.filter((m) => m.user.bot).size}`);
};
