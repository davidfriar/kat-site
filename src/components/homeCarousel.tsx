import { SanityPost } from "../../graphql-types"
import Image from "./image"
import "./homeCarousel.css"
import { useState } from "react"
import { useTransition, animated, config } from "@react-spring/web"
import record from "../img/record.svg"
import Rotatable from "../components/rotatable"
import { Link } from "gatsby"

type HomeCarouselProps = {
  posts: SanityPost[]
  numberShown?: number
  angle?: number
}

type CarouselItem = {
  post: SanityPost
  index: number
}

function take<T>(n: number, first: number, items: T[], infinite = true): T[] {
  const firstChunk = items.slice(first, first + n)
  if (!infinite || firstChunk.length === n) {
    return firstChunk
  }
  const diff = n - firstChunk.length
  const secondChunk = items.slice(0, Math.min(first, diff))
  return firstChunk.concat(secondChunk)
}

const HomeCarousel = ({
  posts,
  numberShown = 3,
  angle = 30,
}: HomeCarouselProps) => {
  const [first, setFirst] = useState(0)
  const visiblePosts = take(numberShown, first, posts).map((post, index) => ({
    post,
    index,
  }))

  let totalAngle = 0

  const wheelRotationHandler = (wheelAngle: number) => {
    totalAngle += wheelAngle
    // console.log(`angle: ${wheelAngle} totalAngle: ${totalAngle}`)
    if (Math.abs(totalAngle) > angle) {
      setFirst((first) => {
        const newValue = first - Math.trunc(totalAngle / angle)
        const n = posts.length
        const normalised = ((newValue % n) + n) % n
        console.log(`newValue ${newValue} normalised: ${normalised}`)
        return normalised
      })
    }
  }

  const transitions = useTransition(visiblePosts, {
    from: (item) => ({
      opacity: 0,
      transform: `rotate(${
        (item.index - (numberShown - 1) / 2) * angle
      }deg) translate3d(0px,0px, 0px)`,
    }),
    enter: (item) => ({
      opacity: 1,
      transform: `rotate(${
        (item.index - (numberShown - 1) / 2) * angle
      }deg) translate3d(0px, -360px, 0px)`,
    }),
    update: (item) => ({
      opacity: 1,
      transform: `rotate(${
        (item.index - (numberShown - 1) / 2) * angle
      }deg) translate3d(0px, -360px,0px)`,
    }),
    leave: (item) => ({
      opacity: 0,
      transform: `rotate(${
        (item.index - (numberShown - 1) / 2) * angle
      }deg) translate3(0px, 0px,0px)`,
    }),
    // config: config.molasses,
    key: (item: CarouselItem) => item.post.title,
    trail: 100,
    expires: 100,
  })

  return (
    <div className="home-carousel">
      {transitions((style, { post }) => {
        return (
          <Link to={`/blog/${post.slug?.current || "#"}`}>
            <animated.div className="card" style={style}>
              <h2 className="post-title">{post.title}</h2>
              <h3 className="post-subtitle">{post.subtitle}</h3>
              <div className="post-summary">{post.summary}</div>
              {post.mainImage ? (
                <Image
                  image={post.mainImage}
                  width={200}
                  className="card-image"
                />
              ) : null}
            </animated.div>
          </Link>
        )
      })}

      <Rotatable className="carousel-wheel" onRotate={wheelRotationHandler}>
        <img src={record} alt="vinyl record" />
      </Rotatable>
    </div>
  )
}

export default HomeCarousel
