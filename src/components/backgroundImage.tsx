import { SanityCustomImage, Maybe } from "../../graphql-types"
import { imageUrl } from "gatsby-plugin-sanity-image"

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
  const params = {
    width: width,
    height: height,
  }
  const src = imageUrl(image, params)
  const theStyle = {
    ...style,
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
  }

  return (
    <div style={theStyle} {...otherProps}>
      {children}
    </div>
  )
}

export default BackGroundImage
