import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageAboutSection extends Struct.ComponentSchema {
  collectionName: 'comp_home_about_section';
  info: {
    displayName: 'about section';
    icon: 'picture';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'An exciting event packed with'>;
  };
}

export interface HomepageAccommodationItem extends Struct.ComponentSchema {
  collectionName: 'comp_home_accommodation_item';
  info: {
    displayName: 'accommodation item';
    icon: 'picture';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageAccommodationSection extends Struct.ComponentSchema {
  collectionName: 'comp_home_accommodation_section';
  info: {
    displayName: 'accommodation section';
    icon: 'picture';
  };
  attributes: {
    intro: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Stay close to the action with these exclusive Easy Fest discounts!'>;
    places: Schema.Attribute.Component<'homepage.accommodation_item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Accommodation'>;
  };
}

export interface HomepageActivitiesSection extends Struct.ComponentSchema {
  collectionName: 'comp_home_activities_section';
  info: {
    description: '';
    displayName: 'activities section';
    icon: 'picture';
  };
  attributes: {
    agenda_link_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'View full agenda'>;
    f_activities: Schema.Attribute.Relation<
      'oneToMany',
      'api::activity.activity'
    >;
    intro: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Featured activities'>;
  };
}

export interface HomepageLocationsItem extends Struct.ComponentSchema {
  collectionName: 'comp_home_locations_item';
  info: {
    displayName: 'locations item';
    icon: 'picture';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageLocationsSection extends Struct.ComponentSchema {
  collectionName: 'comp_home_locations_section';
  info: {
    displayName: 'locations section';
    icon: 'picture';
  };
  attributes: {
    intro: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"You'll enjoy the best of backdrops, everything's included">;
    locations: Schema.Attribute.Component<'homepage.locations_item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Locations'>;
  };
}

export interface HomepageSpeakersSection extends Struct.ComponentSchema {
  collectionName: 'comp_home_speakers_section';
  info: {
    displayName: 'speakers section';
    icon: 'picture';
  };
  attributes: {
    speakers_link_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'View all speakers'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Speakers & special guests'>;
  };
}

export interface SiteNavMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_site_nav_menu_items';
  info: {
    description: '';
    displayName: 'Nav menu item';
    icon: 'apps';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    page: Schema.Attribute.Enumeration<
      [
        'about-us',
        'registration',
        'accommodation-info',
        'agenda',
        'speakers',
        'streaming',
        'venue-info',
      ]
    >;
    path: Schema.Attribute.String;
  };
}

export interface SiteSocialMedia extends Struct.ComponentSchema {
  collectionName: 'comp_site_social_medias';
  info: {
    description: '';
    displayName: 'Social media';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    platform: Schema.Attribute.Enumeration<
      ['github', 'mastodon', 'youtube', 'twitter', 'instagram', 'linkedin']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://web.site'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'homepage.about_section': HomepageAboutSection;
      'homepage.accommodation_item': HomepageAccommodationItem;
      'homepage.accommodation_section': HomepageAccommodationSection;
      'homepage.activities_section': HomepageActivitiesSection;
      'homepage.locations_item': HomepageLocationsItem;
      'homepage.locations_section': HomepageLocationsSection;
      'homepage.speakers_section': HomepageSpeakersSection;
      'site.nav-menu-item': SiteNavMenuItem;
      'site.social-media': SiteSocialMedia;
    }
  }
}
