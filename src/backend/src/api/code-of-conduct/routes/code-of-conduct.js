'use strict';

/**
 * code-of-conduct router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::code-of-conduct.code-of-conduct');
