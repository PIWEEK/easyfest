module.exports = ({ env }) => ({
  // ...
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
  // ...
});