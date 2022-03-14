import type { GatsbyConfig } from "gatsby"

const sanity = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID || "n1f1x37f",
  dataset: process.env.GATSBY_SANITY_DATASET || "production",
}

const isProd = process.env.NODE_ENV === "production"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `kat-site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        extensions: ["js", "jsx", "ts", "tsx"],
        exclude: ["node_modules", ".cache", "public"],
        stages: ["develop"],
        emitWarning: true,
        failOnError: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Exo\:700`, `Open Sans\:400,400i,700,700i`],
        display: "swap",
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    "gatsby-plugin-graphql-codegen",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography/typography.ts`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `beatsnrotationspm`,
        short_name: `bnrpm`,
        start_url: `/`,
        background_color: `black`,
        theme_color: `#65ffb4`,
        display: `standalone`,
        icon: `src/images/icon.svg`,
      },
    },
  ],
}

export default config
