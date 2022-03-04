import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { sanity } from "../gatsby/client-config"
import type { SanityImage } from "../../graphql-types"

type FigureProps = { value: SanityImage }
export const Figure = ({ value }: FigureProps) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const node = value as any
  if (!node?.asset?._id) {
    return null
  }
  const gatsbyImageData = getGatsbyImageData(node as any, {}, sanity)
  if (!gatsbyImageData) {
    return null
  } else {
    return (
      <figure>
        <GatsbyImage image={gatsbyImageData} alt={node.alt} />
        <figcaption>{node.caption}</figcaption>
      </figure>
    )
  }
}
