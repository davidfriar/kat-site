import type { SanitySticker } from "../../graphql-types"
import Image from "./image"

type StickerProps = { sticker: SanitySticker }
export const Sticker = ({ sticker }: StickerProps) => {
  return (
    <div className="sticker">
      {sticker.link ? (
        <a href={sticker.link} title={sticker.description || ""}>
          <Image image={sticker.image!} />
        </a>
      ) : (
        <Image image={sticker.image!} />
      )}
    </div>
  )
}
