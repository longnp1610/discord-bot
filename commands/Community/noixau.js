const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("noixau")
    .setDescription("Nói xấu người mình muốn")
    .addUserOption((option) =>
      option.setName("user").setDescription("Người bạn muốn nói xấu")
    )
    .addStringOption((option) =>
      option.setName("string").setDescription("Lời nói xấu =)))")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const str = interaction.options.getString("string");
    await interaction.reply({ content: `${user} ${str}` });
  },
};
