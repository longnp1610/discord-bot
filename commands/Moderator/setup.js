const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { serverStats, statusMemberCount } = require("../../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup channel")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stats")
        .setDescription("Setup stats to display on channels")
        .addChannelOption((option) =>
          option
            .setName("channel1")
            .setDescription("Channel for status count")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("channel2")
            .setDescription("Channel for total member count")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("channel3")
            .setDescription("Channel for user count")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("channel4")
            .setDescription("Channel for bot count")
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
  async execute(interaction) {
    const channel1 = interaction.options.getChannel("channel1");
    const channel2 = interaction.options.getChannel("channel2");
    const channel3 = interaction.options.getChannel("channel3");
    const channel4 = interaction.options.getChannel("channel4");

    // const client = interaction.client;
    const guild = interaction.guild;

    statusMemberCount.execute(guild, channel1);
    serverStats.execute(guild, channel2, channel3, channel4);
    await interaction.reply({ content: "Pong!", ephemeral: true });
  },
};
