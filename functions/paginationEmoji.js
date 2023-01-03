const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

/**
 *
 * @param {CommandInteraction} interaction
 * @param {Array} embeds
 * @param {Array} rows
 */
module.exports = async (interaction, embeds, rows) => {
  let allButtons = new ActionRowBuilder().addComponents([
    new ButtonBuilder()
      .setStyle("Secondary")
      .setCustomId("first")
      .setLabel("⏪"),
    new ButtonBuilder()
      .setStyle("Secondary")
      .setCustomId("prev")
      .setLabel("⬅️"),
    new ButtonBuilder()
      .setStyle("Secondary")
      .setCustomId("stop")
      .setLabel("⛔️"),
    new ButtonBuilder()
      .setStyle("Secondary")
      .setCustomId("next")
      .setLabel("➡️"),
    new ButtonBuilder().setStyle("Secondary").setCustomId("end").setLabel("⏩"),
  ]);
  // send message if embeds is 1
  if (embeds.length === 1) {
    if (interaction.deferred) {
      return interaction.followUp({
        components: [rows[0]],
        embeds: [embeds[0]],
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        components: [rows[0]],
        embeds: [embeds[0]],
        fetchReply: true,
        ephemeral: true,
      });
    }
  }

  embeds = embeds.map((embed, index) => {
    return embed.setFooter({
      text: `Page ${index + 1}/${embeds.length}`,
    });
  });

  if (interaction.deferred) {
    await interaction.followUp({
      embeds: [embeds[0]],
      components: [allButtons, rows[0]],
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      embeds: [embeds[0]],
      components: [allButtons, rows[0]],
      ephemeral: true,
    });
  }

  let filter = (m) => m.member.id === interaction.member.id;

  const collector = await interaction.channel.createMessageComponentCollector({
    filter: filter,
    time: 120000,
  });

  let currentPage = 0;
  collector.on("collect", async (b) => {
    if (b.isButton()) {
      await b.deferUpdate().catch((e) => console.error(e));
      // await wait(500);
      switch (b.customId) {
        case "first":
          {
            if (currentPage != 0) {
              currentPage = 0;
              await interaction
                .editReply({
                  embeds: [embeds[currentPage]],
                  components: [allButtons, rows[currentPage]],
                })
                .catch((e) => console.error(e));
            }
          }
          break;
        case "prev":
          {
            if (currentPage != 0) {
              currentPage -= 1;
              await interaction
                .editReply({
                  embeds: [embeds[currentPage]],
                  components: [allButtons, rows[currentPage]],
                })
                .catch((e) => console.error(e));
            } else {
              currentPage = embeds.length - 1;
              await interaction
                .editReply({
                  embeds: [embeds[currentPage]],
                  components: [allButtons, rows[currentPage]],
                })
                .catch((e) => console.error(e));
            }
          }
          break;
        case "stop":
          {
            // allButtons.components.forEach((btn) => btn.setDisabled(true));
            await interaction.deleteReply();
          }
          break;
        case "next":
          {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              await interaction
                .editReply({
                  embeds: [embeds[currentPage]],
                  components: [allButtons, rows[currentPage]],
                })
                .catch((e) => console.error(e));
            } else {
              currentPage = 0;
              await interaction
                .editReply({
                  embeds: [embeds[currentPage]],
                  components: [allButtons, rows[currentPage]],
                })
                .catch((e) => console.error(e));
            }
          }
          break;
        case "end":
          {
            currentPage = embeds.length - 1;
            await interaction
              .editReply({
                embeds: [embeds[currentPage]],
                components: [allButtons, rows[currentPage]],
              })
              .catch((e) => console.error(e));
          }
          break;

        default:
          break;
      }
    }
  });

  collector.on("end", async () => {
    if (flag) return;
    // await interaction.deleteReply();
  });
};
