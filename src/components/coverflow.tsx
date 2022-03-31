import { SanityPost } from "../../graphql-types"
import ReactCoverflow from "react-coverflow"
import "./coverflow.css"
import Image from "./image"
import { navigate } from "gatsby"
import useWindowDimensions from "../hooks/useWindowDimensions"

type CoverflowProps = { posts: SanityPost[] }

const Coverflow = ({ posts }: CoverflowProps) => {
  const myopen = (url?: string | URL): null => {
    navigate(url as string)
    return null
  }
  if (window) {
    window.open = myopen
  }

  const coverflowContents = posts.map((post) =>
    post.mainImage ? (
      <Image
        image={post.mainImage}
        key={post.id}
        data-action={`/blog/${post.slug?.current}`}
        className="coverflow-image"
      />
    ) : null
  )

  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  return (
    <div className="coverflow">
      <ReactCoverflow
        displayQuantityOfSide={
          windowWidth < 1000 ? 1 : windowWidth < 1200 ? 2 : 3
        }
        navigation={false}
        infiniteScroll={true}
        enableHeading={false}
        // height={windowWidth < 600 ? 200 : 900}
        height={windowHeight * 0.75}
      >
        {coverflowContents}
      </ReactCoverflow>
    </div>
  )
}

export default Coverflow
