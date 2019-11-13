const path = require('path')
module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  testMatch: [ "<rootDir>/test/**/?(*.)(spec|test).{js,jsx,mjs}"]
}
