const util = require('util')

const inspect = (...params) => {
  if (process.env.NODE_ENV !== 'test' && params) {
    if (params.length === 1) {
      console.log(util.inspect(params[0]))
    } else if (params.length > 1) {
      console.log(params[0])
      params.shift()
      params.forEach(param => {
        console.log(util.inspect(param))
      })
    }
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
