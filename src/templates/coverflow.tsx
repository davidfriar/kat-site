import { SanityPost } from "../../graphql-types"
import Image from "../components/image"
import ReactCoverflow from "react-coverflow"
import "./coverflow.css"
import { navigate } from "gatsby"

type CoverflowProps = { posts: SanityPost[] }

const Coverflow = ({ posts }: CoverflowProps) => {
  const myopen = (url?: string | URL): null => {
    navigate(url as string)
    return null
  }
  if (window) {
    window.open = myopen
  }

  return (
    <div className="coverflow">
      <ReactCoverflow
        displayQuantityOfSide={2}
        navigation={false}
        infiniteScroll={true}
        enableHeading={false}
        clickable={true}
      >
        {posts.map((post) =>
          post.mainImage ? (
            <Image
              image={post.mainImage}
              data-action={`/blog/${post.slug?.current}`}
            />
          ) : null
        )}
      </ReactCoverflow>
    </div>
  )
}

export default Coverflow
