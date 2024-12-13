"use strict";

const _ = require("lodash");
const { filterServices } = require("../helper/filter-services");
const { getDbService } = require("../helper/db-services");

module.exports = (lando) => ({
  command: "tableplus",
  describe: "Open the database in the TablePlus GUI",
  level: "app",
  options: {
    service: {
      describe: "Specify the database service",
      alias: "s",
      default: "database",
    },
  },
  run: async (options) => {
    try {
      const app = await lando.getApp(options._app.root);

      if (!app || !app.info) {
        throw new Error("Unable to retrieve application info.");
      }

      const serviceFilter = options.service || "database";

      await app.init();

      const services = _.filter(app.info, (service) =>
        filterServices(service.service, serviceFilter)
      );

      if (_.isEmpty(services)) {
        throw new Error("No matching database services found.");
      }

      const dbService = getDbService(app, services);

      if (!dbService || !dbService.external_connection || !dbService.creds) {
        throw new Error("Could not retrieve database connection details.");
      }

      const {
        external_connection: { port },
        creds: { user, password, database },
        type,
      } = dbService;
      const validDbTypes = ["mariadb", "mysql", "postgresql", "postgres"];

      const validDbType = validDbTypes.find((type) =>
        dbService.type.includes(type)
      );

      if (!validDbType) {
        throw new Error(
          "Currently, only MySQL, MariaDB, and PostgreSQL are supported."
        );
      }

      const connectionUrl = `${validDbType}://${user}:${password}@127.0.0.1:${port}/${database}?statusColor=007F3D&environment=local&name=${app.name}`;
      console.log(`Opening TablePlus with connection URL: ${connectionUrl}`);

      openTablePlus(connectionUrl);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  },
});

// Open TablePlus based on OS type
function openTablePlus(connectionUrl) {
  const osType = process.platform;
  if (osType === "darwin") {
    const appPath = getMacAppPath();
    lando.shell.sh(["open", connectionUrl, "-a", appPath], {
      mode: "exec",
      detached: true,
    });
  } else if (osType === "win32") {
    const tablePlusExePath = "C:\\Program Files\\TablePlus\\TablePlus.exe";
    lando.shell.sh([tablePlusExePath, connectionUrl], {
      mode: "exec",
      detached: true,
    });
  } else {
    console.error("Unsupported operating system for TablePlus integration.");
  }
}

// Get the macOS app path
function getMacAppPath() {
  const tablePlusPath = "/Applications/TablePlus.app/Contents/MacOS/TablePlus";
  const setAppPath =
    "/Applications/Setapp/TablePlus.app/Contents/MacOS/TablePlus";
  return require("fs").existsSync(setAppPath) ? setAppPath : tablePlusPath;
}
