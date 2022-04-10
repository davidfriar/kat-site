import { SanityCustomImage } from "../../graphql-types"
import "./filmStrip.css"
import BackGroundImage from "./backgroundImage"

type FilmStripProps = {
  images: Array<SanityCustomImage | null> | undefined | null
  title: string | null | undefined
  max?: number
}

const FilmStrip = ({ images, title, max = 4 }: FilmStripProps) => {
  // const imageHeight = max === 4 ? 200 : 400
  // const imageWidth = imageHeight * 1.5
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
      <p className="film-strip-title">{title}</p>
    </div>
  )
}

export default FilmStrip
