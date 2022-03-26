import { useStaticQuery, graphql } from "gatsby"
import { SanityPostConnection, SanityPost } from "../../graphql-types"

export const usePosts = (): Array<SanityPost> => {
  const result = useStaticQuery<{
    allSanityPost: SanityPostConnection
  }>(graphql`
    query Posts {
      allSanityPost {
        nodes {
          id
          slug {
            current
          }
          title
          subtitle
          summary
          mainImage {
            ...ImageWithPreview
            alt
          }
        }
      }
    }
  `)

  return result.allSanityPost.nodes
}
