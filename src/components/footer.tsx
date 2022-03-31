import "./footer.css"
import { useSiteInfo } from "../hooks/useSiteInfo"

const Footer = () => {
  const siteInfo = useSiteInfo()
  return <footer>{siteInfo.footer}</footer>
}

export default Footer
