import type { GatsbyNode } from "gatsby"
import { resolve } from "path"
import type {
  PostPagesQuery,
  PagesQuery,
  GalleryPagesQuery,
} from "../../graphql-types"

const createPostPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  type Result = { errors?: any; data?: PostPagesQuery }
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

const createGalleryPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  type Result = { errors?: any; data?: GalleryPagesQuery }
  const { errors, data }: Result = await graphql(`
    query GalleryPages {
      allSanityGallery {
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
    data.allSanityGallery.edges.forEach((edge) => {
      const { id, slug = {} } = edge.node
      const path = `/galleries/${slug?.current}/`
      createPage({
        path: path,
        component: resolve("src/templates/gallery.tsx"),
        context: { id },
      })
    })
  } else {
    throw errors
  }
}

const createOtherPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  type Result = { errors?: any; data?: PagesQuery }
  const { errors, data }: Result = await graphql(`
    query Pages {
      allSanityPage {
        nodes {
          slug {
            current
          }
          id
          pageType
          categories {
            id
          }
        }
      }
    }
  `)
  if (data) {
    data.allSanityPage.nodes.forEach((node) => {
      const { id, slug, categories, pageType } = node
      const path = `/${slug?.current}/`
      createPage({
        path: path,
        component: resolve(`src/templates/${pageType}.tsx`),
        context: {
          id,
          categories: categories?.map((cat) => cat?.id),
        },
      })
    })
  } else {
    throw errors
  }
}

const createPages: GatsbyNode["createPages"] = async (...args) => {
  await createPostPages(...args)
  await createGalleryPages(...args)
  await createOtherPages(...args)
}

export default createPages
