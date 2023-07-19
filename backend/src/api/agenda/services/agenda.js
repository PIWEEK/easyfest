'use strict';

/**
 * agenda service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::agenda.agenda');
