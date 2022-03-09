import { SanityPost } from "../../graphql-types"
import Image from "../components/image"
import "./cardList.css"

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
              <h2 className="card-title">
                <a href={`/blog/${post.slug?.current || "#"}`}>{post.title}</a>
              </h2>
              <div className="card-summary">{post.summary}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList
