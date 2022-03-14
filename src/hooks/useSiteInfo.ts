import { useStaticQuery, graphql } from "gatsby"
import { SanitySiteInfoConnection, SanityImageAsset } from "../../graphql-types"

export type SiteInfo = {
  title: string
  keywords: string[]
  description: string
  logo: {
    asset: SanityImageAsset | undefined | null
    alt: string
  }
}

export const useSiteInfo = (): SiteInfo => {
  const result = useStaticQuery<{
    allSanitySiteInfo: SanitySiteInfoConnection
  }>(graphql`
    query SiteInfoQuery {
      allSanitySiteInfo {
        nodes {
          keywords
          title
          description
          logo {
            asset {
              gatsbyImageData(width: 80, placeholder: NONE)
              id
            }
            alt
          }
        }
      }
    }
  `)

  if (result.allSanitySiteInfo.nodes.length == 1) {
    const node = result.allSanitySiteInfo.nodes[0]
    return {
      keywords: (node.keywords as string[]) || [],
      title: (node.title as string) || "",
      description: (node.description as string) || "",
      logo: {
        asset: node.logo?.asset,
        alt: node.logo?.alt || "",
      },
    }
  } else {
    throw new Error("Unable to retrieve SiteInfo")
  }
}
