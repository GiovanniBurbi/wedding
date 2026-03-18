import { useCallback, useState, useEffect, useRef } from 'react';
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
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Scroll spy
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Return focus to hamburger when menu closes
  useEffect(() => {
    if (!isOpen) {
      hamburgerRef.current?.focus();
    }
  }, [isOpen]);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    },
    []
  );

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <nav className={styles.nav} aria-label="Wedding sections">
      {/* Desktop links */}
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <a
              href={`#${section.id}`}
              className={`${styles.link} ${activeSection === section.id ? styles.active : ''}`}
              onClick={(e) => scrollTo(e, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu — portaled to body to avoid z-index issues */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`${styles.mobileMenu} ${isOpen ? styles.menuOpen : ''}`}
            aria-hidden={!isOpen}
          >
            <button
              ref={hamburgerRef}
              className={styles.hamburger}
              onClick={toggle}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              type="button"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>

            <div className={styles.overlay} onClick={close} />

            <ul ref={menuRef} className={styles.mobileList} role="menu">
              {sections.map((section, i) => (
                <li
                  key={section.id}
                  className={styles.mobileItem}
                  style={{ '--item-index': i } as React.CSSProperties}
                  role="none"
                >
                  <a
                    href={`#${section.id}`}
                    role="menuitem"
                    className={`${styles.mobileLink} ${activeSection === section.id ? styles.active : ''}`}
                    onClick={(e) => scrollTo(e, section.id)}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </nav>
  );
}
