import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Email from '../components/Email';
import Hero from '../components/Hero';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Trips from '../components/Trips';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Seo title={t('nav.brand')} />
      <Hero />
      <Trips heading={t('trips.heading')} />
      <Testimonials />
      <Stats />
      <Email />
    </Layout>
  );
};

export default IndexPage;
