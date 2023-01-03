const { Client, GatewayIntentBits, Collection } = require("discord.js");

require("dotenv").config();

const { dirname } = require("path");
const fs = require("fs");
global.rootDirectory = dirname(require.main.filename);
global.Logger = (log) => {
  console.log(log);
};

const TOKEN = process.env.TOKEN;

// Create a new client with intent permissions
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.emojisFromAllServers = [];
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();

const handlerFiles = fs
  .readdirSync("./functions/handlers")
  .filter((file) => file.endsWith(".js"));
for (const file of handlerFiles) {
  require(`./functions/handlers/${file}`)(client);
}

client.handleCommands();
client.handleEvents();
client.handleComponents();
client.login(TOKEN);
