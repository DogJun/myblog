'use strict';
import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import staticFlies from 'koa-static';
import compress from 'koa-compress';
import Router from 'koa-router';
import mongoose from 'mongoose';
import { initUser } from './controller/user'

import { ssr } from './ssr';
import { connect, initSchemas } from './database/init'

const app = new Koa();
const router = new Router();
const user = require('./api/user.js')
const article = require('./api/article.js')
const cors = require('koa2-cors')


// 连接数据库
;(async () => {
  await connect()
  // initSchemas()
  // initUser()
  // const User = mongoose.model('User')
  // let oneUser = new User({
  //   userName: 'MIDOG',
  //   password: '123456'
  // })
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })
  // let users = await User.findOne({}).exec()
  // console.log('users', users)
})()
app.use(async (ctx, next) => {
  if (ctx.url === '/favicon.ico') return;
  await next();
});
app.use(cors())
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
//   ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
//   await next();
// });
// app.use(async (ctx, next) => {
//   if (ctx.method === 'OPTIONS') {
//     ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
//     ctx.set('Access-Control-Max-Age', 3600 * 24);
//     ctx.body = '';
//   }
//   await next();
// });
// gzip压缩   热更新不支持 gzip
if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

// 使用post处理中间件
app.use(bodyParser());
// 设置静态资源路径
app.use(staticFlies(path.resolve(__dirname, '../')));
router.use('/api/user', user.routes())
router.use('/api/article', article.routes())

app.use(router.routes()).use(router.allowedMethods());
// ssr(app);
const init = async () => {
  await ssr(app).catch(err => {
    throw err;
  });
  app.listen(3000, () => {
    console.log('starting at port 3000');
  });
};
init();
