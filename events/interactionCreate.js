const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      const { commands } = interaction.client;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isStringSelectMenu()) {
      const { client, customId } = interaction;
      const { selectMenus } = client;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("There is no code for this select menu");

      try {
        await menu.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
