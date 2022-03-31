import { useStaticQuery, graphql } from "gatsby"
import {
  SanitySiteInfoConnection,
  SanityCustomImage,
} from "../../graphql-types"

export type SiteInfo = {
  title: string
  keywords: string[]
  description: string
  logo: SanityCustomImage
  footer: string
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
            ...ImageWithPreview
            alt
          }
          footer
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
      logo: node.logo as SanityCustomImage,
      footer: node.footer as string,
    }
  } else {
    throw new Error("Unable to retrieve SiteInfo")
  }
}
