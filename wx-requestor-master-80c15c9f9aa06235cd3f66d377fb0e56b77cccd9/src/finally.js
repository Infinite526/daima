function init () {
  Promise.prototype.finally = function (callback) {
    var P = this.constructor
    return this.then(
      function (value) {
        P.resolve(callback()).then(
          function () {
            return value
          }
        )
      },
      function (reason) {
        P.resolve(callback()).then(
          function () {
            throw reason;
          }
        )
      }
    )
  } //finally
}
module.exports = init
