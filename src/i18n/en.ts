import type { Translations } from './translations';

const en: Translations = {
  nav: {
    schedule: 'Schedule',
    map: 'Map',
    rsvp: 'RSVP',
    honeymoon: 'Honeymoon',
    gift: 'Gift',
  },
  hero: {
    photoAlt: 'Couple photo',
    date: 'June 28, 2026',
    daysToGo: 'days to go',
    wereMarried: "We're married!",
  },
  schedule: {
    heading: 'Schedule',
    photoAlt: 'Schedule photo',
  },
  map: {
    heading: 'Venue Locations',
    fallback: 'Map could not be loaded. Use the links below to find each venue.',
    viewOnMaps: 'View on Google Maps',
    openInMaps: 'Open in Google Maps',
    driveTime: '~10 min drive',
  },
  rsvp: {
    heading: 'Will You Be Joining Us?',
    description:
      "We would be delighted to have you celebrate this special day with us. Please let us know if you'll be joining and share any dietary needs so we can make sure everyone feels welcome at the table.",
    buttonLabel: 'RSVP',
  },
  gift: {
    heading: 'Gift',
    message:
      "Your presence is the greatest gift. If you'd like to contribute, we're collecting for our honey moon trip to Canada and America.",
    accountOwner: 'Account Owner',
    copied: 'Copied!',
    copyLabel: 'Copy',
  },
  honeymoon: {
    heading: 'Our Honeymoon',
    intro:
      'After the wedding, we are embarking on a one-month adventure across Canada and the United States. Follow our journey through vibrant cities, stunning landscapes, and unforgettable train rides.',
    fallback:
      'Map could not be loaded. Our route: Rome → Montreal → Toronto → Chicago → Denver → Glenwood Springs → Salt Lake City → Truckee → San Francisco.',
    travelModes: {
      flight: 'Flight',
      train: 'Train',
      drive: 'Drive',
    },
    destinations: {
      rome: {
        name: 'Rome',
        description: '',
        photoAlt: '',
      },
      montreal: {
        name: 'Montreal',
        description:
          'Historic Old Montreal, cobblestone streets, and a European feel to kick off the trip before heading west by train.',
        photoAlt: 'View of Montreal',
      },
      toronto: {
        name: 'Toronto',
        description:
          'Visiting family, exploring the CN Tower and the Distillery District, and a day trip to Niagara Falls before our flight.',
        photoAlt: 'View of Toronto',
      },
      chicago: {
        name: 'Chicago',
        description:
          'Iconic architecture along the river, Millennium Park, the lakefront, and the starting point of the California Zephyr.',
        photoAlt: 'View of Chicago',
      },
      denver: {
        name: 'Denver',
        description:
          'The historic LoDo district and the gateway to the Rockies as the train climbs into the mountains.',
        photoAlt: 'View of Denver',
      },
      glenwoodSprings: {
        name: 'Glenwood Springs',
        description:
          'Natural hot springs, dramatic canyon scenery, and a quiet mountain stop along the Zephyr route.',
        photoAlt: 'View of Glenwood Springs',
      },
      saltLakeCity: {
        name: 'Salt Lake City',
        description:
          'Where the Great Salt Lake meets the Wasatch Mountains — wide open landscapes and a laid-back city.',
        photoAlt: 'View of Salt Lake City',
      },
      truckee: {
        name: 'Truckee',
        description:
          'A small Sierra Nevada mountain town with alpine trails, local history, and crisp mountain air.',
        photoAlt: 'View of Truckee',
      },
      sanFrancisco: {
        name: 'San Francisco',
        description:
          'The Golden Gate, Alcatraz, cable cars, and the Pacific coast — a perfect place to wrap up the journey.',
        photoAlt: 'View of San Francisco',
      },
    },
  },
  photo: {
    label: 'Photo',
    placeholder: 'Photo placeholder',
  },
  footer: {
    thankYou: 'Thank You',
    seeYouSoon: 'See you soon',
  },
};

export default en;
