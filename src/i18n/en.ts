import type { Translations } from './translations';

const en: Translations = {
  nav: {
    schedule: 'Schedule',
    map: 'Map',
    rsvp: 'RSVP',
    honeymoon: 'Honeymoon',
    faq: 'FAQs',
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
    deadline: 'We kindly ask you to confirm your attendance by May 31st',
    buttonLabel: 'RSVP',
  },
  gift: {
    message:
      "If you would like to you can contribute to our honeymoon in Canada and United States",
    accountOwner: 'Account Owners',
    copied: 'Copied!',
    copyLabel: 'Copy',
  },
  honeymoon: {
    heading: 'Our Honeymoon',
    intro:
      'After the wedding we are embarking on an adventure across Canada and the United States. Follow our journey through vibrant cities, stunning landscapes, and unforgettable train rides.',
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
          'Historic Old Montreal, cobblestone streets, and a European feel to kick off the trip.',
        photoAlt: 'View of Montreal',
      },
      toronto: {
        name: 'Toronto',
        description:
          'Visiting family, exploring the CN Tower and the Distillery District, and a day trip to Niagara Falls.',
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
          'The Golden Gate, Alcatraz, cable cars, and the Pacific coast — a perfect place to wrap up the honeymoon.',
        photoAlt: 'View of San Francisco',
      },
    },
  },
  photo: {
    label: 'Photo',
    placeholder: 'Photo placeholder',
  },
  footer: {
    thankYou: 'Thank you so much!',
    seeYouSoon: 'See you soon',
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'What is the dress code?', answer: 'We suggest elegant formal attire. For the ladies, please avoid wearing white, black, or red.' },
      { question: 'Can I bring other guests?', answer: 'Due to limited seating, we can only accommodate those named on the invitation. Please check your invite for details.' },
      { question: 'Is there parking at the venues?', answer: 'Yes, parking is available at both the ceremony and reception venues.' },
      { question: 'What time should I arrive?', answer: 'We recommend arriving at the church by 3:15 PM so everyone is seated before the ceremony begins at 3:30 PM.' },
      { question: 'What about photos and videos?', answer: 'Feel free to snap away and share the joy! Just know that our photographer and videomaker will be capturing every moment of the day, so you can relax and enjoy the celebration.' },
    ],
  },
};

export default en;
