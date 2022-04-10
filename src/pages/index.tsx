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
