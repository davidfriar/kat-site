import type { SanityCustomImage } from "../../graphql-types"
import Image from "./image"
import "./polaroid.css"

type PolaroidProps = { image: SanityCustomImage }
const Polaroid = ({ image }: PolaroidProps) => {
  return (
    <figure className="polaroid">
      <Image image={image} />
      <figcaption>{image.caption}</figcaption>
    </figure>
  )
}

export default Polaroid
