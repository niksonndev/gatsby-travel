import * as React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/layout';
import Seo from '../components/seo';

const SecondPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('pageTwo.title')}</h1>
      <p>{t('pageTwo.description')}</p>
      <Link to="/">{t('pageTwo.backHome')}</Link>
    </Layout>
  );
};

export const Head = () => <Seo title="Page two" />;

export default SecondPage;
