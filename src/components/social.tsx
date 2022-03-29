import "./social.css"
import { Twitter, Facebook, Tumblr, Pinterest } from "react-social-sharing"

type SocialProps = { link: string }
const Social = ({ link }: SocialProps) => {
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
          <Pinterest simple link={link} />
        </li>
      </ul>
    </div>
  )
}

export default Social
