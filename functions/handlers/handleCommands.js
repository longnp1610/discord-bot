const { REST, Routes } = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const mCommandRefreshing = (globalLength, privateLength) => {
  // prettier-ignore
  Logger(
    `Started refreshing ${chalk.red.bold(globalLength)} ${chalk.red.bold("global")} and ${chalk.red.bold(privateLength)} ${chalk.red.bold("private")} commands .`
  );
};

const mCommandReloaded = (globalLength, privateLength) => {
  // prettier-ignore
  Logger(
    `Successfully reloaded ${chalk.red.bold(globalLength)} ${chalk.red.bold("global")} and ${chalk.red.bold(privateLength)} ${chalk.red.bold("private")} commands.`
  );
};

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsPath = path.join(
      path.dirname(require.main.filename),
      "commands"
    );

    const privateCommandFiles = [];
    const globalCommandFiles = [];

    const commandsFolder = fs.readdirSync(commandsPath);
    for (const folder of commandsFolder) {
      switch (folder) {
        case "Private":
          fs.readdirSync(path.join(commandsPath, folder))
            .filter((file) => file.endsWith(".js"))
            .forEach((file) =>
              privateCommandFiles.push(path.join(folder, file))
            );
          break;

        default:
          fs.readdirSync(path.join(commandsPath, folder))
            .filter((file) => file.endsWith(".js"))
            .forEach((file) =>
              globalCommandFiles.push(path.join(folder, file))
            );
          break;
      }
    }

    // console.log(globalCommandFiles);
    // console.log(privateCommandFiles);

    const globalCommands = [];
    const privateCommands = [];
    const commandFiles = [globalCommandFiles, privateCommandFiles];

    for (const commandFile of commandFiles) {
      for (const file of commandFile) {
        const command = require(path.join(commandsPath, file));
        if (
          JSON.stringify(commandFile) == JSON.stringify(privateCommandFiles)
        ) {
          privateCommands.push(command.data.toJSON());
        } else {
          globalCommands.push(command.data.toJSON());
        }
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          Logger(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }

    // console.log(globalCommands);
    // console.log(privateCommands);

    const rest = new REST({ version: "10" }).setToken(TOKEN);

    try {
      const global = await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: globalCommands,
      });

      const private = await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        {
          body: privateCommands,
        }
      );
      mCommandRefreshing(globalCommands.length, privateCommands.length);
      mCommandReloaded(global.length, private.length);
    } catch (err) {
      console.error(err);
    }
  };
};
