import type { SanityCustomImage } from "../../graphql-types"
import { Sticker } from "./sticker"
import Image from "./image"

type FigureProps = { value: SanityCustomImage }
export const Figure = ({ value }: FigureProps) => {
  return (
    <figure>
      <div className="figure-image">
        <Image image={value} />
        {value.sticker ? <Sticker sticker={value.sticker} /> : null}
      </div>
      <figcaption>{value.caption}</figcaption>
    </figure>
  )
}
