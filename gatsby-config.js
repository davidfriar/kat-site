/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `kat-site`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [

    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,{
       resolve: 'gatsby-source-sanity',
       options: {
         "projectId": "n1f1x37f",
         "dataset": "production"
      }
    }]
};
