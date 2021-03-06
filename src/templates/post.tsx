import { graphql, PageProps } from "gatsby"
import { SanityPost } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import SEO from "../components/seo"
import Social from "../components/social"
import "./post.css"

export const query = graphql`
  query PostQuery($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      subtitle
      summary
      publishedAt(formatString: "Do MMMM YYYY")
      mainImage {
        ...ImageWithPreview
        alt
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`
type PostPageProps = PageProps<{ sanityPost: SanityPost }>

const PostPage = (props: PostPageProps) => {
  const {
    data: {
      sanityPost: {
        title,
        subtitle,
        summary,
        publishedAt,
        mainImage,
        _rawBody,
      },
    },
    location,
  } = props

  return (
    <>
      <SEO title={title} description={summary} image={mainImage} />
      <div className="post">
        <div className="post-header">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
        <div className="post-body">
          <h5 className="post-date">{publishedAt}</h5>
          <BlockContent value={_rawBody} />
        </div>
        <Social link={location.href} image={mainImage!} />
      </div>
    </>
  )
}

export default PostPage
