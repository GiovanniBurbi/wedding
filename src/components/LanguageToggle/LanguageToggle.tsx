import { useLanguage } from '../../i18n/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className={styles.toggle}
      onClick={toggleLanguage}
      aria-label={language === 'en' ? "Passa all'italiano" : 'Switch to English'}
      type="button"
    >
      {language === 'en' ? (
        <>
          <img src="https://flagcdn.com/w40/gb.png" alt="English" className={styles.flag} />
          <span>EN</span>
        </>
      ) : (
        <>
          <img src="https://flagcdn.com/w40/it.png" alt="Italiano" className={styles.flag} />
          <span>IT</span>
        </>
      )}
    </button>
  );
}
