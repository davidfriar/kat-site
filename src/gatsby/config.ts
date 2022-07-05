import type { GatsbyConfig } from "gatsby"

if (process.env.STAGING) {
  require("dotenv").config({
    path: `.env.staging`,
  })
} else {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
}

const sanity = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID || "n1f1x37f",
  dataset: process.env.GATSBY_SANITY_DATASET || "production",
}

const isProd = process.env.NODE_ENV === "production"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `kat-site`,
    siteUrl: `https://beatsnrotationspm.com/`,
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
        fonts: [
          `Exo\:700`,
          `Open Sans\:400,400i,700,700i`,
          `Averia Sans Libre\:400`,
          // `Permanent Marker\:400`,
        ],
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
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        ...sanity,
        customImageTypes: ["SanityCustomImage"],
        defaultImageConfig: {
          quality: 75,
          fit: "fillmax",
          auto: "format",
        },
      },
    },
    // {
    // resolve: "gatsby-plugin-graphql-codegen",
    // options: {
    //   documentPaths: [
    //     "./src/**/*.{ts,tsx}",
    //     "./.cache/fragments/*.js",
    //     "./node_modules/gatsby-*/**/*.js",
    //     "./.cache/fragments/gatsby-plugin-sanity-image.js",
    //   ],
    //   failOnError: false,
    // },
    // },
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
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
            {
               allSitePage {
                 nodes {
                   path
                 }
               }
            }
           `,
        resolvePages: ({ allSitePage: { nodes: allPages } }: any) => {
          return allPages.map((page: any) => {
            return { ...page }
          })
        },
        resolveSiteUrl: () => "https://beatsnrotationspm.com",
        serialize: ({ path }: any) => {
          return {
            url: path,
          }
        },
      },
    },
    {
      resolve: "gatsby-plugin-goatcounter",
      options: {
        code: process.env.GOATCOUNTER_CODE,
      },
    },
  ],
}

export default config
