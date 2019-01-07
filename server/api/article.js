import * as $ from '../controller/articles.js'
import verify from '../middleware/vertify.js'
const Router = require('koa-router')
const router = new Router()

router.post('/createArticle', verify, $.createArticle)
router.get('/getAllArticle', $.getAllArticles)
router.get('/getArticle', $.getArticle)
router.get('/getPublishArticle', $.getPublishArticles)
router.post('/saveArticle', verify, $.modifyArticle)
router.post('/deleteArticle', verify, $.deleteArticle)
router.post('/publishArticle', verify, $.publishArticle)
router.post('/notpublishArticle', verify, $.notPublishArticle)

module.exports = router
