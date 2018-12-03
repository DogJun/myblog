import Koa from 'koa'
import configure from './config/index'
import log4js from 'log4js'
import errorHandler from './middlewares/errorHandler'
import co from 'co'
import serve from 'koa-static'
const { createContainer, Lifetime} = require('awilix')
const { loadControllers, scopePerRequest } = require('awilix-koa')
const app = new Koa()
// 记录错误日志
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/dogjun.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger('cheese')
errorHandler.error(app,logger)

// 创建IOC容器
const container = createContainer()
// 每一个请求都是一个 new model
app.use(scopePerRequest(container))
// 装载所有的 models 并将 services 代码注入到 controllers
container.loadModules([`${__dirname}/services/*.js`], {
  formatName: 'camelCase', // 驼峰转换
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})
// 注册所有的路由
app.use(loadControllers('controllers/*.js', {cwd: __dirname}))
const config = configure(app)

// 静态资源
app.use(serve(config.staticDir))

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`) // eslint-disable-line
})

// 方便测试用
module.exports = app