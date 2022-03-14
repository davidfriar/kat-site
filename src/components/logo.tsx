import { useSiteInfo } from "../hooks/useSiteInfo"
import Image from "./image"

const Logo = () => {
  const siteInfo = useSiteInfo()

  return siteInfo.logo ? <Image image={siteInfo.logo} /> : null
}

export default Logo
