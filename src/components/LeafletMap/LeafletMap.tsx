import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import type { Translations } from '../../i18n/translations';
import styles from './LeafletMap.module.css';

// Fix default marker icon issue with bundlers (Vite/Webpack)
// Use explicit icon definition to avoid broken asset paths
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LeafletMapProps {
  markers: Array<{
    position: [number, number];
    label: string;
    mapsUrl: string;
  }>;
  t: Translations;
}

export default function LeafletMap({ markers, t }: LeafletMapProps) {
  const [route, setRoute] = useState<[number, number][]>([]);

  // Fetch driving route from OSRM when we have at least 2 markers
  useEffect(() => {
    if (markers.length < 2) return;

    const [from, to] = markers;
    const url = `https://router.project-osrm.org/route/v1/driving/${from.position[1]},${from.position[0]};${to.position[1]},${to.position[0]}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.routes?.[0]?.geometry?.coordinates) {
          // GeoJSON is [lng, lat], Leaflet needs [lat, lng]
          const coords: [number, number][] = data.routes[0].geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
          );
          setRoute(coords);
        }
      })
      .catch(() => {
        // Silently fail — route is a nice-to-have
      });
  }, [markers]);

  // Center between markers with a fixed zoom that shows both comfortably
  const center: [number, number] =
    markers.length > 0
      ? [
          markers.reduce((sum, m) => sum + m.position[0], 0) / markers.length,
          markers.reduce((sum, m) => sum + m.position[1], 0) / markers.length,
        ]
      : [0, 0];

  return (
    <MapContainer
      center={center}
      zoom={13}
      className={styles.mapContainer}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {route.length > 0 && (
        <>
          <Polyline
            positions={route}
            pathOptions={{ color: '#2563eb', weight: 5, opacity: 0.9, dashArray: '8, 6' }}
          />
          <Marker
            position={route[Math.floor(route.length / 2)]}
            icon={L.divIcon({
              className: styles.hiddenIcon,
              iconSize: [0, 0],
            })}
          >
            <Tooltip direction="top" permanent offset={[0, 0]}>
              <FontAwesomeIcon icon={faCar} /> {t.map.driveTime}
            </Tooltip>
          </Marker>
        </>
      )}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={defaultIcon}>
          <Tooltip direction="top" permanent offset={[0, -42]}>
            {marker.label}
          </Tooltip>
          <Popup>
            <div className={styles.popup}>
              <p className={styles.popupLabel}>{marker.label}</p>
              <a
                className={styles.popupLink}
                href={marker.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.map.openInMaps}
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
