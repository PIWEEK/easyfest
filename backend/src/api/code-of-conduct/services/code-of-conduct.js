'use strict';

/**
 * code-of-conduct service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::code-of-conduct.code-of-conduct');
