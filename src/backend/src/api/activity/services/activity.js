'use strict';

/**
 * activity service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::activity.activity');
