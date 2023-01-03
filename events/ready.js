const { Events, ActivityType } = require("discord.js");
const { serverStats, statusMemberCount } = require("../functions");
const chalk = require("chalk");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    Logger(
      chalk.cyan("Logged in as ") +
        chalk.hex("#DEADED").bold(`${client.user.tag}`)
    );
    client.user.setPresence({
      status: "online",
      activities: [{ name: "/ping", type: ActivityType.Watching }],
    });

    const findChannelByIncludeName = async (guild, name) => {
      return await guild.channels.cache.find((channel) =>
        channel.name.includes(name)
      );
    };

    // Get all emojis available
    client.emojis.cache
      .filter((emoji) => emoji.available)
      .map((emoji) => client.emojisFromAllServers.push(emoji));

    // for (const guild of client.guilds.cache) {
    //   const channel1 = await findChannelByIncludeName(guild[1], "🟢");
    //   const channel2 = await findChannelByIncludeName(guild[1], "🌏");
    //   const channel3 = await findChannelByIncludeName(guild[1], "👀");
    //   const channel4 = await findChannelByIncludeName(guild[1], "🤖");
    //   if (channel1 && channel2 && channel3 && channel4) {
    //     statusMemberCount.execute(guild[1], channel1);
    //     serverStats.execute(guild[1], channel2, channel3, channel4);
    //   }
    // }

    // Clear commands list to prevent duplicate commands
    // client.application.commands.set([]);
    // guild.commands.set([]);
  },
};
