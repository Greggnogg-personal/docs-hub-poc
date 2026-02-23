import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const KNOWN: readonly string[] = ['community', 'enterprise', 'cloud', 'airgap'];

interface Props {
  editions: string[];
}

export default function ProductPills({ editions }: Props): React.ReactElement | null {
  const valid = editions.filter(e => KNOWN.includes(e.toLowerCase()));
  if (!valid.length) return null;

  return (
    <div className={styles.pillBar} role="list" aria-label="Available in editions">
      {valid.map(e => {
        const key = e.toLowerCase();
        return (
          <span
            key={key}
            role="listitem"
            className={clsx(styles.pill, styles[`pill-${key}`])}
            title={`Available in ${e.charAt(0).toUpperCase() + e.slice(1)} edition`}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </span>
        );
      })}
    </div>
  );
}
