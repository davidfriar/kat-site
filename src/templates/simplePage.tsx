import "./simplePage.css"
import { graphql, PageProps } from "gatsby"
import { SanityPage } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import BackgroundImage from "../components/backgroundImage"

export const simplePageQuery = graphql`
  query SimplePageQuery($id: String!) {
    sanityPage(id: { eq: $id }) {
      title
      subtitle
      _rawBody
      mainImage {
        ...ImageWithPreview
        alt
      }
    }
  }
`

type SimplePageProps = PageProps<{ sanityPage: SanityPage }>
const SimplePage = ({ data: { sanityPage: page } }: SimplePageProps) => {
  return (
    <BackgroundImage className="simple-page" image={page.mainImage!}>
      <h1>{page.title}</h1>
      <h2>{page.subtitle}</h2>
      <div className="simple-page-body">
        <BlockContent value={page._rawBody} />
      </div>
    </BackgroundImage>
  )
}
export default SimplePage
