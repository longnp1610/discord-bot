const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

const paginationEmoji = require("../../functions/paginationEmoji");

module.exports = {
  data: { name: "emoji-server" },
  async execute(interaction, client) {
    // values is an array so have to use values[0] instead
    const { channel, guild, values } = interaction;

    const getGuildById = (gid) => {
      return client.guilds.cache.get(gid);
    };

    const mGuild = getGuildById(values[0]);
    const mGuildEmojis = mGuild.emojis.cache
      .filter((emoji) => emoji.available)
      .map((emoji) => emoji); // Convert Map to Array and Get all unlocked emoji

    const emojiArray = [];
    const chunkSize = 24;

    // Get the list of emoji for pagination
    for (let i = 0; i < mGuildEmojis.length; i += chunkSize) {
      emojiArray.push(mGuildEmojis.slice(i, i + chunkSize));
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
  },
};
