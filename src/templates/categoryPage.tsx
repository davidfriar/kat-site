import { graphql, PageProps } from "gatsby"
import { SanityPage, SanityPostConnection } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import Coverflow from "./coverflow"
import CardList from "./cardList"
import Image from "../components/image"
import "./categoryPage.css"

export const categoryPageQuery = graphql`
  query CategoryPageQuery($id: String!, $categories: [String]!) {
    sanityPage(id: { eq: $id }) {
      title
      _rawBody
      mainImage {
        alt
        asset {
          gatsbyImageData(fit: FILLMAX)
        }
      }
      template
    }
    allSanityPost(
      filter: { categories: { elemMatch: { id: { in: $categories } } } }
    ) {
      nodes {
        id
        title
        summary
        slug {
          current
        }
        mainImage {
          alt
          asset {
            gatsbyImageData(fit: FILLMAX)
          }
        }
      }
    }
  }
`

export type CategoryPageProps = PageProps<{
  sanityPage: SanityPage
  allSanityPost: SanityPostConnection
}>

const CategoryPage = (props: CategoryPageProps) => {
  const {
    data: {
      sanityPage: { title, _rawBody, mainImage, template },
      allSanityPost: { nodes },
    },
  } = props
  const PostList =
    {
      ["coverflow"]: Coverflow,
      ["cardlist"]: CardList,
    }[template as string] || CardList

  return (
    <div className={`category-page template-${template}`}>
      <h1>{title}</h1>
      {mainImage ? (
        <Image image={mainImage} className="background-image" />
      ) : null}
      <div className="category-page-body">
        <BlockContent value={_rawBody} />
      </div>
      <PostList posts={nodes} />
    </div>
  )
}

export default CategoryPage
