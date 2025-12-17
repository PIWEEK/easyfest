'use strict';

/**
 * enrollment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::enrollment.enrollment');
