import type { GatsbyNode } from "gatsby"
import { resolve } from "path"
import type { PostPagesQuery } from "../../graphql-types"

type Result = { errors?: any; data?: PostPagesQuery }

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { errors, data }: Result = await graphql(`
    query PostPages {
      allSanityPost {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (data) {
    data.allSanityPost.edges.forEach((edge) => {
      const { id, slug = {} } = edge.node
      const path = `/blog/${slug?.current}/`
      createPage({
        path: path,
        component: resolve("src/templates/post.tsx"),
        context: { id },
      })
    })
  } else {
    throw errors
  }
}
export default createPages
