import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

const PRODUCTS: { label: string; value: string }[] = [
  { label: 'NetBox Community', value: 'netbox' },
  { label: 'NetBox Cloud',     value: 'cloud' },
  { label: 'NetBox Enterprise',value: 'enterprise' },
  { label: 'Discovery',        value: 'discovery' },
  { label: 'Assurance',        value: 'assurance' },
];

// Versions per product — expand as needed
const VERSIONS: Record<string, { label: string; value: string }[]> = {
  netbox:     [{ label: 'Latest', value: 'latest' }, { label: 'v4.1', value: 'v4.1' }, { label: 'v4.0', value: 'v4.0' }],
  cloud:      [{ label: 'Latest', value: 'latest' }],
  enterprise: [{ label: 'Latest', value: 'latest' }],
  discovery:  [{ label: 'Latest', value: 'latest' }],
  assurance:  [{ label: 'Latest', value: 'latest' }],
};

/** Parse /docs/{product}/{version}/{...rest} */
function parsePath(pathname: string): { product: string; version: string; rest: string } {
  const m = pathname.match(/^\/docs\/([^/]+)\/([^/]*)(\/.*)?$/);
  return {
    product: m?.[1] ?? '',
    version: m?.[2] ?? 'latest',
    rest:    m?.[3] ?? '',
  };
}

export default function ProductVersionBar(): React.ReactElement | null {
  const location  = useLocation();
  const history   = useHistory();
  const { product, version } = parsePath(location.pathname);

  const [selectedProduct, setSelectedProduct] = useState(product || 'netbox');
  const [selectedVersion, setSelectedVersion] = useState(version || 'latest');

  // Sync selectors when URL changes (back/forward navigation)
  useEffect(() => {
    const { product: p, version: v } = parsePath(location.pathname);
    if (p) { setSelectedProduct(p); setSelectedVersion(v); }
  }, [location.pathname]);

  const navigate = useCallback((prod: string, ver: string) => {
    history.push(`/docs/${prod}/${ver}/`);
  }, [history]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prod = e.target.value;
    const ver  = VERSIONS[prod]?.[0]?.value ?? 'latest';
    setSelectedProduct(prod);
    setSelectedVersion(ver);
    navigate(prod, ver);
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ver = e.target.value;
    setSelectedVersion(ver);
    navigate(selectedProduct, ver);
  };

  return (
    <div className={styles.bar} role="navigation" aria-label="Product and version selector">
      <div className={styles.inner}>
        <span className={styles.docsLabel}>Docs</span>

        <div className={styles.selectors}>
          {/* Product selector */}
          <div className={styles.selectWrap}>
            <label htmlFor="product-select" className={styles.srOnly}>Product</label>
            <select
              id="product-select"
              className={styles.select}
              value={selectedProduct}
              onChange={handleProductChange}
              aria-label="Select product"
            >
              {PRODUCTS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            <svg className={styles.caret} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4.5 6l3.5 3.5L11.5 6" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <span className={styles.divider} aria-hidden="true">/</span>

          {/* Version selector */}
          <div className={styles.selectWrap}>
            <label htmlFor="version-select" className={styles.srOnly}>Version</label>
            <select
              id="version-select"
              className={styles.select}
              value={selectedVersion}
              onChange={handleVersionChange}
              aria-label="Select version"
              disabled={(VERSIONS[selectedProduct] ?? []).length <= 1}
            >
              {(VERSIONS[selectedProduct] ?? [{ label: 'Latest', value: 'latest' }]).map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
            <svg className={styles.caret} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4.5 6l3.5 3.5L11.5 6" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Breadcrumb slot — portal target for page-level breadcrumbs */}
        <div id="pvb-breadcrumb-slot" className={styles.breadcrumbSlot} aria-label="Breadcrumb" />
      </div>
    </div>
  );
}
