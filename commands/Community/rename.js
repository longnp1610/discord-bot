const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rename")
    .setDescription("Rename yours or others people!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("New name you want to change")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("User you want to rename")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ChangeNickname),
  async execute(interaction) {
    // const client = interaction.client;
    const guild = interaction.guild;
    const mNewName = interaction.options.getString("name");
    const mUserMentioned = interaction.options.getUser("user") ?? null; // The user chosen to be renamed
    const mMember = interaction.member; // Get the user who used the interaction command
    const mMemberPermission = mMember.permissions; // Get the user permissions
    const permissions = [PermissionsBitField.Flags.ManageNicknames]; // List of permissions

    // Get the user in the guild by searching id
    const getUserById = async (id) => {
      return await guild.members.cache.get(id);
    };

    const reply = async (content) => {
      return await interaction.reply({
        content: content,
        ephemeral: true,
      });
    };

    if (
      mUserMentioned &&
      !mMemberPermission.has(permissions) // Chose user but don't have permission to change
    ) {
      await reply("You don't have permission to do this!");
      return;
    } else if (
      mUserMentioned &&
      mMemberPermission.has(permissions) // Chose user and have permission to change
    ) {
      getUserById(mUserMentioned.id).then((u) => {
        u.setNickname(mNewName);
      });
      await reply("Successfully changed nickname");
    } else {
      // Rename themselves and no user
      await mMember.setNickname(mNewName);
      await reply("Successfully changed nickname");
    }
  },
};
