import { graphql, PageProps } from "gatsby"
import { SanityCustomImage, SanityGallery } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import Gallery from "react-photo-gallery"
import { PhotoProps, RenderImageProps } from "react-photo-gallery"
import "./gallery.css"
import SimpleReactLightBox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox"
import { imageUrl, parseImageRef } from "gatsby-plugin-sanity-image"
import Image from "../components/image"

export const query = graphql`
  query GalleryQuery($id: String!) {
    sanityGallery(id: { eq: $id }) {
      title
      subtitle
      _rawDescription
      images {
        ...ImageWithPreview
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

  type Photo = PhotoProps<{ image?: SanityCustomImage }>

  const photos: Photo[] =
    images?.map((image) => {
      const {
        dimensions: { width, height },
      } = parseImageRef(image?.asset?._id)
      return {
        image: image && { asset: image.asset }, // just take the asset so we can display them uncropped
        width: width as number,
        height: height as number,
        alt: image?.alt as string,
        src: imageUrl(image?.asset?._id),
      }
    }) || []

  type RendererType = React.ComponentType<RenderImageProps<Photo>>
  const imageRenderer: RendererType = ({ index, left, top, photo }) => {
    const styles = {
      width: photo.width,
      height: photo.height,
      top: top,
      left: left,
    }
    return (
      <div key={index} style={styles}>
        {photo.image && <Image image={photo.image} />}
      </div>
    )
  }

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
              renderImage={imageRenderer}
            ></Gallery>
          </SRLWrapper>
        )}
      </div>
    </SimpleReactLightBox>
  )
}

export default GalleryPage
