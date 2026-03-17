import { useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Navigation.module.css';

interface NavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
}

export default function Navigation({ sections }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setIsOpen(false);
      // Small delay to let body scroll lock release before scrolling
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    },
    []
  );

  const mobileMenu = (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        type="button"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <ul className={`${styles.mobileList} ${isOpen ? styles.listOpen : ''}`}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <a
              href={`#${section.id}`}
              className={styles.mobileLink}
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <nav className={styles.nav} aria-label="Wedding sections">
      {createPortal(mobileMenu, document.body)}

      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <a
              href={`#${section.id}`}
              className={styles.link}
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
