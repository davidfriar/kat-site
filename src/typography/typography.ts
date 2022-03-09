import Typography from "typography"
import theme from "typography-theme-irving"

theme.googleFonts.push({
  name: "Open Sans",
  styles: ["400", "400i", "700", "700i"],
})

const typography = new Typography({
  ...theme,
  baseFontSize: "18px",
  scaleRatio: 4,
  bodyFontFamily: ["Open Sans"],
})
export default typography
