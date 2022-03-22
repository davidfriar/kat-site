import "./src/css/global.css"
import type { GatsbyBrowser } from "gatsby"
import Layout from "./src/components/layout"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props: { path },
}) => {
  return <Layout isHomePage={path === "/"}>{element}</Layout>
}
