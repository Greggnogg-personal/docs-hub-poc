import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import TOC from '@theme/TOC';
import type { Props } from '@theme/DocItem/Layout';
import ProductPills from '../../../components/ProductPills';

import styles from './styles.module.css';

export default function DocItemLayout({ children }: Props): React.JSX.Element {
  const { metadata, frontMatter, toc } = useDoc();
  const hasToc = toc.length > 0;

  // Derive edition pills from tags in frontmatter
  const tags: string[] = (frontMatter as any).tags ?? [];
  const editions = tags.filter(t =>
    ['community', 'enterprise', 'cloud', 'airgap'].includes(t)
  );

  return (
    <div className={styles.docItemContainer}>
      <div className="row">
        {/* Main content column */}
        <div className={hasToc ? styles.docItemColWithToc : styles.docItemCol}>
          <DocVersionBanner />
          <div className={styles.docItemInner}>
            <DocBreadcrumbs />
            <DocVersionBadge />

            {/* Edition pills */}
            {editions.length > 0 && (
              <div className={styles.pillBar}>
                <ProductPills editions={editions} />
              </div>
            )}

            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </div>
          <DocItemPaginator />
        </div>

        {/* Right TOC column */}
        {hasToc && (
          <div className={styles.tocColumn}>
            <TOC toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />
          </div>
        )}
      </div>
    </div>
  );
}
