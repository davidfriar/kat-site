import type { GatsbyNode } from "gatsby"

const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  stage,
  loaders,
  actions,
}) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-coverflow/,
            use: loaders.null(),
          },
          {
            test: /react-tiktok/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

export default onCreateWebpackConfig
