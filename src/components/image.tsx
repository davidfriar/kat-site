import type { SanityCustomImage } from "../../graphql-types"
import SanityImage from "gatsby-plugin-sanity-image"

type ImageProps = {
  image: SanityCustomImage
  width?: number
  height?: number
  options?: {}
  config?: {}
  style?: {}
} & React.HTMLAttributes<HTMLImageElement>

const Image = ({ image, style, ...otherprops }: ImageProps) => {
  const theStyle = {
    marginBottom: 0,
    ...(style || {}),
  }
  return <SanityImage {...image} {...otherprops} style={theStyle} />
}

export default Image
