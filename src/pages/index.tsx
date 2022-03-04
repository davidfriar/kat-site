import { usePosts } from "../hooks/usePosts"
import { Link } from "gatsby"

const HomePage = () => {
  const posts = usePosts()
  return (
    <main>
      <title>Home Page</title>
      <h1>The Blog</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/blog/${post.slug?.current}`}>{post.title}</Link>
        </li>
      ))}
    </main>
  )
}

export default HomePage
