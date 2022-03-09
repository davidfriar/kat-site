import { useNavigation } from "../hooks/useNavigation"

const Navigation = () => {
  const navigation = useNavigation()
  return (
    <>
      <input type="checkbox" className="nav-toggle" id="nav-toggle" />
      <nav>
        <ul>
          {navigation.map((page) => (
            <li key={page.title}>
              <a href={page.url}>{page.title}</a>
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
