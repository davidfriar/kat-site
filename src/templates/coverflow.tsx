import { SanityPost } from "../../graphql-types"

type CoverflowProps = { posts: SanityPost[] }

const Coverflow = ({ posts }: CoverflowProps) => {
  return (
    <>
      <div>I am coverflow</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug?.current || "#"}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Coverflow
