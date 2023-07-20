'use strict';

/**
 * registration router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::registration.registration');
