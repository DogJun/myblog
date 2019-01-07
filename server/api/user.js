import * as $ from '../controller/user.js'
const Router = require('koa-router')
const router = new Router()
router.post('/login', $.login)

module.exports = router
