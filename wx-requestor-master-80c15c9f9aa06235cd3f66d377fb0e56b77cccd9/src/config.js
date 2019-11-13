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
      duration: 2000,
      mask:true
    })
  },

  failedMsg: ''
}
module.exports = defaultOpt
