import React, { useState, useCallback, useRef } from 'react';
import styles from './styles.module.css';

interface Hit {
  url: string;
  title: string;
  excerpt?: string;
}

const ALGOLIA_APP_ID  = 'XCF0TW7MCD';
const ALGOLIA_API_KEY = 'a2b488046dfbbbf27aa204269640af66';
const ALGOLIA_INDEX   = 'netboxlabs';

async function searchAlgolia(query: string): Promise<Hit[]> {
  const res = await fetch(
    `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/query`,
    {
      method: 'POST',
      headers: {
        'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        'X-Algolia-API-Key': ALGOLIA_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ params: `query=${encodeURIComponent(query)}&hitsPerPage=12` }),
    }
  );

  if (!res.ok) return [];
  const data = await res.json();

  // Deduplicate by base URL (strip anchor)
  const seen = new Set<string>();
  const hits: Hit[] = [];

  for (const hit of data.hits ?? []) {
    const baseUrl = (hit.url as string).split('#')[0];
    if (seen.has(baseUrl)) continue;
    seen.add(baseUrl);
    hits.push({
      url:     hit.url,
      title:   hit.hierarchy?.lvl0 ?? hit.hierarchy?.lvl1 ?? hit._highlightResult?.content?.value ?? 'Result',
      excerpt: hit.hierarchy?.lvl1 ?? hit.content ?? '',
    });
    if (hits.length >= 8) break;
  }
  return hits;
}

export default function LandingPageSearch(): React.ReactElement {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);
  const debounce  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const search = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); setOpen(false); return; }
    setLoading(true);
    searchAlgolia(q).then(hits => {
      setResults(hits);
      setOpen(hits.length > 0);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => search(q), 280);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
    if (e.key === 'Enter' && query.trim()) search(query);
  };

  return (
    <div className={styles.wrapper} role="search">
      <div className={styles.inputWrap}>
        {/* Search icon */}
        <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          placeholder="Search documentation…"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Search documentation"
          aria-autocomplete="list"
          aria-controls={open ? 'search-results' : undefined}
          aria-expanded={open}
          autoComplete="off"
          spellCheck="false"
        />

        {loading && (
          <svg className={styles.spinner} viewBox="0 0 20 20" aria-label="Loading">
            <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeDasharray="32" strokeDashoffset="10" />
          </svg>
        )}

        {query && !loading && (
          <button className={styles.clearBtn} aria-label="Clear search"
                  onClick={() => { setQuery(''); setResults([]); setOpen(false); inputRef.current?.focus(); }}>
            ×
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <ul id="search-results" className={styles.results} role="listbox" aria-label="Search results">
          {results.map(hit => (
            <li key={hit.url} role="option">
              <a href={hit.url} className={styles.hit}
                 onClick={() => { setOpen(false); setQuery(''); }}>
                <span className={styles.hitTitle}>{hit.title}</span>
                {hit.excerpt && <span className={styles.hitExcerpt}>{hit.excerpt}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
