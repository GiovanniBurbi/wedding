import { useMemo } from 'react';
import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';
import Navigation from '../Navigation/Navigation';
import coupleImage from '../../assets/couple.jpg';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const { couple, hero, weddingDate } = weddingConfig;
  const { t } = useLanguage();

  const daysRemaining = useMemo(() => {
    const wedding = new Date(weddingDate);
    const now = new Date();
    wedding.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const diff = wedding.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [weddingDate]);

  const sections = [
    { id: 'schedule', label: t.nav.schedule },
    { id: 'map', label: t.nav.map },
    { id: 'party', label: t.nav.rsvp },
    { id: 'honeymoon', label: t.nav.honeymoon },
    { id: 'gift', label: t.nav.gift },
  ];

  return (
    <section
      className={styles.hero}
      style={{ '--hero-bg-image': `url(${coupleImage})` } as React.CSSProperties}
    >
      <div className={styles.content}>
        <div className={styles.photo}>
          <PhotoPlaceholder
            src={hero.photoSrc}
            alt={t.hero.photoAlt}
            aspectRatio="3/4"
          />
        </div>
        <h1 className={styles.names}>
          {couple.name1} <span className={styles.ampersand}>&amp;</span> {couple.name2}
        </h1>
        <p className={styles.date}>{t.hero.date}</p>
        <div className={styles.countdown}>
          {daysRemaining > 0 ? (
            <>
              <span className={styles.countdownNumber}>{daysRemaining}</span>
              <span className={styles.countdownLabel}>{t.hero.daysToGo}</span>
            </>
          ) : (
            <span className={styles.countdownLabel}>{t.hero.wereMarried}</span>
          )}
        </div>
        <Navigation sections={sections} />
      </div>
    </section>
  );
}
