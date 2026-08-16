module.exports = ({ env }) => ({
  email: {
    config: {
      provider: env('EMAIL_PROVIDER', 'strapi-provider-email-local-browser'),
      providerOptions: env('EMAIL_PROVIDER', 'strapi-provider-email-local-browser') === 'strapi-provider-email-local-browser'
        ? {
            browser: env('EMAIL_PROVIDER_BROWSER', 'chromium')
          }
        : env('EMAIL_PROVIDER', '') === 'nodemailer'
        ? {
            host: env('EMAIL_SMTP_HOST'),
            port: env.int('EMAIL_SMTP_PORT', 587),
            auth: {
              user: env('EMAIL_SMTP_USER'),
              pass: env('EMAIL_SMTP_PASS'),
            },
          }
        : {},
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'juliasedefdjian@strapi.io'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'juliasedefdjian@strapi.io'),
        testAddress: env('EMAIL_TEST_ADDRESS', 'juliasedefdjian@strapi.io'),
      },
    },
  },
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: env('JWT_SECRET', 'default_jwt_secret'),
      jwt: {
        expiresIn: '7d',
      },
      register: {
        allowedFields: [
	    "room_code","room_type","registration","name","surname","pseudonym","smial","cond_random","phone_number","dni","aide","mentee","age","mentor","minor","minor_adds","menu","allergy","late_arrival","pre_exit","gala_dinner","all_inclusive","shirt","song_book","supplement","price"
        ],
      },
    },
  },
});
