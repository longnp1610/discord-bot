const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsPath = path.join(path.dirname(require.main.filename), "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  };
};
