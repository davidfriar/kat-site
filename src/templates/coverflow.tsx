import { SanityPost } from "../../graphql-types"
import Image from "../components/image"
import ReactCoverflow from "react-coverflow"
import "./coverflow.css"

type CoverflowProps = { posts: SanityPost[] }

const Coverflow = ({ posts }: CoverflowProps) => {
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
