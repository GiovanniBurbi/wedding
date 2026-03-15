import styles from './PhotoPlaceholder.module.css';

interface PhotoPlaceholderProps {
  src?: string;
  alt?: string;
  aspectRatio?: string;
}

export default function PhotoPlaceholder({
  src,
  alt = '',
  aspectRatio = '4/3',
}: PhotoPlaceholderProps) {
  if (src) {
    return (
      <div className={styles.wrapper} style={{ aspectRatio }}>
        <img className={styles.image} src={src} alt={alt} />
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
