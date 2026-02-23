import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function BackToTop(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      className={styles.btn}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18">
        <path d="M10 15V5M10 5l-4 4M10 5l4 4"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
