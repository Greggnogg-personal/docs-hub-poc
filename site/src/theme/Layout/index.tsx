import React from 'react';
import LayoutOriginal from '@theme-original/Layout';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import ProductVersionBar from '../../components/ProductVersionBar';

export default function Layout(props: any): React.ReactElement {
  return (
    <LayoutOriginal {...props}>
      {/* Skip to main content for keyboard/screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Custom branded header — replaces Docusaurus navbar */}
      <Header />

      {/* Two-filter product + version selector bar */}
      <ProductVersionBar />

      <main id="main-content">
        {props.children}
      </main>

      {/* Custom branded footer */}
      <Footer />
    </LayoutOriginal>
  );
}
