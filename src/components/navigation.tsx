import { useNavigation } from "../hooks/useNavigation"
import { Link } from "gatsby"
import { useState } from "react"

const Navigation = () => {
  const navigation = useNavigation(false)
  const [open, setOpen] = useState(false)
  return (
    <>
      <input
        type="checkbox"
        className="nav-toggle"
        checked={open}
        id="nav-toggle"
      />
      <nav>
        <ul>
          {navigation.map((page) => (
            <li key={page.title}>
              <Link
                to={page.url}
                onClick={() => {
                  setOpen(false)
                }}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <label
        htmlFor="nav-toggle"
        onClick={() => {
          setOpen((open) => !open)
        }}
        className="nav-toggle-label"
      >
        <span></span>
      </label>
    </>
  )
}
export default Navigation
