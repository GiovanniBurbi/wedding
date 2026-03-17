import type { Translations } from './translations';

const it: Translations = {
  nav: {
    schedule: 'Programma',
    map: 'Mappa',
    rsvp: 'RSVP',
    honeymoon: 'Luna di Miele'
  },
  hero: {
    photoAlt: 'Foto degli sposi',
    date: '28 Giugno 2026',
    daysToGo: 'giorni al matrimonio',
    wereMarried: 'Ci siamo sposati!',
  },
  schedule: {
    heading: 'Programma',
    photoAlt: 'Foto del programma',
  },
  map: {
    heading: 'Dove Trovarci',
    fallback: 'La mappa non è disponibile. Usa i link qui sotto per trovare le sedi.',
    viewOnMaps: 'Vedi su Google Maps',
    openInMaps: 'Apri in Google Maps',
    driveTime: '~10 min in auto',
  },
  rsvp: {
    heading: 'Ci Sarai?',
    description:
      'Saremmo felicissimi di averti con noi in questo giorno speciale. Facci sapere se sarai presente e condividi eventuali esigenze alimentari, così potremo accogliervi al meglio.',
    buttonLabel: 'RSVP',
  },
  gift: {
    message:
      "Per chi desidera farci un regalo può contribuire alla nostra luna di miele in Canada e Stati Uniti",
    accountOwner: 'Intestatario',
    copied: 'Copiato!',
    copyLabel: 'Copia',
  },
  honeymoon: {
    heading: 'La Nostra Luna di Miele',
    intro:
      'Dopo il matrimonio partiremo per un\'avventura attraverso il Canada e gli Stati Uniti. Seguite il nostro viaggio tra città vivaci e paesaggi mozzafiato.',
    fallback:
      'La mappa non è disponibile. Il nostro percorso: Roma → Montreal → Toronto → Chicago → Denver → Glenwood Springs → Salt Lake City → Truckee → San Francisco.',
    travelModes: {
      flight: 'Volo',
      train: 'Treno',
      drive: 'Auto',
    },
    destinations: {
      rome: {
        name: 'Roma',
        description: '',
        photoAlt: '',
      },
      montreal: {
        name: 'Montreal',
        description:
          'La Montreal storica, strade acciottolate e un\'atmosfera europea per iniziare il viaggio.',
        photoAlt: 'Veduta di Montreal',
      },
      toronto: {
        name: 'Toronto',
        description:
          'Visita alla famiglia, la CN Tower, il Distillery District e una gita alle Cascate del Niagara.',
        photoAlt: 'Veduta di Toronto',
      },
      chicago: {
        name: 'Chicago',
        description:
          'Architettura iconica lungo il fiume, Millennium Park, il lungolago ed il punto di partenza del California Zephyr.',
        photoAlt: 'Veduta di Chicago',
      },
      denver: {
        name: 'Denver',
        description:
          'Lo storico quartiere LoDo e la porta d\'accesso delle Rocky Montains.',
        photoAlt: 'Veduta di Denver',
      },
      glenwoodSprings: {
        name: 'Glenwood Springs',
        description:
          'Sorgenti termali naturali, canyon spettacolari e relax lungo il percorso dello Zephyr.',
        photoAlt: 'Veduta di Glenwood Springs',
      },
      saltLakeCity: {
        name: 'Salt Lake City',
        description:
          'Dove il Grande Lago Salato incontra le Montagne Wasatch — paesaggi aperti e una città tranquilla.',
        photoAlt: 'Veduta di Salt Lake City',
      },
      truckee: {
        name: 'Truckee',
        description:
          'Una piccola cittadina di montagna nella Sierra Nevada con sentieri alpini, storia locale e aria fresca di montagna.',
        photoAlt: 'Veduta di Truckee',
      },
      sanFrancisco: {
        name: 'San Francisco',
        description:
          'Il Golden Gate, Alcatraz, i cable car e la costa del Pacifico — il posto perfetto per concludere il nostro viaggio di nozze.',
        photoAlt: 'Veduta di San Francisco',
      },
    },
  },
  photo: {
    label: 'Foto',
    placeholder: 'Segnaposto foto',
  },
  footer: {
    thankYou: 'Grazie di cuore!',
    seeYouSoon: 'A presto',
  },
};

export default it;
