import { Component, type ReactNode, useEffect, useRef } from 'react';
import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import { useScrollReveal } from '../../utils/useScrollReveal';
import DestinationCard from '../DestinationCard/DestinationCard';
import TripMap from '../TripMap/TripMap';
import type { TripStop } from '../TripMap/TripMap';
import tripBackground from '../../assets/trip-background.svg';
import styles from './HoneymoonSection.module.css';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class MapErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function HoneymoonSection() {
  const { t } = useLanguage();
  const { destinations } = weddingConfig.honeymoon;
  const headerRef = useScrollReveal<HTMLDivElement>();
  const mapRef = useScrollReveal<HTMLDivElement>();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Staggered reveal for timeline items
  useEffect(() => {
    const container = timelineRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;

    const items = container.querySelectorAll<HTMLElement>(`.${styles.timelineItem}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [destinations]);

  const stops: TripStop[] = destinations.map((d) => ({
    position: d.coordinates,
    labelKey: d.cityKey,
    travelModeFromPrev: d.travelModeFromPrev,
  }));

  return (
    <section
      id="viaggio"
      className={styles.section}
      style={{ '--honeymoon-bg-image': `url(${tripBackground})` } as React.CSSProperties}
    >
      <div ref={headerRef} className={`${styles.headerCard} reveal-fade-up`}>
        <h2 className={styles.heading}>{t.honeymoon.heading}</h2>
        <p className={styles.intro}>{t.honeymoon.intro}</p>
      </div>

      <div ref={timelineRef} className={styles.timeline}>
        {destinations.map((dest, index) => {
          const destTranslations =
            t.honeymoon.destinations[dest.cityKey as keyof typeof t.honeymoon.destinations];
          return (
            <div
              key={dest.cityKey}
              className={`${styles.timelineItem} reveal-fade-up`}
              style={{ transitionDelay: `${index * 0.04}s` }}
            >
              <DestinationCard
                cityKey={dest.cityKey}
                descriptionKey={dest.cityKey}
                photoSrc={dest.photoSrc}
                photoAlt={destTranslations?.photoAlt ?? dest.cityKey}
                index={index}
                hidePhoto={index === 0 || ['denver', 'glenwoodSprings', 'saltLakeCity', 'truckee'].includes(dest.cityKey)}
              />
            </div>
          );
        })}
      </div>

      <div ref={mapRef} className={`${styles.mapWrapper} reveal-fade-up`}>
        <MapErrorBoundary
          fallback={<p className={styles.mapFallback}>{t.honeymoon.fallback}</p>}
        >
          <TripMap stops={stops} t={t} />
        </MapErrorBoundary>
      </div>
    </section>
  );
}
