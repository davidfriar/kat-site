import { graphql, PageProps } from "gatsby"
import { SanityPost } from "../../graphql-types"
import BlockContent from "../components/blockContent"

export const query = graphql`
  query PostQuery($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      summary
      mainImage {
        alt
        asset {
          gatsbyImageData(fit: FILLMAX)
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`
type PostPageProps = PageProps<{ sanityPost: SanityPost }>

const PostPage = (props: PostPageProps) => {
  const {
    data: {
      sanityPost: { title, _rawBody },
    },
  } = props

  return (
    <div className="post">
      <h1>{title}</h1>
      <div className="post-body">
        <BlockContent value={_rawBody} />
      </div>
    </div>
  )
}

export default PostPage
