import "./social.css"
import { Twitter, Facebook, Tumblr, Pinterest } from "react-social-sharing"
import { SanityCustomImage } from "../../graphql-types"
import { imageUrl } from "gatsby-plugin-sanity-image"

type SocialProps = { link: string; image?: SanityCustomImage }
const Social = ({ link, image }: SocialProps) => {
  const imageSrc = image && imageUrl(image?.asset)
  return (
    <div className="social">
      <ul>
        <li>
          <Twitter simple link={link} />
        </li>
        <li>
          <Facebook simple link={link} />
        </li>
        <li>
          <Tumblr simple link={link} />
        </li>
        <li>
          <Pinterest simple link={link} media={imageSrc} />
        </li>
      </ul>
    </div>
  )
}

export default Social
