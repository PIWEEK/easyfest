'use strict';

/**
 * public-profile service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::public-profile.public-profile');
