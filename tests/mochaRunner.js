const Mocha = require('mocha')

const mocha = new Mocha({
  reporter: 'mochawesome', // 生成报表
  reporterOptions: {
    reportDir: './docs/service-reporter'
  }
})

mocha.addFile('./tests/service/router.spec.js')

// 退出
mocha.run(function () {
  console.log('All done')
  process.exit()
})