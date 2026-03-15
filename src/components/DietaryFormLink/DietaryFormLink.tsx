import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './DietaryFormLink.module.css';

interface DietaryFormLinkProps {
  formUrl: string;
  label?: string;
}

export default function DietaryFormLink({ formUrl, label = 'RSVP & Dietary Needs' }: DietaryFormLinkProps) {
  return (
    <a
      className={styles.link}
      href={formUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faEnvelope} /> {label}
    </a>
  );
}
