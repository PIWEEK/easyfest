'use strict';

/**
 * registration-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::registration-info.registration-info');
