import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import { useImagePreload } from '../../utils/useImagePreload';
import { useScrollReveal } from '../../utils/useScrollReveal';
import DietaryFormLink from '../DietaryFormLink/DietaryFormLink';
import ringsImage from '../../assets/rings.jpg';
import styles from './PartySection.module.css';

export default function PartySection() {
  const { dietaryFormUrl } = weddingConfig.party;
  const { t } = useLanguage();
  const bgReady = useImagePreload(ringsImage);
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="rsvp"
      className={`${styles.section} ${bgReady ? styles.bgReady : ''}`}
      style={{ '--party-bg-image': `url(${ringsImage})` } as React.CSSProperties}
    >
      <div ref={contentRef} className="reveal-fade-up" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className={styles.heading}>{t.rsvp.heading}</h2>
        <div className={styles.content}>
          <p className={styles.description}>{t.rsvp.description}</p>
          <p className={styles.deadline}>{t.rsvp.deadline}</p>
          <DietaryFormLink formUrl={dietaryFormUrl} label={t.rsvp.buttonLabel} />
        </div>
      </div>
    </section>
  );
}
