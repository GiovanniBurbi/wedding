import weddingConfig from '../../config/weddingConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import IbanDisplay from '../IbanDisplay/IbanDisplay';
import giftBackground from '../../assets/gift-background.jpg';
import styles from './GiftSection.module.css';

export default function GiftSection() {
  const { iban, swift, accountOwner } = weddingConfig.gift;
  const { t } = useLanguage();

  return (
    <section
      id="gift"
      className={styles.section}
      style={{ '--gift-bg-image': `url(${giftBackground})` } as React.CSSProperties}
    >
      <div className={styles.card}>
        <h2 className={styles.heading}>{t.gift.heading}</h2>
        <div className={styles.content}>
          <p className={styles.message}>{t.gift.message}</p>
          <div className={styles.bankDetails}>
            <IbanDisplay
              iban={iban}
              swift={swift}
              accountOwner={accountOwner}
              accountOwnerLabel={t.gift.accountOwner}
              copiedText={t.gift.copied}
              copyLabel={t.gift.copyLabel}
            />
          </div>
          <p className={styles.thankYou}>{t.footer.thankYou}</p>
        </div>
      </div>
    </section>
  );
}
