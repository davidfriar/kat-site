import { PortableText, PortableTextProps } from "@portabletext/react"
import { Figure } from "../components/figure"

const components = {
  types: {
    image: Figure,
  },
}

const BlockContent = (props: PortableTextProps) => {
  return <PortableText {...props} components={components} />
}

export default BlockContent
