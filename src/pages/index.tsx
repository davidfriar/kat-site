import { usePosts } from "../hooks/usePosts"
import SEO from "../components/seo"
import { useHomePage } from "../hooks/useHomePage"
import "./index.css"
import BackGroundImage from "../components/backgroundImage"
import HomeCarousel from "../components/homeCarousel"

const HomePage = () => {
  const posts = usePosts()
  const page = useHomePage()
  return (
    <BackGroundImage image={page.backgroundImage} className="home-page">
      <SEO />
      <HomeCarousel posts={posts} numberShown={5} />
    </BackGroundImage>
  )
}

export default HomePage

// <SVGCard
//   title="My Lovely Title"
//   subtitle="This is an awesome subtitle"
//   summary="This is where the summary goes. Will it fit?"
//   width={1000}
//   height={500}
//   angle={120}
//   radius={500}
//   className="svg-card"
// />
//
//
// {posts.map((post) => (
//   <li key={post.id}>
//     <Link to={`/blog/${post.slug?.current}`}>{post.title}</Link>
//   </li>
// ))}
