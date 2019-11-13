const envObj = require('../config/index.js')
let baseUrl = envObj.baseUrl

module.exports = {
  // 注释
  queryTestUrl: {
    url: baseUrl + '/Home/GetCityDate'
  }
}
