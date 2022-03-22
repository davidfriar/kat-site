import Typography from "typography"
import theme from "typography-theme-irving"
import * as BreakPoints from "typography-breakpoint-constants"

const newScale = (ratio: number, value: number) => Math.pow(ratio, value)
const DEFAULT_RATIO = 4
const TABLET_RATIO = 3
const MOBILE_RATIO = 2

theme.omitGoogleFonts = true
theme.googleFonts = []

const typography = new Typography({
  ...theme,
  omitGoogleFonts: true,
  baseFontSize: "18px",
  scaleRatio: DEFAULT_RATIO,
  bodyFontFamily: ["Open Sans", "sans-serif"],
  headerFontFamily: ["Exo", "sans-serif"],
  overrideThemeStyles: ({ adjustFontSizeTo }) => {
    return {
      [".svg-card-title, .svg-card-subtitle"]: {
        fontFamily: "Exo, sans-serif",
        fontWeight: "700",
      },
      [BreakPoints.MOBILE_MEDIA_QUERY]: {
        html: {
          fontSize: `${(15 / 16) * 100}%`,
        },
        h1: { ...adjustFontSizeTo(`${newScale(MOBILE_RATIO, 5 / 5)}rem`) },
        h2: { ...adjustFontSizeTo(`${newScale(MOBILE_RATIO, 3 / 5)}rem`) },
        h3: { ...adjustFontSizeTo(`${newScale(MOBILE_RATIO, 2 / 5)}rem`) },
      },
      [BreakPoints.TABLET_MEDIA_QUERY]: {
        html: {
          fontSize: `${(16 / 16) * 100}%`,
        },
        h1: { ...adjustFontSizeTo(`${newScale(TABLET_RATIO, 5 / 5)}rem`) },
        h2: { ...adjustFontSizeTo(`${newScale(TABLET_RATIO, 3 / 5)}rem`) },
        h3: { ...adjustFontSizeTo(`${newScale(TABLET_RATIO, 2 / 5)}rem`) },
      },
    }
  },
})

export default typography
