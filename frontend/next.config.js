require("dotenv").config()

module.exports = {
  env: {
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    EXTERNAL_API_URL: process.env.EXTERNAL_API_URL,
  },
}
