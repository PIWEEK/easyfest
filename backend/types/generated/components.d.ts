import type { Attribute, Schema } from '@strapi/strapi';

export interface HomepageAboutSection extends Schema.Component {
  collectionName: 'comp_home_about_section';
  info: {
    displayName: 'about section';
    icon: 'picture';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'An exciting event packed with'>;
  };
}

export interface HomepageAccommodationItem extends Schema.Component {
  collectionName: 'comp_home_accommodation_item';
  info: {
    displayName: 'accommodation item';
    icon: 'picture';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface HomepageAccommodationSection extends Schema.Component {
  collectionName: 'comp_home_accommodation_section';
  info: {
    displayName: 'accommodation section';
    icon: 'picture';
  };
  attributes: {
    intro: Attribute.String &
      Attribute.DefaultTo<'Stay close to the action with these exclusive Easy Fest discounts!'>;
    places: Attribute.Component<'homepage.accommodation_item', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Accommodation'>;
  };
}

export interface HomepageActivitiesSection extends Schema.Component {
  collectionName: 'comp_home_activities_section';
  info: {
    description: '';
    displayName: 'activities section';
    icon: 'picture';
  };
  attributes: {
    agenda_link_text: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'View full agenda'>;
    f_activities: Attribute.Relation<
      'homepage.activities_section',
      'oneToMany',
      'api::activity.activity'
    >;
    intro: Attribute.String;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Featured activities'>;
  };
}

export interface HomepageLocationsItem extends Schema.Component {
  collectionName: 'comp_home_locations_item';
  info: {
    displayName: 'locations item';
    icon: 'picture';
  };
  attributes: {
    badge: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface HomepageLocationsSection extends Schema.Component {
  collectionName: 'comp_home_locations_section';
  info: {
    displayName: 'locations section';
    icon: 'picture';
  };
  attributes: {
    intro: Attribute.String &
      Attribute.DefaultTo<"You'll enjoy the best of backdrops, everything's included">;
    locations: Attribute.Component<'homepage.locations_item', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Locations'>;
  };
}

export interface HomepageSpeakersSection extends Schema.Component {
  collectionName: 'comp_home_speakers_section';
  info: {
    displayName: 'speakers section';
    icon: 'picture';
  };
  attributes: {
    speakers_link_text: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'View all speakers'>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Speakers & special guests'>;
  };
}

export interface SiteSocialMedia extends Schema.Component {
  collectionName: 'comp_site_social_medias';
  info: {
    description: '';
    displayName: 'Social media';
    icon: 'link';
  };
  attributes: {
    label: Attribute.String;
    platform: Attribute.Enumeration<
      ['github', 'mastodon', 'youtube', 'twitter', 'instagram', 'linkedin']
    > &
      Attribute.Required;
    url: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://web.site'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'homepage.about_section': HomepageAboutSection;
      'homepage.accommodation_item': HomepageAccommodationItem;
      'homepage.accommodation_section': HomepageAccommodationSection;
      'homepage.activities_section': HomepageActivitiesSection;
      'homepage.locations_item': HomepageLocationsItem;
      'homepage.locations_section': HomepageLocationsSection;
      'homepage.speakers_section': HomepageSpeakersSection;
      'site.social-media': SiteSocialMedia;
    }
  }
}
