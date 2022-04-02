import {
  PortableText,
  PortableTextProps,
  PortableTextMarkComponent,
} from "@portabletext/react"
import { Figure } from "../components/figure"
import { Link } from "gatsby"

const InternalLink: PortableTextMarkComponent = ({ children, value }) => {
  const {
    reference: {
      _type,
      slug: { current: slug },
    },
  } = value
  const prefix = {
    ["post"]: "/blog/",
    ["gallery"]: "/galleries/",
  }[_type as string]
  return <Link to={`${prefix}${slug}`}>{children}</Link>
}

const components = {
  types: {
    customImage: Figure,
  },
  marks: {
    internalLink: InternalLink,
  },
}

const BlockContent = (props: PortableTextProps) => {
  return <PortableText {...props} components={components} />
}

export default BlockContent
