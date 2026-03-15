import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { copyToClipboard } from '../../utils/clipboard';
import styles from './IbanDisplay.module.css';

interface IbanDisplayProps {
  iban: string;
  swift: string;
  accountOwner: string;
  accountOwnerLabel?: string;
  copiedText?: string;
  copyLabel?: string;
}

interface FieldState {
  copied: boolean;
}

export default function IbanDisplay({
  iban,
  swift,
  accountOwner,
  accountOwnerLabel = 'Account Owner',
  copiedText = 'Copied!',
  copyLabel = 'Copy',
}: IbanDisplayProps) {
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>({});

  const handleCopy = useCallback(async (fieldName: string, value: string) => {
    const success = await copyToClipboard(value);

    if (success) {
      setFieldStates((prev) => ({ ...prev, [fieldName]: { copied: true } }));

      setTimeout(() => {
        setFieldStates((prev) => ({ ...prev, [fieldName]: { copied: false } }));
      }, 2000);
    }
  }, []);

  const fields = [
    { label: 'IBAN', sublabel: 'EUR & CAD', value: iban, key: 'iban' },
    { label: accountOwnerLabel, value: accountOwner, key: 'accountOwner' },
    { label: 'SWIFT/BIC', value: swift, key: 'swift' },
  ];

  return (
    <div className={styles.container}>
      {fields.map(({ label, sublabel, value, key }) => (
        <div key={key} className={styles.field}>
          <span className={styles.label}>
            {label}
            {sublabel && <span className={styles.sublabel}> ({sublabel})</span>}
          </span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{value}</span>
            <div className={styles.copyWrapper}>
              <button
                className={styles.copyButton}
                onClick={() => handleCopy(key, value)}
                aria-label={`${copyLabel} ${label}`}
                type="button"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              {fieldStates[key]?.copied && (
                <span className={styles.tooltip} role="status">
                  {copiedText}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
