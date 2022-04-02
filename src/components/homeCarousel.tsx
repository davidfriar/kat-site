import { SanityPost } from "../../graphql-types"
import Image from "./image"
import "./homeCarousel.css"
import { useState } from "react"
import { useTransition, animated, config } from "@react-spring/web"
import record from "../img/record.svg"
import Rotatable from "../components/rotatable"
import { Link } from "gatsby"
import useWindowDimensions from "../hooks/useWindowDimensions"

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

function circularOrder<T>(items: T[]) {
  const result: T[] = []
  items.forEach((item, index) => {
    if (index % 2 == 0) {
      result[index / 2] = item
    } else {
      result[items.length - (index + 1) / 2] = item
    }
  })
  return result
}

const HomeCarousel = ({
  posts,
  numberShown = 3,
  angle = 30,
}: HomeCarouselProps) => {
  const { height: windowHeight } = useWindowDimensions()
  const cardTranslation = windowHeight ? `-${windowHeight * 0.45}px` : "350px"

  const [first, setFirst] = useState(posts.length - Math.floor(numberShown / 2))
  const [reverseAnimation, setReverseAnimation] = useState(false)
  const visiblePosts = take(numberShown, first, circularOrder(posts)).map(
    (post, index) => ({
      post,
      index,
    })
  )

  let totalAngle = 0

  const wheelRotationHandler = (wheelAngle: number) => {
    totalAngle += wheelAngle
    // console.log(`angle: ${wheelAngle} totalAngle: ${totalAngle}`)
    if (Math.abs(totalAngle) > angle) {
      setReverseAnimation(totalAngle < 0)
      setFirst((first) => {
        const newValue = first - Math.trunc(totalAngle / angle)
        const n = posts.length
        const normalised = ((newValue % n) + n) % n
        console.log(`newValue ${newValue} normalised: ${normalised}`)
        return normalised
      })
    }
  }

  const transitions = useTransition(
    reverseAnimation ? visiblePosts.reverse() : visiblePosts,
    {
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
        }deg) translate3d(0px, ${cardTranslation}, 0px)`,
      }),
      update: (item) => ({
        opacity: 1,
        transform: `rotate(${
          (item.index - (numberShown - 1) / 2) * angle
        }deg) translate3d(0px, ${cardTranslation},0px)`,
      }),
      leave: (item) => ({
        opacity: 0,
        transform: `rotate(${
          (item.index - (numberShown - 1) / 2) * angle
        }deg) translate3(0px, 0px,0px)`,
      }),
      // config: config.molasses,
      key: (item: CarouselItem) => item.post.title,
      trail: 50,
      expires: 100,
    }
  )

  return (
    <div className="home-carousel">
      {transitions((style, { post, index }) => {
        const theStyle = {
          ...style,
          zIndex: index,
        }
        return (
          <Link to={`/blog/${post.slug?.current || "#"}`}>
            <animated.div className="card" style={theStyle}>
              <div className="card-text">
                <h2 className="card-title">{post.title}</h2>
                <h3 className="card-subtitle">{post.subtitle}</h3>
                <div className="card-summary">{post.summary}</div>
              </div>
              <div className="card-image">
                {post.mainImage ? (
                  <Image image={post.mainImage} width={200} />
                ) : null}
              </div>
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
