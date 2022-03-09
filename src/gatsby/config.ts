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
  ],
}

export default config
