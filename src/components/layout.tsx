import { ReactElement } from "react"
import Header from "./header"
import Footer from "./footer"
import { useTransition, animated, config } from "@react-spring/web"

type LayoutProps = { children: ReactElement; isHomePage: boolean }

const Layout = ({ children, isHomePage }: LayoutProps) => {
  const transition = useTransition(children, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.slow,
    key: (element: ReactElement) => element.key,
  })
  return (
    <>
      <Header isHomePage={isHomePage} />
      {transition((animatedStyle, children) => {
        const style = {
          position: "absolute" as const,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          ...animatedStyle,
        }
        return (
          <animated.div style={style}>
            <main>{children}</main>
            {isHomePage ? null : <Footer />}
          </animated.div>
        )
      })}
    </>
  )
}
export default Layout
