import { graphql, PageProps } from "gatsby"
import { SanityPost } from "../../graphql-types"
import BlockContent from "../components/blockContent"

export const query = graphql`
  query PostQuery($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      author {
        name
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`
type PostPageProps = PageProps<{ sanityPost: SanityPost }>

const PostPage = (props: PostPageProps) => {
  const {
    data: {
      sanityPost: { title, author, _rawBody },
    },
  } = props

  return (
    <div>
      <h1>{title}</h1>
      <div>{author?.name}</div>
      <BlockContent value={_rawBody} />
    </div>
  )
}

export default PostPage
