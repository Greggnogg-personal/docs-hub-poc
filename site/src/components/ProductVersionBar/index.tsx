import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import styles from './styles.module.css';
import productsVersions from './productsVersions.json';


function sortVersions(versions: string[]): string[] {
  // Sort descending, semver-aware (basic)
  return versions.slice().sort((a, b) => {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] || 0;
      const nb = pb[i] || 0;
      if (na !== nb) return nb - na;
    }
    return 0;
  });
}

const PRODUCTS = productsVersions.map((p: { product: string; versions: string[] }) => ({ label: p.product, value: p.product }));
const VERSIONS: Record<string, { label: string; value: string }[]> = {};
productsVersions.forEach((p: { product: string; versions: string[] }) => {
  const sorted = sortVersions(p.versions);
  VERSIONS[p.product] = sorted.map((v: string) => ({ label: v, value: v }));
});

/** Parse /docs/{product}/{version}/{...rest} */
function parsePath(pathname: string): { product: string; version: string; rest: string } {
  const m = pathname.match(/^\/docs\/([^/]+)\/([^/]*)(\/.*)?$/);
  return {
    product: m?.[1] ?? '',
    version: m?.[2] ?? '',
    rest:    m?.[3] ?? '',
  };
}


export default function ProductVersionBar(): React.ReactElement | null {
  const location  = useLocation();
  const history = useHistory();
  const { product, version } = parsePath(location.pathname);

  // Find default version: prefer 'latest', else highest.
  // Returns '' if the product has no versions (fall back to product overview page).
  function getDefaultVersion(prod: string): string {
    const vers = VERSIONS[prod]?.map(v => v.value) || [];
    if (vers.includes('latest')) return 'latest';
    return vers[0] || '';
  }

  // Returns true when the product has a 'latest' folder; false means we
  // should land on the product-root overview page instead.
  function hasLatest(prod: string): boolean {
    return (VERSIONS[prod]?.map(v => v.value) || []).includes('latest');
  }

  const [selectedProduct, setSelectedProduct] = useState(product || PRODUCTS[0]?.value || '');
  const [selectedVersion, setSelectedVersion] = useState(() => {
    if (version && version !== '') return version;
    return getDefaultVersion(product || PRODUCTS[0]?.value || '');
  });

  // Sync selectors when URL changes (back/forward navigation)
  useEffect(() => {
    const { product: p, version: v } = parsePath(location.pathname);
    setSelectedProduct(p || PRODUCTS[0]?.value || '');
    setSelectedVersion(v || getDefaultVersion(p || PRODUCTS[0]?.value || ''));
  }, [location.pathname]);


  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prod = e.target.value;
    setSelectedProduct(prod);
    // If the product has a 'latest' folder, go there; otherwise land on the
    // product-root overview page at /docs/{product}/
    if (hasLatest(prod)) {
      setSelectedVersion('latest');
      setTimeout(() => history.push(`/docs/${prod}/latest/`), 0);
    } else {
      setSelectedVersion(getDefaultVersion(prod));
      setTimeout(() => history.push(`/docs/${prod}/`), 0);
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ver = e.target.value;
    // Always navigate, even if the value matches the current state
    setSelectedVersion(ver);
    setTimeout(() => {
      history.push(`/docs/${selectedProduct}/${ver}/`);
    }, 0);
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
