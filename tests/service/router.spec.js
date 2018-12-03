const superagent = require('supertest')
const app = require('../../dist/app.js')

function request () {
  return superagent(app.listen())
}

describe('NodeUII自动化测试脚本', function () {
  describe('API接口测试', function () {
    it('测试获取的数据', function (done) {
      request()
      .get('/index/test')
      .set('Accept', 'appliaction/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, response) {
        if (response.body.data === 'hello test') {
          done()
        } else {
          done(new Error('测试接口与预期不符合'))
        }
      })
    })
  })
  describe('NodeUII容错测试', function () {
    it('测试404', function (done) {
      request()
      .get('/notfound')
      .expect(404, done)
    })
  })
})