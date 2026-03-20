import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import { useScrollReveal } from '../../utils/useScrollReveal';
import styles from './FaqSection.module.css';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button
        className={styles.question}
        onClick={toggle}
        aria-expanded={open}
        type="button"
      >
        <span>{question}</span>
        <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
      </button>
      <div className={styles.answerWrapper}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const { t } = useLanguage();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <section id="faq" className={styles.section}>
      <h2 ref={headingRef} className={`${styles.heading} reveal-fade-up`}>
        {t.faq.heading}
      </h2>
      <div className={styles.list}>
        {t.faq.items.map((item, i) => (
          <FaqItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
