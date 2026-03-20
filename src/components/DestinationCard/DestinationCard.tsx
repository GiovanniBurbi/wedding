import { useLanguage } from '../../i18n/LanguageContext';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';
import styles from './DestinationCard.module.css';

interface DestinationCardProps {
  cityKey: string;
  descriptionKey: string;
  photoSrc?: string;
  photoAlt: string;
  index: number;
  hidePhoto?: boolean;
}

export default function DestinationCard({
  cityKey,
  photoSrc,
  photoAlt,
  index,
  hidePhoto = false,
}: DestinationCardProps) {
  const { t } = useLanguage();

  const destination = t.honeymoon.destinations[cityKey as keyof typeof t.honeymoon.destinations];

  return (
    <div className={`${styles.card} ${index % 2 === 1 ? styles.cardAlt : ''}`}>
      <h3 className={styles.cityName}>{destination.name}</h3>
      {destination.description && <p className={styles.description}>{destination.description}</p>}
      {!hidePhoto && <PhotoPlaceholder src={photoSrc} alt={photoAlt} />}
    </div>
  );
}
