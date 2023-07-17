'use strict';

/**
 * newsletter-subscription service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter-subscription.newsletter-subscription');
