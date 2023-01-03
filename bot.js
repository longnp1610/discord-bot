const { ShardingManager } = require("discord.js");
const chalk = require("chalk");
const config = require("./config.json");

const manager = new ShardingManager("server.js", {
  totalShards: "auto",
  shardList: "auto",
  token: config.token,
});

manager.on("shardCreate", async (shard) => {
  console.log(
    chalk.hex("#DEADED").bold("[Information] ") +
      chalk.cyan(`${new Date()} || Spawned ${shard.id}`)
  );
});

manager.spawn();
