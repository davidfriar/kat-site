import { ReactElement } from "react"
import Header from "./header"

type LayoutProps = { children: ReactElement; isHomePage: boolean }

const Layout = ({ children, isHomePage }: LayoutProps) => {
  return (
    <>
      <Header isHomePage={isHomePage} />
      <main>{children}</main>
    </>
  )
}
export default Layout
