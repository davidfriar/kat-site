import { useSiteInfo } from "../hooks/useSiteInfo"
import Image from "./image"

const Logo = () => {
  const siteInfo = useSiteInfo()

  return siteInfo.logo ? (
    <Image image={siteInfo.logo} width={80} height={80} />
  ) : null
}

export default Logo
