const grantEasyFestPublicApiPermissions = (strapi) => async () => {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  const publicRoleId = publicRole.id;

  const roleService = strapi.plugin('users-permissions').service('role');
  await roleService.updateRole(publicRoleId, {
    permissions: {
      'api::about-us': {
        controllers: {
          'about-us': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::accommodation-info': {
        controllers: {
          'accommodation-info': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::activity': {
        controllers: {
          activity: {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::agenda': {
        controllers: {
          agenda: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::code-of-conduct': {
        controllers: {
          'code-of-conduct': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::contact-info': {
        controllers: {
          'contact-info': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::contact-type': {
        controllers: {
          'contact-type': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' }
          }
        }
      },
      'api::cookie-policy': {
        controllers: {
          'cookie-policy': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::faq': {
        controllers: {
          faq: {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::homepage': {
        controllers: {
          homepage: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' }
          }
        }
      },
      'api::news-item': {
        controllers: {
          'news-item': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::newsletter-subscription': {
        controllers: {
          'newsletter-subscription': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' }
          }
        }
      },
      'api::org-team': {
        controllers: {
          'org-team': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::press-kit': {
        controllers: {
          'press-kit': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::privacy-policy': {
        controllers: {
          'privacy-policy': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::profile-contact': {
        controllers: {
          'profile-contact': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' }
          }
        }
      },
      'api::public-profile': {
        controllers: {
          'public-profile': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::registration': {
        controllers: {
          registration: {
            find: { enabled: false, policy: '' },
            findOne: { enabled: false, policy: '' },
            create: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' }
          }
        }
      },
      'api::registration-info': {
        controllers: {
          'registration-info': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::seo': {
        controllers: {
          seo: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::setting': {
        controllers: {
          setting: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::site': {
        controllers: {
          site: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' }
          }
        }
      },
      'api::speakers': {
        controllers: {
          speakers: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::sponsor': {
        controllers: {
          sponsor: {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::sponsors-info': {
        controllers: {
          'sponsors-info': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::streaming': {
        controllers: {
          streaming: {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::track': {
        controllers: {
          track: {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
            // create: { enabled: false, policy: '' },
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      },
      'api::venue-info': {
        controllers: {
          'venue-info': {
            find: { enabled: true, policy: '' }
            // update: { enabled: false, policy: '' },
            // delete: { enabled: false, policy: '' },
            // createLocalization: { enabled: false, policy: '' }
          }
        }
      }
    }
  });
};

module.exports = grantEasyFestPublicApiPermissions;
