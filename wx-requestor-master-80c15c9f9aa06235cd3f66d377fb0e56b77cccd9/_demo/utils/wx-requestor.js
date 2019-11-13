(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wx-requestor"] = factory();
	else
		root["wx-requestor"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultOpt = {
  onSessionExpired: function () {},

  token: {
    addToHeader: false,
    headerName: 'Cookie',
    cookieName: 'scn'
  },

  ajaxOption: {
    method: 'POST',
    dataType: 'json',
    responseType: 'text'
  },

  resultCode: {
    SESSION_EXPIRED: Symbol(),
    SUCCEED: Symbol()
  },

  toast: function (msg) {
    wx.showToast({
      title: msg,
      duration: 1000,
      mask:true
    })
  },

  failedMsg: ''
}
function requestor (globalOpt) {
  let objOptions = ['ajaxOption', 'token', 'resultCode']
  objOptions.forEach(function (option) {
    globalOpt[option] = Object.assign({}, defaultOpt[option], globalOpt[option])
  })

  globalOpt = Object.assign({}, defaultOpt, globalOpt)

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
      if (!option.headers) option.headers = {}
      option.header[tokenOption.headerName] = tokenOption.cookieName + '=' + token
    }

    const sessionExpiredResult = {
      code: globalOpt.resultCode.SESSION_EXPIRED,
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
            if (data.code === globalOpt.resultCode.SESSION_EXPIRED) {
              globalOpt.onSessionExpired()
              reject(sessionExpiredResult)
            } else {
              resolve(res)
            }
          } else {
            reject(res)
            asyncToast(data.msg)
          }
        },
        fail (res) {
          reject(res)
          asyncToast(globalOpt.msg)
        }
      })
    })
  }

  function requestJSON (apiOption, data) {
    let option = Object.assign({}, globalOpt.ajaxOption, apiOption, data)
    return request(option)
  }

  function requestAPI (...args) {
    return requestJSON(...args).then(res => res.data)
  }

  return {
    requestAPI
  }
}
module.exports = requestor


/***/ })

/******/ });
});
//# sourceMappingURL=wx-requestor.js.map