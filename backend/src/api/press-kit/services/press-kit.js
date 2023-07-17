'use strict';

/**
 * press-kit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::press-kit.press-kit');
