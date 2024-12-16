import type { Schema, Attribute } from '@strapi/strapi';

export interface HomepageAboutSection extends Schema.Component {
  collectionName: 'comp_home_about_section';
  info: {
    displayName: 'about section';
    icon: 'picture';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'An exciting event packed with'>;
    image: Attribute.Media & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
  };
}

export interface HomepageAccommodationItem extends Schema.Component {
  collectionName: 'comp_home_accommodation_item';
  info: {
    displayName: 'accommodation item';
    icon: 'picture';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
  };
}

export interface HomepageAccommodationSection extends Schema.Component {
  collectionName: 'comp_home_accommodation_section';
  info: {
    displayName: 'accommodation section';
    icon: 'picture';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Accommodation'>;
    intro: Attribute.String &
      Attribute.DefaultTo<'Stay close to the action with these exclusive Easy Fest discounts!'>;
    places: Attribute.Component<'homepage.accommodation_item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface HomepageActivitiesSection extends Schema.Component {
  collectionName: 'comp_home_activities_section';
  info: {
    displayName: 'activities section';
    icon: 'picture';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Featured activities'>;
    agenda_link_text: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'View full agenda'>;
    intro: Attribute.String;
    f_activities: Attribute.Relation<
      'homepage.activities_section',
      'oneToMany',
      'api::activity.activity'
    >;
  };
}

export interface HomepageLocationsItem extends Schema.Component {
  collectionName: 'comp_home_locations_item';
  info: {
    displayName: 'locations item';
    icon: 'picture';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    badge: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
  };
}

export interface HomepageLocationsSection extends Schema.Component {
  collectionName: 'comp_home_locations_section';
  info: {
    displayName: 'locations section';
    icon: 'picture';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Locations'>;
    intro: Attribute.String &
      Attribute.DefaultTo<"You'll enjoy the best of backdrops, everything's included">;
    locations: Attribute.Component<'homepage.locations_item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface HomepageSpeakersSection extends Schema.Component {
  collectionName: 'comp_home_speakers_section';
  info: {
    displayName: 'speakers section';
    icon: 'picture';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Speakers & special guests'>;
    speakers_link_text: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'View all speakers'>;
  };
}

export interface SiteSocialMedia extends Schema.Component {
  collectionName: 'comp_site_social_medias';
  info: {
    displayName: 'Social media';
    icon: 'link';
    description: '';
  };
  attributes: {
    platform: Attribute.Enumeration<
      ['github', 'mastodon', 'youtube', 'twitter', 'instagram', 'linkedin']
    > &
      Attribute.Required;
    url: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://web.site'>;
    label: Attribute.String;
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
