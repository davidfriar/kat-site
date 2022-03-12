import { graphql, PageProps } from "gatsby"
import { SanityGallery } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import Gallery from "react-photo-gallery"
import { PhotoProps } from "react-photo-gallery"
import { IGatsbyImageData } from "gatsby-plugin-image"
import "./gallery.css"
import SimpleReactLightBox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox"

export const query = graphql`
  query GalleryQuery($id: String!) {
    sanityGallery(id: { eq: $id }) {
      title
      subtitle
      _rawDescription
      images {
        asset {
          gatsbyImageData
        }
        alt
      }
    }
  }
`

type GalleryPageProps = PageProps<{ sanityGallery: SanityGallery }>

const GalleryPage = (props: GalleryPageProps) => {
  const {
    data: {
      sanityGallery: { title, subtitle, _rawDescription, images },
    },
  } = props

  const photos: PhotoProps[] =
    images?.map((image) => {
      const imageData = image?.asset?.gatsbyImageData as IGatsbyImageData
      return {
        src: imageData.images.fallback?.src as string,
        srcSet: imageData.images.fallback?.srcSet,
        sizes: imageData.images.fallback?.sizes,
        width: imageData.width,
        height: imageData.height,
        alt: image?.alt as string,
      }
    }) || []

  const targetRowHeight = (width: number) => {
    return width / 3
  }

  const lightboxOptions = {
    settings: {
      overlayColor: "black",
      slideAnimationType: "slide",
      autoplaySpeed: 10000,
    },
    buttons: {
      showDownloadButton: false,
      size: "50px",
      backgroundColor: "transparent",
    },
    thumbnails: {
      showThumbnails: false,
    },
  }

  return (
    <SimpleReactLightBox>
      <div className="gallery">
        <h1 className="gallery-title">{title}</h1>
        <h2 className="gallery-subtitle">{subtitle}</h2>
        <div className="gallery-description">
          <BlockContent value={_rawDescription} />
        </div>
        {photos && (
          <SRLWrapper options={lightboxOptions}>
            <Gallery
              targetRowHeight={targetRowHeight}
              photos={photos}
            ></Gallery>
          </SRLWrapper>
        )}
      </div>
    </SimpleReactLightBox>
  )
}

export default GalleryPage
