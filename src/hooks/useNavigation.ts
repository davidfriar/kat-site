import { useStaticQuery, graphql } from "gatsby"
import {
  SanityNavigationConnection,
  SanityPage,
  SanityHomePage,
} from "../../graphql-types"

const isHomePage = (
  page: SanityPage | SanityHomePage | null
): page is SanityHomePage => {
  return page !== null && !("slug" in page)
}

const isPage = (
  page: SanityPage | SanityHomePage | null
): page is SanityPage => {
  return page !== null && "slug" in page
}

export type NavigationItem = { title: string; url: string }

export const useNavigation = (
  includeHomePage: boolean
): Array<NavigationItem> => {
  const result = useStaticQuery<{
    allSanityNavigation: SanityNavigationConnection
  }>(graphql`
    query Navigation {
      allSanityNavigation {
        nodes {
          pages {
            ... on SanityHomePage {
              title
            }
            ... on SanityPage {
              title
              navigationTitle
              slug {
                current
              }
            }
          }
        }
      }
    }
  `)

  if (result.allSanityNavigation.nodes.length < 1) {
    throw new Error("Unable to retrieve Navigation")
  }

  const navigation = result.allSanityNavigation.nodes[0].pages
    ?.filter((page) => includeHomePage || isPage(page))
    .map((page) => {
      if (isPage(page)) {
        return {
          title: (page.navigationTitle
            ? page.navigationTitle
            : page.title) as string,
          url: `/${page.slug?.current as string}`,
        }
      } else if (isHomePage(page)) {
        return { title: page.title as string, url: "/" }
      } else {
        throw new Error("Unexpected type in navigation")
      }
    })
  return navigation ? navigation : []
}
