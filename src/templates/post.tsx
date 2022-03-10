import { graphql, PageProps } from "gatsby"
import { SanityPost } from "../../graphql-types"
import BlockContent from "../components/blockContent"

export const query = graphql`
  query PostQuery($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      subtitle
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
      sanityPost: { title, subtitle, _rawBody },
    },
  } = props

  return (
    <div className="post">
      <div className="post-header">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="post-body">
        <BlockContent value={_rawBody} />
      </div>
    </div>
  )
}

export default PostPage
