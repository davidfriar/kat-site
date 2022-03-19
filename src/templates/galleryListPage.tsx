import "./galleryListPage.css"
import { graphql, PageProps } from "gatsby"
import { SanityPage, SanityGalleryConnection } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import Image from "../components/image"
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
    allSanityGallery {
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
    <div className="gallery-list-page">
      <h1 className="gallery-list-page-title">{title}</h1>
      {mainImage ? (
        <Image image={mainImage} className="background-image" />
      ) : null}
      <div className="gallery-list-page-body">
        <BlockContent value={_rawBody} />
      </div>
      <GalleryList galleries={nodes} />
    </div>
  )
}
export default GalleryListPage
