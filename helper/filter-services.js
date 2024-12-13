const includes = require("lodash.includes");
const isEmpty = require("lodash.isempty");

/**
 * Filters the services based on the provided service name.
 * @param {string} service - The name of the service.
 * @param {string[]} serviceFilter - The list of valid service names to filter.
 * @returns {boolean} Whether the service matches the filter.
 */
function filterServices(service, serviceFilter = []) {
  return isEmpty(serviceFilter) || includes(serviceFilter, service);
}

exports.filterServices = filterServices;
