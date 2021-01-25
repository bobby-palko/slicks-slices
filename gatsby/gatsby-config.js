import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteURL: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
    twitter: '@slickSlices',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'wfifikqd',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};
