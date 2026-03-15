import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import type { Translations } from '../../i18n/translations';
import styles from './TripMap.module.css';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface TripStop {
  position: [number, number];
  labelKey: string;
  travelModeFromPrev?: 'flight' | 'train' | 'drive';
}

export interface TripMapProps {
  stops: TripStop[];
  t: Translations;
}

const polylineStyles: Record<string, L.PathOptions> = {
  flight: { color: '#c9a96e', weight: 3, opacity: 0.8, dashArray: '12, 8' },
  train: { color: '#b8943e', weight: 3, opacity: 0.8, dashArray: '4, 8' },
  drive: { color: '#6b6b6b', weight: 3, opacity: 0.8 },
};

const planeIcon = L.divIcon({
  html: '<span style="font-size:36px;color:#f5f0eb;display:inline-block;transform:scaleX(-1)">✈</span>',
  className: styles.vehicleIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

function FitBoundsHelper({ stops }: { stops: TripStop[] }) {
  const map = useMap();

  useEffect(() => {
    if (stops.length === 0) return;
    const bounds = L.latLngBounds(stops.map((s) => s.position));
    const isMobile = window.innerWidth < 768;
    map.fitBounds(bounds, { padding: isMobile ? [20, 20] : [40, 40], maxZoom: isMobile ? 2 : 4 });
  }, [map, stops]);

  return null;
}

export default function TripMap({ stops, t }: TripMapProps) {
  const destinations = t.honeymoon.destinations as Record<
    string,
    { name: string; description: string; photoAlt: string }
  >;

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      className={styles.mapContainer}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBoundsHelper stops={stops} />
      {stops.map((stop) => (
        <Marker key={stop.labelKey} position={stop.position} icon={defaultIcon}>
          <Popup>{destinations[stop.labelKey]?.name ?? stop.labelKey}</Popup>
        </Marker>
      ))}
      {stops.slice(1).map((stop, i) => {
        const prev = stops[i];
        const mode = stop.travelModeFromPrev ?? 'drive';
        const isTransatlantic = prev.labelKey === 'rome';
        const midpoint: [number, number] = [
          (prev.position[0] + stop.position[0]) / 2,
          (prev.position[1] + stop.position[1]) / 2,
        ];
        return (
          <span key={`${prev.labelKey}-${stop.labelKey}`}>
            <Polyline
              positions={[prev.position, stop.position]}
              pathOptions={polylineStyles[mode]}
            />
            {isTransatlantic && (
              <Marker position={midpoint} icon={planeIcon} />
            )}
          </span>
        );
      })}
    </MapContainer>
  );
}
