/**
 * Retrieve the first matching database service from the app's info.
 * @param {object} app - The Lando application object.
 * @param {Array} services - The list of services to check.
 * @returns {object|null} The matching database service or null.
 */
function getDbService(app, services) {
  if (!services.length) {
    console.error("😢 No services provided to search for a database!");
    return null;
  }

  const dbService = services.find((service) =>
    ['mysql', 'mariadb'].some((dbType) => service.type.includes(dbType)) &&
    service.external_connection
  );

  if (!dbService) {
    console.error("🔍 No database service with external connection found. Keep looking!");
    return null;
  }

  console.log("🎉 Database service found! Time to get to work!");
  return dbService;
}

exports.getDbService = getDbService;
