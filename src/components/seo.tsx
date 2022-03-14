import { Helmet } from "react-helmet"
import { useSiteInfo } from "../hooks/useSiteInfo"
import type { SanityCustomImage } from "../../graphql-types"
import type { IGatsbyImageData } from "gatsby-plugin-image"

type SEOProps = {
  title?: string | null
  description?: string | null
  image?: SanityCustomImage | null
}

const SEO = ({ title, description, image }: SEOProps) => {
  const siteInfo = useSiteInfo()
  const desc = description || siteInfo.description
  const imageData = image?.asset?.gatsbyImageData as IGatsbyImageData
  const imageSrc = imageData?.images.fallback?.src
  const theTitle = title || siteInfo.title

  type MetaProps = JSX.IntrinsicElements["meta"]
  const meta: MetaProps[] = [
    {
      name: "description",
      content: desc,
    },
    {
      name: "keywords",
      content: siteInfo.keywords.join(),
    },
    {
      property: `og:title`,
      content: theTitle,
    },
    {
      property: `og:description`,
      content: desc,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:creator`,
      content: "TO DO",
    },
    {
      name: `twitter:title`,
      content: theTitle,
    },
    {
      name: `twitter:description`,
      content: desc,
    },
  ].concat(
    imageSrc
      ? [
          {
            property: "og:image",
            content: imageSrc,
          },
          {
            property: "og:image:width",
            content: `${imageData.width}`,
          },
          {
            property: "og:image:height",
            content: `${imageData.height}`,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ]
      : [
          {
            name: "twitter:card",
            content: "summary",
          },
        ]
  )

  return <Helmet title={theTitle} htmlAttributes={{ lang: "en" }} meta={meta} />
}

export default SEO
