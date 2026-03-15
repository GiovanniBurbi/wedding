import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import DietaryFormLink from '../DietaryFormLink/DietaryFormLink';
import ringsImage from '../../assets/rings.jpg';
import styles from './PartySection.module.css';

export default function PartySection() {
  const { dietaryFormUrl } = weddingConfig.party;
  const { t } = useLanguage();

  return (
    <section
      id="party"
      className={styles.section}
      style={{ '--party-bg-image': `url(${ringsImage})` } as React.CSSProperties}
    >
      <h2 className={styles.heading}>{t.rsvp.heading}</h2>
      <div className={styles.content}>
        <p className={styles.description}>{t.rsvp.description}</p>
        <DietaryFormLink formUrl={dietaryFormUrl} label={t.rsvp.buttonLabel} />
      </div>
    </section>
  );
}
