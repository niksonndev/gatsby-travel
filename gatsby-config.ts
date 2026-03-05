import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  pathPrefix: '/gatsby-travel',
  siteMetadata: {
    title: `Gatsby Travel`,
    description: `Travel website showcasing the best travel destinations and deals online.`,
    author: `Nikson Rotondaro`,
    siteUrl: `https://niksonndev.github.io/gatsby-travel`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `videos`,
        path: `${__dirname}/src/assets/videos`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        languages: [`pt`, `es`, `en`],
        defaultLanguage: `pt`,
        siteUrl: `https://niksonndev.github.io/gatsby-travel`,
        i18nextOptions: {
          defaultNS: `common`,
          ns: [`common`],
          fallbackLng: `pt`,
          interpolation: {
            escapeValue: false,
          },
        },
        localesDir: `locales`,
      },
    },
  ],
};

export default config;
