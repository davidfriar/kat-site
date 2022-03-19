import type { SanityCustomImage } from "../../graphql-types"
import Image from "./image"

type FigureProps = { value: SanityCustomImage }
export const Figure = ({ value }: FigureProps) => {
  return (
    <figure>
      <Image image={value} />
      <figcaption>{value.caption}</figcaption>
    </figure>
  )
}
