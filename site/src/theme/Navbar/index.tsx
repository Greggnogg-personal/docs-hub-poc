import React, { type ReactNode } from 'react';
import NavbarLayout from '@theme/Navbar/Layout';

// The real site header is injected via Theme/Layout.
// This shim renders only the Docusaurus navbar container (kept for
// mobile sidebar toggle wiring) but with no visible content.
export default function Navbar(): ReactNode {
  return <NavbarLayout><></></NavbarLayout>;
}
