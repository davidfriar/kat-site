import { usePosts } from "../hooks/usePosts"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Image from "../components/image"
import { useHomePage } from "../hooks/useHomePage"
import Rotatable from "../components/rotatable"
import "./index.css"
import SVGCard from "../components/SVGCard"
import BackGroundImage from "../components/backgroundImage"

const HomePage = () => {
  const posts = usePosts()
  const page = useHomePage()
  return (
    <BackGroundImage image={page.backgroundImage} className="home-page">
      <SEO />
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/blog/${post.slug?.current}`}>{post.title}</Link>
        </li>
      ))}
      <Rotatable className="home-page-rotatable">
        <Image className="home-page-image" image={page.mainImage} />
      </Rotatable>
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
