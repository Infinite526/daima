const requestor = require('../utils/wx-requestor.js')
const config = require('./ajax-conifg.js')

let ajax = requestor(config)

module.exports = ajax
