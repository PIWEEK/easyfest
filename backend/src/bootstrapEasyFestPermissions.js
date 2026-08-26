// Este bootstrap se ejecuta en cada arranque de Strapi (ver `src/index.js`), incluido
// cada despliegue. `roleService.updateRole` REEMPLAZA el árbol de permisos completo del
// rol al que se llama: cualquier permiso activado a mano desde el panel de admin que no
// esté aquí listado se desactiva en el siguiente arranque. Por eso este archivo debe ser
// la fuente de verdad de TODO lo que necesita el rol Public y el rol Authenticated: si
// falta algo aquí, "se borra solo" al desplegar.

// Permisos de solo lectura que necesitan tanto Public como Authenticated (un usuario
// logueado sigue viendo el mismo contenido público de la web).
const readOnlyApiPermissions = {
  'api::about-us': {
    controllers: {
      'about-us': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::accommodation-info': {
    controllers: {
      'accommodation-info': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::agenda': {
    controllers: {
      agenda: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::code-of-conduct': {
    controllers: {
      'code-of-conduct': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::contact-info': {
    controllers: {
      'contact-info': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::contact-type': {
    controllers: {
      'contact-type': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::cookie-policy': {
    controllers: {
      'cookie-policy': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::enrollment': {
    controllers: {
      enrollment: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::faq': {
    controllers: {
      faq: {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::homepage': {
    controllers: {
      homepage: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::news-item': {
    controllers: {
      'news-item': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::newsletter-subscription': {
    controllers: {
      'newsletter-subscription': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::org-team': {
    controllers: {
      'org-team': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::press-kit': {
    controllers: {
      'press-kit': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::privacy-policy': {
    controllers: {
      'privacy-policy': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::profile-contact': {
    controllers: {
      'profile-contact': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::public-profile': {
    controllers: {
      'public-profile': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::registration-info': {
    controllers: {
      'registration-info': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::seo': {
    controllers: {
      seo: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::setting': {
    controllers: {
      setting: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::simple-page': {
    controllers: {
      'simple-page': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::site': {
    controllers: {
      site: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::speakers': {
    controllers: {
      speakers: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::sponsor': {
    controllers: {
      sponsor: {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::sponsors-info': {
    controllers: {
      'sponsors-info': {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::streaming': {
    controllers: {
      streaming: {
        find: { enabled: true, policy: '' }
      }
    }
  },
  'api::track': {
    controllers: {
      track: {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  },
  'api::venue-info': {
    controllers: {
      'venue-info': {
        find: { enabled: true, policy: '' }
      }
    }
  }
};

// `activity` necesita distinto alcance según el rol: cualquier visitante puede leer la
// agenda, pero solo un usuario logueado puede apuntarse/desapuntarse (update, usado por
// `/me` para conectar/desconectar `registered_users`/`queued_users`).
const activityPermissions = (withUpdate) => ({
  'api::activity': {
    controllers: {
      activity: {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' },
        ...(withUpdate ? { update: { enabled: true, policy: '' } } : {})
      }
    }
  }
});

const publicOnlyPermissions = {
  // Formulario de inscripción (create-only, sin lectura pública de inscripciones).
  'api::registration': {
    controllers: {
      registration: {
        find: { enabled: false, policy: '' },
        findOne: { enabled: false, policy: '' },
        create: { enabled: true, policy: '' }
      }
    }
  },
  // Login, "olvidé mi contraseña" y "restablecer contraseña" del plugin de usuarios:
  // sin esto, esas pantallas devuelven 403 tras cada despliegue.
  'plugin::users-permissions': {
    controllers: {
      auth: {
        callback: { enabled: true, policy: '' },
        forgotPassword: { enabled: true, policy: '' },
        resetPassword: { enabled: true, policy: '' }
      }
    }
  },
  // Necesario para la búsqueda de ficheros subidos que usa la home (`/api/upload/files`).
  'plugin::upload': {
    controllers: {
      'content-api': {
        find: { enabled: true, policy: '' }
      }
    }
  }
};

const authenticatedOnlyPermissions = {
  // `/me` usa esta acción para leer los datos y actividades del usuario logueado.
  'plugin::users-permissions': {
    controllers: {
      user: {
        me: { enabled: true, policy: '' }
      }
    }
  }
};

const grantEasyFestPublicApiPermissions = (strapi) => async () => {
  const roleService = strapi.plugin('users-permissions').service('role');

  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  await roleService.updateRole(publicRole.id, {
    permissions: {
      ...readOnlyApiPermissions,
      ...activityPermissions(false),
      ...publicOnlyPermissions
    }
  });

  const authenticatedRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });
  await roleService.updateRole(authenticatedRole.id, {
    permissions: {
      ...readOnlyApiPermissions,
      ...activityPermissions(true),
      ...authenticatedOnlyPermissions
    }
  });
};

module.exports = grantEasyFestPublicApiPermissions;
