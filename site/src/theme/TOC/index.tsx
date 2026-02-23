import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/TOC';
import styles from './styles.module.css';

export default function TOC({ className, toc, ...props }: Props): React.JSX.Element | null {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Restore pinned state from localStorage
  useEffect(() => {
    try {
      const pinned = localStorage.getItem('toc-pinned') === 'true';
      setIsPinned(pinned);
      setIsExpanded(pinned);
    } catch {}
  }, []);

  // Track active heading via IntersectionObserver
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll('article h2, article h3, article h4')
    );
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.5, 1] }
    );

    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const togglePin = () => {
    const next = !isPinned;
    setIsPinned(next);
    setIsExpanded(next);
    try { localStorage.setItem('toc-pinned', String(next)); } catch {}
  };

  if (!toc || toc.length === 0) return null;

  const renderItems = (items: readonly any[]) => (
    <ul className={styles.tocList}>
      {items.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={clsx(
              styles.tocItem,
              styles[`level${item.level}`],
              item.id === activeId && styles.active
            )}
            onClick={e => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {isExpanded ? item.value.replace(/<[^>]*>/g, '') : ''}
          </a>
          {item.children?.length > 0 && renderItems(item.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={clsx(styles.toc, isExpanded && styles.tocExpanded, className)}
      onMouseEnter={() => !isPinned && setIsExpanded(true)}
      onMouseLeave={() => !isPinned && setIsExpanded(false)}
    >
      {/* Pin / collapse toggle */}
      <button
        className={styles.tocToggle}
        onClick={togglePin}
        title={isPinned ? 'Unpin table of contents' : 'Pin table of contents'}
        aria-label={isPinned ? 'Unpin table of contents' : 'Pin table of contents'}
      >
        <span className={styles.tocIndicator} />
        {isExpanded && <span className={styles.tocLabel}>On this page</span>}
        <span className={styles.tocPin}>{isPinned ? '◀' : '▶'}</span>
      </button>

      {/* TOC items */}
      {renderItems(toc)}
    </div>
  );
}
