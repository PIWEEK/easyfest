'use strict';

/**
 * registration service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::registration.registration');
