import { SanityPost } from "../../graphql-types"
import Image from "../components/image"
import "./cardList.css"
import { Link } from "gatsby"

type CardListProps = { posts: SanityPost[] }
const CardList = ({ posts }: CardListProps) => {
  return (
    <div className="card-list">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div className="card-list-card">
              {post.mainImage ? (
                <Image image={post.mainImage} className="card-image" />
              ) : null}
              <div className="card-header">
                <h2 className="card-title">
                  <Link to={`/blog/${post.slug?.current || "#"}`}>
                    {post.title}
                  </Link>
                </h2>
                <h3 className="card-subtitle">{post.subtitle}</h3>
              </div>
              <div className="card-summary">{post.summary}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList
