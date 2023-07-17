'use strict';

/**
 * streaming router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::streaming.streaming');
