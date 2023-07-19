'use strict';

/**
 * speakers controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::speakers.speakers');
