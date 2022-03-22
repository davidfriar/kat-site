import { useStaticQuery, graphql } from "gatsby"
import {
  SanityHomePageConnection,
  SanityCustomImage,
} from "../../graphql-types"

export type HomePage = {
  title: string
  body: {}
  mainImage: SanityCustomImage
  backgroundImage: SanityCustomImage
}

export const useHomePage = (): HomePage => {
  const result = useStaticQuery<{
    allSanityHomePage: SanityHomePageConnection
  }>(graphql`
    query HomePageQuery {
      allSanityHomePage {
        nodes {
          title
          _rawBody(resolveReferences: { maxDepth: 10 })
          mainImage {
            ...ImageWithPreview
            alt
          }
          backgroundImage {
            ...ImageWithPreview
            alt
          }
        }
      }
    }
  `)

  if (result.allSanityHomePage.nodes.length == 1) {
    const node = result.allSanityHomePage.nodes[0]
    return {
      title: (node.title as string) || "",
      body: node._rawBody || {},
      mainImage: node.mainImage as SanityCustomImage,
      backgroundImage: node.backgroundImage as SanityCustomImage,
    }
  } else {
    throw new Error("Unable to retrieve HomePage")
  }
}
