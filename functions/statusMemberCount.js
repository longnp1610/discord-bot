/**
 * Show the count of the status of the members in the namespace
 * @param guild discord's server
 * @param channel The channel used to display the status of the members
 */

module.exports.execute = async (guild, channel) => {
  const statusMemberCount = async () => {
    channel.setName(
      `🟢 ${guild.presences.cache.filter((m) => m.status == "online").size}
      ⛔ ${guild.presences.cache.filter((m) => m.status == "dnd").size}
      🌙 ${guild.presences.cache.filter((m) => m.status == "idle").size}`
    );
  };
  statusMemberCount();
  setInterval(statusMemberCount, 60000);
};
