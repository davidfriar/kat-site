import { SanityCustomImage } from "../../graphql-types"
import "./filmStrip.css"
import BackGroundImage from "./backgroundImage"

type FilmStripProps = {
  images: Array<SanityCustomImage | null> | undefined | null
  title: string | null | undefined
  max?: number
}

const FilmStrip = ({ images, title, max = 4 }: FilmStripProps) => {
  return (
    <div className="film-strip">
      <ul>
        {images?.slice(0, max).map((image) => {
          return (
            image && (
              <li key={image?.asset?._id}>
                <div className="film-strip-frame">
                  <BackGroundImage
                    className="film-strip-image"
                    image={image}
                    width={300}
                    height={200}
                  />
                </div>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}

export default FilmStrip
