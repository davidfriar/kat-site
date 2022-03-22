import "./header.css"
import Navigation from "./navigation"
import Logo from "./logo"
import { Link } from "gatsby"

type HeaderProps = { isHomePage: boolean }
const Header = ({ isHomePage }: HeaderProps) => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Navigation />
    </header>
  )
}
export default Header
