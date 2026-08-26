'use strict';

const saveAndPublishEasyFestDefaultEntities = require('./bootstrapEasyFestDefaultEntities.js')

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await saveAndPublishEasyFestDefaultEntities(strapi)()

    // Los permisos de Public/Authenticated ya NO se reescriben en cada arranque:
    // lo que esté configurado en Strapi (Settings > Users & Permissions > Roles)
    // se respeta tal cual, no se sobrescribe ni se borra en el despliegue.
    // `bootstrapEasyFestPermissions.js` se deja en el repo sin usar por si hace
    // falta consultarlo o reactivarlo más adelante.
  },
};
