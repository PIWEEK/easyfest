'use strict';

/**
 * seo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::seo.seo');
