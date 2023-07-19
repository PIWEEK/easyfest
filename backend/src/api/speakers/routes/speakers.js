'use strict';

/**
 * speakers router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::speakers.speakers');
