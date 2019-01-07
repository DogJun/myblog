const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://localhost/myblog'

mongoose.promise = global.promise
let maxConnectTimes = 0
exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)
  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('数据库断开连接，正在尝试重新连接')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库连接出现异常')
      }
    })
    // 数据库出现错误的时候
    mongoose.connection.on('error', (err) => {
      console.log('数据库断开连接，正在尝试重新连接')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库连接出现异常')
      }
    })
    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('mongodb connected successfully')
      resolve()
    })
  })
}
exports.initSchemas = () => {
  // 引入所有的schema文件
  glob.sync(resolve(__dirname, '../model/', '**/*.js')).forEach(require)
}
