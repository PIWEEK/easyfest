'use strict';

/**
 * track service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::track.track');
