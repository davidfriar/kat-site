import { ReactElement } from "react"
import Header from "./header"

type LayoutProps = { children: ReactElement }

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
export default Layout
