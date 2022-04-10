import "./galleryListPage.css"
import { graphql, PageProps } from "gatsby"
import { SanityPage, SanityGalleryConnection } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import BackgroundImage from "../components/backgroundImage"
import GalleryList from "../components/galleryList"

export const galleryListPageQuery = graphql`
  query GalleryListPageQuery($id: String!) {
    sanityPage(id: { eq: $id }) {
      title
      _rawBody
      mainImage {
        ...ImageWithPreview
        alt
      }
    }
    allSanityGallery(sort: { fields: _updatedAt, order: DESC }) {
      nodes {
        id
        title
        subtitle
        _rawDescription
        images {
          ...ImageWithPreview
          alt
        }
        slug {
          current
        }
      }
    }
  }
`
type GalleryListPageProps = PageProps<{
  sanityPage: SanityPage
  allSanityGallery: SanityGalleryConnection
}>

const GalleryListPage = (props: GalleryListPageProps) => {
  const {
    data: {
      sanityPage: { title, _rawBody, mainImage },
      allSanityGallery: { nodes },
    },
  } = props

  return (
    <BackgroundImage className="gallery-list-page" image={mainImage!}>
      <h1 className="gallery-list-page-title">{title}</h1>
      <div className="gallery-list-page-body">
        <BlockContent value={_rawBody} />
      </div>
      <GalleryList galleries={nodes} />
    </BackgroundImage>
  )
}
export default GalleryListPage
