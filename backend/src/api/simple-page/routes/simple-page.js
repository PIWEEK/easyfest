'use strict';

/**
 * simple-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::simple-page.simple-page');
