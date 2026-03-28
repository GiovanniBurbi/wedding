import montrealPhoto from '../assets/montreal.jpg';
import niagaraFallsPhoto from '../assets/niagara-falls-high.jpg';
import chicagoBeanPhoto from '../assets/chicago-bean.jpg';
import sanFranciscoPhoto from '../assets/san-francisco.jpg';
// import couple1 from '../assets/couple-1.jpg';
import firstImg from '../assets/first-image.jpg'
import church from '../assets/church.jpg';

export interface HoneymoonDestination {
  cityKey: string;
  coordinates: [number, number];
  photoSrc?: string;
  travelModeFromPrev?: 'flight' | 'train' | 'drive';
}

export interface WeddingConfig {
  couple: {
    name1: string;
    name2: string;
  };
  date: string;
  weddingDate: string;
  hero: {
    photoSrc?: string;
    photoAlt?: string;
  };
  sections: Array<{
    id: string;
    label: string;
  }>;
  schedule: {
    ceremony: {
      venueName: string;
      address: string;
      time: string;
      mapsUrl: string;
      coordinates: [number, number];
    };
    party: {
      venueName: string;
      address: string;
      mapsUrl: string;
      coordinates: [number, number];
    };
    photoSrc?: string;
    photoAlt?: string;
  };
  party: {
    description: string;
    dietaryFormUrl: string;
    photoSrc?: string;
    photoAlt?: string;
  };
  honeymoon: {
    destinations: HoneymoonDestination[];
  };
  gift: {
    message: string;
    iban: string;
    swift: string;
    accountOwner: string;
  };
}

const weddingConfig: WeddingConfig = {
  couple: {
    name1: "Giovanni",
    name2: "Francesca",
  },
  date: "June 28, 2026",
  weddingDate: "2026-06-28",
  hero: {
    photoSrc: firstImg,
    photoAlt: "Couple photo",
  },
  sections: [
    { id: "schedule", label: "Schedule" },
    { id: "map", label: "Map" },
    { id: "rsvp", label: "RSVP" },
    { id: "honeymoon", label: "Honeymoon" },
    { id: "gift", label: "Gift" },
  ],
  schedule: {
    ceremony: {
      venueName: "Chiesa di Santa Maria a Mercatale",
      address: "Via A. Gramsci, 4, 50020 Mercatale In Val di Pesa FI, Italy",
      time: "15:30",
      mapsUrl: "https://www.google.com/maps/place/Via+Antonio+Gramsci,+4,+50020+Mercatale+In+Val+di+Pesa+FI,+Italy/@43.6342172,11.2295468,17z",
      coordinates: [43.6347, 11.2319],
    },
    party: {
      venueName: "Villa Mocale",
      address: "Via Collina, 62, 50026 San Casciano in Val di Pesa FI, Italy",
      mapsUrl: "https://maps.google.com/?q=Via+Collina+62+50026+San+Casciano+in+Val+di+Pesa+FI+Italy",
      coordinates: [43.6296805, 11.1949004],
    },
    photoSrc: church,
    photoAlt: "Schedule photo",
  },
  party: {
    description:
      "We would be delighted to have you celebrate this special day with us. Please let us know if you'll be joining and share any dietary needs so we can make sure everyone feels welcome at the table.",
    dietaryFormUrl: "https://cpb1l02r.forms.app/franci-gio",
    photoSrc: undefined,
    photoAlt: "Party venue photo",
  },
  honeymoon: {
    destinations: [
      { cityKey: 'rome', coordinates: [41.9028, 12.4964] },
      { cityKey: 'montreal', coordinates: [45.5017, -73.5673], photoSrc: montrealPhoto, travelModeFromPrev: 'flight' },
      { cityKey: 'toronto', coordinates: [43.6532, -79.3832], photoSrc: niagaraFallsPhoto, travelModeFromPrev: 'train' },
      { cityKey: 'chicago', coordinates: [41.8781, -87.6298], photoSrc: chicagoBeanPhoto, travelModeFromPrev: 'flight' },
      { cityKey: 'denver', coordinates: [39.7392, -104.9903], travelModeFromPrev: 'train' },
      { cityKey: 'glenwoodSprings', coordinates: [39.5505, -107.3248], travelModeFromPrev: 'train' },
      { cityKey: 'saltLakeCity', coordinates: [40.7608, -111.8910], travelModeFromPrev: 'train' },
      { cityKey: 'truckee', coordinates: [39.3280, -120.1833], travelModeFromPrev: 'train' },
      { cityKey: 'sanFrancisco', coordinates: [37.7749, -122.4194], photoSrc: sanFranciscoPhoto, travelModeFromPrev: 'train' },
    ],
  },
  gift: {
    message:
      "Your presence is the greatest gift. If you'd like to contribute, we're collecting for our honey moon trip to Canada and America.",
    iban: "IT93 Y036 6901 6001 7693 9250 436",
    swift: "REVOITM2",
    accountOwner: "Giovanni Burbi & Francesca Del Lungo",
  },
};

export default weddingConfig;
