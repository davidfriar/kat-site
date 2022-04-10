import { SanityCustomImage, Maybe } from "../../graphql-types"
import { imageUrl } from "gatsby-plugin-sanity-image"
import useWindowDimensions from "../hooks/useWindowDimensions"

type BackgroundImageProps = {
  image: Maybe<SanityCustomImage>
  width?: number
  height?: number
} & React.HTMLAttributes<HTMLDivElement>

const BackGroundImage = ({
  image,
  width,
  height,
  style,
  children,
  ...otherProps
}: BackgroundImageProps) => {
  const { width: windowWidth } = useWindowDimensions()

  const params = {
    width: width ? width : windowWidth,
    height: height,
  }
  const src = image && image.asset ? imageUrl(image, params) : null

  const theStyle = src
    ? {
        ...style,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
      }
    : style

  return (
    <div style={theStyle} {...otherProps}>
      {children}
    </div>
  )
}

export default BackGroundImage
