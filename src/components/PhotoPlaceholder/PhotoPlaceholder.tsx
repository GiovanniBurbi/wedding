import { useState } from 'react';
import styles from './PhotoPlaceholder.module.css';

interface PhotoPlaceholderProps {
  src?: string;
  alt?: string;
  aspectRatio?: string;
  eager?: boolean;
}

export default function PhotoPlaceholder({
  src,
  alt = '',
  aspectRatio = '4/3',
  eager=false
}: PhotoPlaceholderProps) {
  const [loaded, setLoaded] = useState(false);

  if (src) {
    return (
      <div className={styles.wrapper} style={{ aspectRatio }}>
        <img
          className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : "lazy"}
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.placeholder}
      style={{ aspectRatio }}
      role="img"
      aria-label={alt || 'Photo placeholder'}
    >
      <span className={styles.icon} aria-hidden="true">📷</span>
      <span className={styles.label}>Photo</span>
    </div>
  );
}
