import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faTrain, faCar } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';
import styles from './DestinationCard.module.css';

interface DestinationCardProps {
  cityKey: string;
  descriptionKey: string;
  travelMode?: 'flight' | 'train' | 'drive';
  photoSrc?: string;
  photoAlt: string;
  index: number;
  hidePhoto?: boolean;
}

const travelModeIcons: Record<string, IconDefinition> = {
  flight: faPlane,
  train: faTrain,
  drive: faCar,
};

export default function DestinationCard({
  cityKey,
  travelMode,
  photoSrc,
  photoAlt,
  index,
  hidePhoto = false,
}: DestinationCardProps) {
  const { t } = useLanguage();

  const destination = t.honeymoon.destinations[cityKey as keyof typeof t.honeymoon.destinations];

  return (
    <div className={`${styles.card} ${index % 2 === 1 ? styles.cardAlt : ''}`}>
      {travelMode && (
        <span className={styles.badge}>
          <FontAwesomeIcon icon={travelModeIcons[travelMode]} />{' '}
          {t.honeymoon.travelModes[travelMode]}
        </span>
      )}
      <h3 className={styles.cityName}>{destination.name}</h3>
      {destination.description && <p className={styles.description}>{destination.description}</p>}
      {!hidePhoto && <PhotoPlaceholder src={photoSrc} alt={photoAlt} />}
    </div>
  );
}
