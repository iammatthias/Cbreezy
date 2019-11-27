const dotenv = require('dotenv');

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config();
}

module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: 'gatsby-remark-images-contentful',
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    }
  ]
};
