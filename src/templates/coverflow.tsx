import { SanityPost } from "../../graphql-types"
import Image from "../components/image"
import ReactCoverflow from "react-coverflow"
import "./coverflow.css"
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
        key={post.id}
        image={post.mainImage}
        data-action={`/blog/${post.slug?.current}`}
      />
    ) : null
  )

  const { width } = useWindowDimensions()

  return (
    <div className="coverflow-small">
      <ReactCoverflow
        displayQuantityOfSide={width < 1000 ? 1 : 2}
        navigation={false}
        infiniteScroll={true}
        enableHeading={false}
        height={width < 600 ? 400 : undefined}
      >
        {coverflowContents}
      </ReactCoverflow>
    </div>
  )
}

export default Coverflow
