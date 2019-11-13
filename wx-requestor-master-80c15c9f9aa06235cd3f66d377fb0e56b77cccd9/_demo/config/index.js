const globalEnv = 'env'
let envObj = {}
const dev = require('./dev.env.js')
const prod = require('./prod.env.js')

if (globalEnv === 'env') {
  envObj = Object.assign({}, dev)
} else {
  envObj = Object.assign({}, prod)
}

module.exports = envObj
