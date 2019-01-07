import jwt from 'jsonwebtoken'
import config from '../config'

export default async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http header \'Authorization\'')
  }
  const token = authorization.split(' ')[1]
  console.log(token)
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, config.jwt.secret)
    console.log(tokenContent)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expired')
    }
    ctx.throw(401, 'invalid token')
  }
  console.log('鉴权成功')
  await next()
}