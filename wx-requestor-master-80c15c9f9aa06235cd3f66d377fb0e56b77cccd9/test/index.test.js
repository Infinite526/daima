import requestor from '../src/index.js'

describe("index", () => {
  it("a", () => {
    let ajax = requestor({})
    ajax.spread(function(a, b, c){
      expect(a).toBe(1)
      expect(b).toBe(2)
      expect(c).toBe(3)
    })([1, 2, 3])
  })
})
