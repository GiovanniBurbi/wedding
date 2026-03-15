import { Component, type ReactNode, type ErrorInfo } from 'react';
import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Translations } from '../../i18n/translations';
import LocationCard from '../LocationCard/LocationCard';
import LeafletMap from '../LeafletMap/LeafletMap';
import styles from './MapSection.module.css';

const { ceremony, party } = weddingConfig.schedule;

const markers = [
  {
    position: ceremony.coordinates,
    label: ceremony.venueName,
    mapsUrl: ceremony.mapsUrl,
  },
  {
    position: party.coordinates,
    label: party.venueName,
    mapsUrl: party.mapsUrl,
  },
];

interface MapErrorBoundaryProps {
  children: ReactNode;
  t: Translations;
}

interface MapErrorBoundaryState {
  hasError: boolean;
}

class MapErrorBoundary extends Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): MapErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Map failed to load:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p className={styles.fallbackMessage}>{this.props.t.map.fallback}</p>
          <div className={styles.fallbackGrid}>
            <LocationCard
              venueName={ceremony.venueName}
              address={ceremony.address}
              time={ceremony.time}
              mapsUrl={ceremony.mapsUrl}
              mapsLinkText={this.props.t.map.viewOnMaps}
            />
            <LocationCard
              venueName={party.venueName}
              address={party.address}
              mapsUrl={party.mapsUrl}
              mapsLinkText={this.props.t.map.viewOnMaps}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function MapSection() {
  const { t } = useLanguage();

  return (
    <section id="map" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t.map.heading}</h2>
        <MapErrorBoundary t={t}>
          <LeafletMap markers={markers} t={t} />
        </MapErrorBoundary>
      </div>
    </section>
  );
}
