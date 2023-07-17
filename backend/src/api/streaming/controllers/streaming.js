'use strict';

/**
 * streaming controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::streaming.streaming');
