export type Language = 'en' | 'it';

export interface Translations {
  // Navigation & sections
  nav: {
    schedule: string;
    map: string;
    rsvp: string;
    honeymoon: string;
    gift: string;
  };
  // Hero
  hero: {
    photoAlt: string;
    date: string;
    daysToGo: string;
    wereMarried: string;
  };
  // Schedule
  schedule: {
    heading: string;
    photoAlt: string;
  };
  // Map
  map: {
    heading: string;
    fallback: string;
    viewOnMaps: string;
    openInMaps: string;
    driveTime: string;
  };
  // RSVP
  rsvp: {
    heading: string;
    description: string;
    buttonLabel: string;
  };
  // Gift
  gift: {
    heading: string;
    message: string;
    accountOwner: string;
    copied: string;
    copyLabel: string;
  };
  // Honeymoon
  honeymoon: {
    heading: string;
    intro: string;
    fallback: string;
    travelModes: {
      flight: string;
      train: string;
      drive: string;
    };
    destinations: {
      rome: { name: string; description: string; photoAlt: string };
      montreal: { name: string; description: string; photoAlt: string };
      toronto: { name: string; description: string; photoAlt: string };
      chicago: { name: string; description: string; photoAlt: string };
      denver: { name: string; description: string; photoAlt: string };
      glenwoodSprings: { name: string; description: string; photoAlt: string };
      saltLakeCity: { name: string; description: string; photoAlt: string };
      truckee: { name: string; description: string; photoAlt: string };
      sanFrancisco: { name: string; description: string; photoAlt: string };
    };
  };
  // Photo placeholder
  photo: {
    label: string;
    placeholder: string;
  };
  // Footer
  footer: {
    thankYou: string;
    seeYouSoon: string;
  };
}
