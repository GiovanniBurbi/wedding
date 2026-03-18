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
  const [activeSection, setActiveSection] = useState<string>('');

  // 1. Scroll Spy Logic: Detect which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      // This margin creates a "trigger zone" at the top of the viewport
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // 2. Lock body scroll when mobile menu is open
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
      
      // Small delay to let body scroll lock release for smoother animation
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
              className={`${styles.mobileLink} ${
                activeSection === section.id ? styles.active : ''
              }`}
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
      {/* Portals render the mobile menu at the body level to avoid Z-index issues */}
      {typeof document !== 'undefined' && createPortal(mobileMenu, document.body)}

      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <a
              href={`#${section.id}`}
              className={`${styles.link} ${
                activeSection === section.id ? styles.active : ''
              }`}
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