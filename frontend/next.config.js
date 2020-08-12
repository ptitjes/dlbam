require("dotenv").config()

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  env: {
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    EXTERNAL_API_URL: process.env.EXTERNAL_API_URL,
  },
})
