import { Component, type ReactNode } from 'react';
import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
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

  const stops: TripStop[] = destinations.map((d) => ({
    position: d.coordinates,
    labelKey: d.cityKey,
    travelModeFromPrev: d.travelModeFromPrev,
  }));

  return (
    <section
      id="honeymoon"
      className={styles.section}
      style={{ '--honeymoon-bg-image': `url(${tripBackground})` } as React.CSSProperties}
    >
      <div className={styles.headerCard}>
        <h2 className={styles.heading}>{t.honeymoon.heading}</h2>
        <p className={styles.intro}>{t.honeymoon.intro}</p>
      </div>

      <div className={styles.timeline}>
        {destinations.map((dest, index) => {
          const destTranslations =
            t.honeymoon.destinations[dest.cityKey as keyof typeof t.honeymoon.destinations];
          return (
            <div key={dest.cityKey} className={styles.timelineItem}>
              <DestinationCard
                cityKey={dest.cityKey}
                descriptionKey={dest.cityKey}
                travelMode={dest.travelModeFromPrev}
                photoSrc={dest.photoSrc}
                photoAlt={destTranslations?.photoAlt ?? dest.cityKey}
                index={index}
                hidePhoto={index === 0 || ['denver', 'glenwoodSprings', 'saltLakeCity', 'truckee'].includes(dest.cityKey)}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.mapWrapper}>
        <MapErrorBoundary
          fallback={<p className={styles.mapFallback}>{t.honeymoon.fallback}</p>}
        >
          <TripMap stops={stops} t={t} />
        </MapErrorBoundary>
      </div>
    </section>
  );
}
