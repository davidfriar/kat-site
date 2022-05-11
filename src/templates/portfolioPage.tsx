import "./portfolioPage.css"
import { graphql, PageProps } from "gatsby"
import { SanityPage, SanityCustomImage } from "../../graphql-types"
import BlockContent from "../components/blockContent"
import BackgroundImage from "../components/backgroundImage"
import Image from "../components/image"
import SimpleReactLightBox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox"
import Gallery from "react-photo-gallery"
import { PhotoProps, RenderImageProps } from "react-photo-gallery"
import { imageUrl, parseImageRef } from "gatsby-plugin-sanity-image"

export const simplePageQuery = graphql`
  query PortfolioPageQuery($id: String!) {
    sanityPage(id: { eq: $id }) {
      title
      subtitle
      _rawBody
      photos {
        ...ImageWithPreview
        alt
      }
    }
  }
`

type PortfolioPageProps = PageProps<{ sanityPage: SanityPage }>

const PortfolioPage = ({ data: { sanityPage: page } }: PortfolioPageProps) => {
  type Photo = PhotoProps<{ image?: SanityCustomImage | null }>

  const photos: Photo[] =
    page.photos?.map((image) => {
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
      <BackgroundImage className="portfolio-page" image={page.mainImage!}>
        <h1 className="portfolio-page-title">{page.title}</h1>
        <h2 className="portfolio-page-subtitle">{page.subtitle}</h2>
        <div className="portfolio-page-body">
          <BlockContent value={page._rawBody} />
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
      </BackgroundImage>
    </SimpleReactLightBox>
  )
}
export default PortfolioPage
