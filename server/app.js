const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const db = mongoose.connect("mongodb://localhost/myblog")

/**
 * debug 模式
 */
mongoose.set('debug', true)
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
}, {timestamps: true})



ArticleSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Articles', ArticleSchema)
const Articles = mongoose.model('Articles')
router.post('/add', async (ctx, next) => {
  const { body } = ctx.request
  console.log(body)
  const finalArticle = new Articles(body)
  const articles = await finalArticle.save()
  ctx.response.body = {
    err: 0,
    data: {
      articles: articles.map(article => article.toJSON())
    }
  }
})
router.get('/get', async (ctx, next) => {
  const articles = await Articles.find()
  console.log(articles.map(article => article.toJSON()))
  ctx.response.body = {
    err: 0,
    data: {
      articles: articles.map(article => article.toJSON())
    }
  }
})

router.post('/delete', async (ctx, next) => {
  console.log(ctx.request.body)
  const result = await Articles.findByIdAndRemove(ctx.request.body.id)
  console.log(result)
  ctx.response.body = {
    err: 0 
  }
});
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(9000)
console.log('app started at port 9000...')
