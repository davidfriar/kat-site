import { SanityGallery } from "../../graphql-types"
import "./galleryList.css"
import { Link } from "gatsby"
import FilmStrip from "./filmStrip"

type GalleryListProps = { galleries: SanityGallery[] }
const GalleryList = ({ galleries }: GalleryListProps) => {
  return (
    <div className="gallery-list">
      <ul>
        {galleries.map((gallery) => (
          <li key={gallery.id}>
            <Link to={`/galleries/${gallery.slug?.current || "#"}`}>
              <FilmStrip images={gallery.images} title={gallery.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GalleryList
