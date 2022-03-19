import { GatsbyImage } from "gatsby-plugin-image"
import type { SanityCustomImage } from "../../graphql-types"

type ImageProps = { image: SanityCustomImage; className?: string }
const Image = ({
  image,
  className,
}: ImageProps & React.HTMLAttributes<HTMLElement>) => {
  return (
    <GatsbyImage
      image={image.asset?.gatsbyImageData}
      alt={image.alt || ""}
      className={className}
    />
  )
}
export default Image
