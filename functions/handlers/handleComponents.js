const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentsPath = path.join(
      path.dirname(require.main.filename),
      "components"
    );
    const componentsFolder = fs.readdirSync(componentsPath);
    for (const folder of componentsFolder) {
      const componentFiles = fs
        .readdirSync(path.join(componentsPath, folder))
        .filter((file) => file.endsWith(".js"));

      const { buttons, selectMenus } = client;
      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(path.join(componentsPath, folder, file));
            buttons.set(button.data.name, button);
          }
          break;
        case "selectMenus":
          for (const file of componentFiles) {
            const menu = require(path.join(componentsPath, folder, file));
            selectMenus.set(menu.data.name, menu);
          }
          break;

        default:
          break;
      }
    }
  };
};
