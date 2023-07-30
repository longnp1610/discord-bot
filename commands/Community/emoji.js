const {
  ActionRowBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

const paginationEmoji = require("../../functions/paginationEmoji");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("emoji")
    .setDescription("Use emoji without Nitro")
    .addStringOption((option) =>
      option
        .setName("choose-server")
        .setDescription("Choose server to use emojis?")
        .addChoices({ name: "Yes", value: "Y" }, { name: "No", value: "N" })
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client, guild, options, member } = interaction;

    const getGuildByUser = (user) => {
      return client.guilds.cache
        .map(
          (guild) => guild.members.cache.find((u) => u.id === user.id) && guild
        )
        .filter((guild) => guild);
    };

    // No server specified
    if (options.getString("choose-server") === "N") {
      // const emojis = guild.emojis.cache.map((emoji) => emoji); // Convert Map to Array
      const emojis = client.emojisFromAllServers;
      const emojiArray = [];
      const chunkSize = 24;

      // Get the list of emoji for pagination
      for (let i = 0; i < emojis.length; i += chunkSize) {
        emojiArray.push(emojis.slice(i, i + chunkSize));
      }

      let embeds = emojiArray.map((emoji, index) =>
        new EmbedBuilder()
          .setColor(0xffd1dc)
          .setTitle(`Emoji Page ${index + 1}`)
          .setDescription(
            "Choose any emoji you want from all servers the bot joined xD"
          )
          .addFields({ name: "‎", value: "‎" })
          .addFields(
            emoji.map((emo) => {
              return {
                // prettier-ignore
                name: `<${emo.animated ? "a" : ""}:${emo.name}:${emo.id}> ${emo.name}`, // <a:name:id> name
                value: "‎",
                inline: true,
              };
            })
          )
      );

      const rows = emojiArray.map((emoji) =>
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("emoji-menu")
            .setPlaceholder("Choose emoji")
            .setMinValues(1)
            .setMaxValues(1) // Customize this for multi-select
            .addOptions(
              emoji.map((emo) => {
                return {
                  label: emo.name,
                  value: `<${emo.animated ? "a" : ""}:${emo.name}:${emo.id}>`,
                  emoji: `<${emo.animated ? "a" : ""}:${emo.name}:${emo.id}>`,
                };
              })
            )
        )
      );

      await paginationEmoji(interaction, embeds, rows);
    }
    // server specified
    else {
      const guilds = getGuildByUser(member);

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("emoji-server")
          .setPlaceholder("Choose server")
          .setMinValues(1)
          .setMaxValues(1) // Customize this for multi-select
          .addOptions(
            guilds.map((guild) => {
              return {
                label: guild.name,
                value: guild.id,
              };
            })
          )
      );

      await interaction.reply({
        content: "Incoming function, pls choose another ^^",
        components: [row],
        ephemeral: true,
      });
    }
  },
};
