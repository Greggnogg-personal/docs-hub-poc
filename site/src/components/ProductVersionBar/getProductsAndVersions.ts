import fs from 'fs';
import path from 'path';

export interface ProductVersion {
  label: string;
  value: string;
  versions: { label: string; value: string }[];
}

export function getProductsAndVersions(docsRoot: string): ProductVersion[] {
  const products: ProductVersion[] = [];
  if (!fs.existsSync(docsRoot)) return products;
  for (const product of fs.readdirSync(docsRoot)) {
    const productPath = path.join(docsRoot, product);
    if (!fs.statSync(productPath).isDirectory()) continue;
    const versions: { label: string; value: string }[] = [];
    for (const version of fs.readdirSync(productPath)) {
      const versionPath = path.join(productPath, version);
      if (fs.statSync(versionPath).isDirectory()) {
        versions.push({ label: version, value: version });
      }
    }
    products.push({ label: product, value: product, versions });
  }
  return products;
}
