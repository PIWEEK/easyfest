module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-local-browser', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        browser: 'chromium'
      },
      settings: {
        defaultFrom: 'juliasedefdjian@strapi.io',
        defaultReplyTo: 'juliasedefdjian@strapi.io',
        testAddress: 'juliasedefdjian@strapi.io',
      },
    },
  },
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: 'N1WVrkrjgmdjrSyTZYwUC6Fji41yoBjbMdN2qseiwZ8=',
      jwt: {
        expiresIn: '7d',
      },
    },
  },
});