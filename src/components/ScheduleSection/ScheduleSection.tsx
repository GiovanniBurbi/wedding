import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import LocationCard from '../LocationCard/LocationCard';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';
import styles from './ScheduleSection.module.css';

export default function ScheduleSection() {
  const { ceremony, party, photoSrc } = weddingConfig.schedule;
  const { t } = useLanguage();

  return (
    <section id="schedule" className={styles.section}>
      <h2 className={styles.heading}>{t.schedule.heading}</h2>
      <div className={styles.content}>
        <div className={styles.events}>
          <LocationCard
            venueName={ceremony.venueName}
            address={ceremony.address}
            time={ceremony.time}
            mapsUrl={ceremony.mapsUrl}
            mapsLinkText={t.map.viewOnMaps}
          />
          <LocationCard
            venueName={party.venueName}
            address={party.address}
            mapsUrl={party.mapsUrl}
            mapsLinkText={t.map.viewOnMaps}
          />
        </div>
        <div className={styles.photo}>
          <PhotoPlaceholder src={photoSrc} alt={t.schedule.photoAlt} aspectRatio="3/4" />
        </div>
      </div>
    </section>
  );
}
