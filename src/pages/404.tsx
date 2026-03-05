import * as React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/layout';
import Seo from '../components/seo';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
    </Layout>
  );
};

export const Head = () => <Seo title="404" />;

export default NotFoundPage;

export const query = graphql`
  query NotFoundPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
