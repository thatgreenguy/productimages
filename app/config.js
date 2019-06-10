const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  api_port: process.env.API_PORT,
  api_base: process.env.API_BASE
}
