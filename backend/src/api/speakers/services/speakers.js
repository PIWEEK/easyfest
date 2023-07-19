'use strict';

/**
 * speakers service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::speakers.speakers');
