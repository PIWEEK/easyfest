'use strict';

/**
 * sponsor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sponsor.sponsor');
