const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("noixau")
    .setDescription("Nói xấu người bạn muốn")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Người bạn muốn nói")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("string").setDescription("Lời muốn nói").setRequired(true)
    ),
  async execute(interaction) {
    const { options, channel } = interaction;
    const user = options.getUser("user");
    const str = options.getString("string");

    await interaction.reply({
      content: "Done",
      ephemeral: true,
    });

    await channel.send({ content: `${user} ${str}` });
    await interaction.deleteReply();
  },
};
