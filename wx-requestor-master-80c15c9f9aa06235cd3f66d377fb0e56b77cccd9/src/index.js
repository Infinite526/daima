'use strict';
const defaultOpt = require('./config.js')
const spread = require('./helper/spread.js')

const init = require('./finally.js')
init()


function requestor (globalOpt) {
  let objOptions = ['ajaxOption', 'token', 'resultCode']
  objOptions.forEach(function (option) {
    globalOpt[option] = Object.assign({}, defaultOpt[option], globalOpt[option])
  })    //把 option 全部合并到一个里边

  globalOpt = Object.assign({}, defaultOpt, globalOpt) // 把,默认的加 新添加的,都合并到一个里边

  let asyncToast = function (msg) {
    if (!msg) return
    setTimeout(function () {
      globalOpt.toast(msg)
    }, 0)
  }

  function request (option) {
    let header = {}
    if (option.addToHeader) {
      header.addToHeader = option.addToHeader
    }
    if (option.cookieName) {
      header.cookieName = option.cookieName
    }

    let tokenOption = Object.assign({}, globalOpt.token, header)
    tokenOption.addToHeader = option.addToHeader
    let token = wx.getStorageSync(tokenOption.cookieName)

    if (tokenOption && tokenOption.addToHeader && token) {
      if (!option.header) option.header = {}
      option.header[tokenOption.headerName] = tokenOption.cookieName + '=' + token
    }

    const sessionExpiredResult = {                
      code: globalOpt.resultCode.SESSION_EXPIRED,   //????????
      msg: 'Session expired!',
      data: {}
    }

    let _option = option
    _option.addToHeader && delete _option.addToHeader // eslint-disable-line
    _option.cookieName && delete _option.cookieName // eslint-disable-line

    return new Promise(function (resolve, reject) {
      wx.request({
        ..._option,
        success (res) {
          let {statusCode, data} = res
          if (statusCode === 200) {
            if (data.respCode === globalOpt.resultCode.SUCCEED) {
              resolve(data)
            } else if (data.respCode === globalOpt.resultCode.SESSION_EXPIRED) {
              globalOpt.onSessionExpired()
              reject(sessionExpiredResult)
            } else {
              reject(data)
              asyncToast(data.respMsg)
            }
          } else {
            reject(res)
            asyncToast(data.respMsg)
          }
        },
        fail (res) {
          reject(res)
          asyncToast(globalOpt.failedMsg)
        }
      })
    })
  }

  function requestJSON (apiOption, data) {
    let option = Object.assign({}, globalOpt.ajaxOption, apiOption, {data})
    return request(option)
  }

  function requestAPI (...args) {
    return requestJSON(...args).then(data => data.response)
  }

  function requestALL (arr) {
    return Promise.all(arr)
  }

  function requestRace(arr) {
    return Promise.race(arr)
  }

  return {
    requestAPI,
    requestJSON,
    requestALL,
    requestRace,
    spread
  }
}
module.exports = requestor
