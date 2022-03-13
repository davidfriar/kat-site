import { useNavigation } from "../hooks/useNavigation"
import { Link } from "gatsby"

const Navigation = () => {
  const navigation = useNavigation(false)
  return (
    <>
      <input type="checkbox" className="nav-toggle" id="nav-toggle" />
      <nav>
        <ul>
          {navigation.map((page) => (
            <li key={page.title}>
              <Link to={page.url}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </>
  )
}
export default Navigation
