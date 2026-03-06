import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Footer from './Footer';
import Header from './header';
import { GlobalStyle } from './styles/GlobalStyles';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <>
      <GlobalStyle />
      <a href="#main-content" className="sr-only sr-only-focusable">
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
