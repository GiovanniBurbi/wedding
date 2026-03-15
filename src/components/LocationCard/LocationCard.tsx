import styles from './LocationCard.module.css';

interface LocationCardProps {
  venueName: string;
  address: string;
  time?: string;
  mapsUrl: string;
  mapsLinkText?: string;
}

export default function LocationCard({
  venueName,
  address,
  time,
  mapsUrl,
  mapsLinkText = 'View on Google Maps',
}: LocationCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.venueName}>{venueName}</h3>
      {time && <p className={styles.time}>{time}</p>}
      <p className={styles.address}>{address}</p>
      <a
        className={styles.mapsLink}
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {mapsLinkText}
      </a>
    </div>
  );
}
