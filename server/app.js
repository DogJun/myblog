const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const db = mongoose.connect("mongodb://localhost/blog")

/**
 * 使用 Node 自带 Promise 代替 mongoose 的 Promise
 */
mongoose.Promise = global.Promise

const app = new Koa()
const router = new Router()
app.use(bodyParser())
// Add models
// require('./models/Articles')
const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: String,
  body: String,
  author: String
}, {timaStamps: true})


ArticleSchema.methods.toJSON = () => ({
  _id: this._id,
  title: this.title,
  body: this.body,
  author: this.author,
  createdAt: this.createdAt,
  updatedAt: this.updatedAt
})

mongoose.model('Articles', ArticlesSchema)
const Articles = mongoose.model('Articles')
console.log(Articles)
router.post('/', async (ctx, next) => {
  const { body } = ctx.request
  const finalArticle = new Articles(body)
  return finalArticle.save()
    .then(() => {
      ctx.body = { 
        article: finalArticle.toJSON() 
      }
    })
    .catch(err) => {
      console.log(err)
    }
  ctx.body = {
    success: true,
    data: body
  }
})
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(9000)
console.log('app started at port 9000...')
