"use strict";

const isEmpty = require("lodash.isempty");
const filter = require("lodash.filter");
const { filterServices } = require("../helper/filter-services");
const { getDbService } = require("../helper/db-services");

module.exports = (lando) => ({
  command: "tableplus",
  describe: "📚 Open the database in the TablePlus GUI",
  level: "app",
  options: {
    service: {
      describe: "🛠 Specify the database service",
      alias: "s",
      default: "database",
    },
  },
  run: async (options) => {
    try {
      const app = await lando.getApp(options._app.root);

      if (!app || !app.info) {
        throw new Error("🤔 Unable to retrieve application info. Is this even Lando?");
      }

      const serviceFilter = options.service || "database";

      await app.init();

      const services = filter(app.info, (service) =>
        filterServices(service.service, serviceFilter)
      );

      if (isEmpty(services)) {
        throw new Error("🔎 No matching database services found. Did you configure it?");
      }

      const dbService = getDbService(app, services);

      if (!dbService || !dbService.external_connection || !dbService.creds) {
        throw new Error("❌ Could not retrieve database connection details. Uh-oh!");
      }

      const {
        external_connection: { port },
        creds: { user, password, database },
        type,
      } = dbService;

      const validDbTypes = ["mariadb", "mysql", "postgresql", "postgres"];

      const validDbType = validDbTypes.find((dbType) =>
        dbService.type.includes(dbType)
      );

      if (!validDbType) {
        throw new Error(
          "⚠️ Currently, only MySQL, MariaDB, and PostgreSQL are supported. Sorry!"
        );
      }

      const connectionUrl = `${validDbType}://${user}:${password}@127.0.0.1:${port}/${database}?statusColor=007F3D&environment=local&name=${app.name}`;

      openTablePlus(connectionUrl, lando);
    } catch (error) {
      console.error(`💥 Error: ${error.message}`);
    }
  },
});

// Open TablePlus based on OS type
function openTablePlus(connectionUrl, lando) {
  const osType = process.platform;
  if (osType === "darwin") {
    const appPath = getMacAppPath();
    console.log("🍎 Detected macOS! Opening TablePlus...");
    lando.shell.sh(["open", connectionUrl, "-a", appPath], {
      mode: "exec",
      detached: true,
    });
  } else if (osType === "win32") {
    const tablePlusExePath = "C:\\Program Files\\TablePlus\\TablePlus.exe";
    console.log("🖥 Detected Windows! Opening TablePlus...");
    lando.shell.sh([tablePlusExePath, connectionUrl], {
      mode: "exec",
      detached: true,
    });
  } else {
    console.error("🌍 Unsupported operating system for TablePlus integration. Sorry!");
  }
}

// Get the macOS app path
function getMacAppPath() {
  const tablePlusPath = "/Applications/TablePlus.app/Contents/MacOS/TablePlus";
  const setAppPath =
    "/Applications/Setapp/TablePlus.app/Contents/MacOS/TablePlus";
  console.log("🔍 Checking for TablePlus installation...");
  return require("fs").existsSync(setAppPath) ? setAppPath : tablePlusPath;
}
