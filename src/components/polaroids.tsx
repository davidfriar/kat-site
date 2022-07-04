import { SanityPost } from "../../graphql-types"
import "./polaroids.css"
import { Link } from "gatsby"
import Polaroid from "./polaroid"
import "./polaroids.css"

type CardListProps = { posts: SanityPost[] }
const CardList = ({ posts }: CardListProps) => {
  return (
    <div className="polaroids">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug?.current || "#"}`}>
              {post.mainImage ? <Polaroid image={post.mainImage} /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList
