require('dotenv').config()

// Choose MONGODB_URI based on development cycle
let DB_URI
if (process.env.NODE_ENV === 'development') {
  DB_URI = process.env.DEV_MONGODB_URI
} else if (process.env.NODE_ENV === 'test') {
  DB_URI = process.env.TEST_MONGODB_URI
} else {
  DB_URI = process.env.MONGODB_URI
}

const MONGODB_URI = DB_URI
const PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT
}
