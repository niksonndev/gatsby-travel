import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Footer from './Footer';
import Header from './header';
import { GlobalStyle } from './styles/GlobalStyles';

interface SiteTitleQuery {
  site: {
    siteMetadata: {
      title?: string;
    };
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const data = useStaticQuery<SiteTitleQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata?.title ?? `Title`} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
