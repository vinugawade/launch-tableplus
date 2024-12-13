/**
 * Retrieve the first matching database service from the app's info.
 * @param {object} app - The Lando application object.
 * @param {Array} services - The list of services to check.
 * @returns {object|null} The matching database service or null.
 */
function getDbService(app, services) {
  if (!services.length) return null;

  const dbService = services.find((service) =>
    ['mysql', 'mariadb'].some((dbType) => service.type.includes(dbType)) &&
    service.external_connection
  );

  if (!dbService) {
    console.error("No database service with external connection found.");
    return null;
  }

  return dbService;
}

exports.getDbService = getDbService;
