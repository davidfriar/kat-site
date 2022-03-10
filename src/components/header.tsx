import "./header.css"
import Navigation from "./navigation"
import Logo from "./logo"

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Logo />
      </div>
      <Navigation />
    </header>
  )
}
export default Header
