'use strict';

/**
 * simple-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::simple-page.simple-page');
