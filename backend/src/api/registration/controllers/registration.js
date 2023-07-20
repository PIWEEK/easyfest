'use strict';

/**
 * registration controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::registration.registration');
