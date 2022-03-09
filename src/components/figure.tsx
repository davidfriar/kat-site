import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { sanity } from "../gatsby/client-config"
import type { SanityCustomImage } from "../../graphql-types"

type FigureProps = { value: SanityCustomImage }
export const Figure = ({ value }: FigureProps) => {
  if (!value?.asset?._id) {
    return null
  }
  const gatsbyImageData = getGatsbyImageData(value.asset._id, {}, sanity)
  if (!gatsbyImageData) {
    return null
  } else {
    return (
      <figure>
        <GatsbyImage image={gatsbyImageData} alt={value.alt || ""} />
        <figcaption>{value.caption}</figcaption>
      </figure>
    )
  }
}
