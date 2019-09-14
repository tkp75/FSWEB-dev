const util = require('util')

const inspect = (param) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('inspect:',util.inspect(param))
  }
}

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  inspect,
  info,
  error,
}
