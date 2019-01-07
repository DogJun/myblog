import User from '../model/user.js'
import config from '../config'
import md5 from 'md5';
import jwt from 'jsonwebtoken';
/**
 * 初始化用户名和密码
 */
export async function initUser () {
  let user = await User.find().exec().catch(err => {
    console.log(err)
  })
  if (user.length === 0) {
    user = new User({
      name: 'DogJun',
      username: config.admin.user,
      password: md5(config.admin.pwd).toUpperCase(),
      avatar: '',
      createTime: new Date()
    })
    await user.save().catch(err => {
      console.log(err)
    })
  }
}
/**
 * 登录
 * @param {*} ctx 
 */
export async function login (ctx) {
  const {
    username,
    password
  } = ctx.request.body
  const user = await User.findOne({username}).exec()
  if (user !== null) {
    if (user.password === password) {
      const token = jwt.sign({
        uid: user._id,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 hours
      }, config.jwt.secret)
      ctx.body = {
        success: true,
        data: {
          uid: user._id,
          name: user.name,
          token
        }
      }
    } else {
      ctx.throw(401, '用户名或密码错误')
    }
  } else {
    ctx.throw(401, '用户名或密码错误')
  }
}