import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';
import Navigation from '../Navigation/Navigation';
import flowersImage from '../../assets/wedding-flowers.jpg';
import verticalFlower from '../../assets/flowers-vertical.jpg'
import styles from './HeroSection.module.css';
import { useMemo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const { couple, hero, weddingDate } = weddingConfig;
  const { t } = useLanguage();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    const handleScroll = () => {
      // Hide the arrow once the user scrolls more than 50px
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    // Small timeout to ensure the browser has painted
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    { id: 'rsvp', label: t.nav.rsvp },
    { id: 'honeymoon', label: t.nav.honeymoon },
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const currentBg = isMobile ? verticalFlower : flowersImage;

  return (
    <section
      className={`${styles.hero} ${isLoaded ? styles.visible : ''}`}
      style={{ '--hero-bg-image': `url(${currentBg})` } as React.CSSProperties}
    >
      <div className={styles.photo}>
          <PhotoPlaceholder
            src={hero.photoSrc}
            alt={t.hero.photoAlt}
            aspectRatio="3/4"
          />
        </div>
      <div className={styles.content}>
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
        <div className={styles.navWrapper}>
          <Navigation sections={sections} />
        </div>
      </div>
      <div className={`${styles.scrollIndicator} ${!showScrollIndicator ? styles.hidden : ''}`}>
        <FontAwesomeIcon icon={faChevronDown} className={styles.bounceIcon} />
      </div>
    </section>
  );
}
