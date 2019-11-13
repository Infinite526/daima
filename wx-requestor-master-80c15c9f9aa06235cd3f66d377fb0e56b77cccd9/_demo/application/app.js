import IndexAPI from '../apis/index.js'

let apis = {}
apis = Object.assign(apis, IndexAPI)

module.exports = {
  ...apis
}
