'use strict';

/**
 * streaming service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::streaming.streaming');
