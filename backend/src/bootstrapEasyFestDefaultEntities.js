const singleTypesUids = [
  'api::about-us.about-us',
  'api::accommodation-info.accommodation-info',
  'api::agenda.agenda',
  'api::code-of-conduct.code-of-conduct',
  'api::contact-info.contact-info',
  'api::cookie-policy.cookie-policy',
  'api::homepage.homepage',
  'api::org-team.org-team',
  'api::press-kit.press-kit',
  'api::privacy-policy.privacy-policy',
  'api::registration-info.registration-info',
  'api::setting.setting',
  'api::site.site',
  'api::speakers.speakers',
  'api::sponsor.sponsor',
  'api::streaming.streaming',
  'api::venue-info.venue-info',
]

const saveAndPublishDefaultEntity = (strapi) => async (uid) => {
  // NOTE Contrary to what one would expect, single collections can in fact hold multiple entities at the same time (try
  // to delete one to see it in action!). Sorting a findMany operation to get the last updated one is the most robust
  // way to get the active entity that Strapi is considering unique.
  const entrySingle = await strapi.entityService.findMany(uid, {
    limit: 1,
    sort: { updatedAt: 'desc' },
  })

  if (entrySingle == null) {
    strapi.log.info(`Publishing ${uid} with defaults...`)
    return await strapi.entityService.create(uid, {
      data: {
        publishedAt: Date.now(),
      }
    })
  }

  if (entrySingle.publishedAt !== null) {
    strapi.log.info(`Skipping publication: ${uid} is already published.`)
    return entrySingle
  }

  strapi.log.info(`Re-publishing required ${uid}...`)
  return await strapi.entityService.update(uid, entrySingle.id, {
    data: {
      publishedAt: Date.now(),
    }
  }).catch((e) => {
    strapi.log.warn(`Required ${uid} couldn't be published!`)
  })
}

const saveAndPublishEasyFestDefaultEntities = (strapi) => async () => {
  await Promise.all(
    singleTypesUids.map(
      (uid) => saveAndPublishDefaultEntity(strapi)(uid)
    )
  )
}

module.exports = saveAndPublishEasyFestDefaultEntities
