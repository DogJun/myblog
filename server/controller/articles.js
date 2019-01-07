import Article from '../model/article.js'
// 创建文章
export async function createArticle (ctx) {
  const {
    title,
    content,
    abstract,
    publish,
  } = ctx.request.body
  const createTime = new Date()
  const lastEditTime = new Date()
  if (title === '') {
    ctx.throw(400, '标题不能为空')
  }
  if (content === '') {
    ctx.throw(400, '文章内容不能为空')
  }
  if (abstract === '') {
    ctx.throw(400, '摘要不能为空')
  }
  const article = new Article({
    title,
    content,
    abstract,
    publish,
    createTime,
    lastEditTime
  })
  const createResult = await article.save().catch(err => {
    ctx.throw(500, '服务器内部错误')
  })
  ctx.body = {
    success: true,
    data: {
      article: createResult
    }
  }
}
// 获取所有文章
export async function getAllArticles (ctx) {
  let articleList
  // let allNum
  articleList = await Article.find().catch(err => {
    ctx.throw(500, '服务器内部错误')
  })
  // allNum = await Article.count().catch(err => {
  //   ctx.throw(500, '服务器内部错误')
  // })
  ctx.body = {
    success: true,
    data: {
      articleList
      // allNum
    }
  }
}
// 获取文章详情
export async function getArticle (ctx) {
  const id = ctx.query.id
  if (id === '') {
    ctx.throw(400, 'id不能为空')
  }
  const article = await Article.findById(id).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在')
    } else {
      ctx.throw(500, '服务器内部错误')
    }
  })
  ctx.body = {
    success: true,
    data: {
      article
    }
  }
}
// 获取所有已经发布的文章
export async function getPublishArticles (ctx) {
  const articleList = await Article.find({
    publish: true
  }).sort({createTime: -1})
    .catch(err => {
      ctx.throw(500, '服务器内部错误')
    })
  ctx.body = {
    success: true,
    data: {
      articleList
    }
  }
}
// 修改文章
export async function modifyArticle (ctx) {
  const {
    id,
    title,
    content
  } = ctx.request.body
  if (title === '') {
    ctx.throw(400, '标题不能为空')
  }
  if (content === '') {
    ctx.throw(400, '文章内容不能为空')
  }
  await Article.findByIdAndUpdate(id, {
    $set: ctx.request.body
  }).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在')
    } else {
      ctx.throw(500, '服务器内部错误')
    }
  })
  ctx.body = {
    success: true
  }
}
// 删除文章
export async function deleteArticle (ctx) {
  const { id } = ctx.request.body
  await Article.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在')
    } else {
      this.throw(500, '服务器内部错误')
    }
  })
  ctx.body = {
    success: true
  }
}
// 发布文章
export async function publishArticle (ctx) {
  const { id } = ctx.request.body
  await Article.findByIdAndUpdate(id, {
    $set: {
      publish: true
    }
  }).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在')
    } else {
      this.throw(500, '服务器内部错误')
    }
  })
  ctx.body = {
    success: true
  }
}
// 撤销发布文章
export async function notPublishArticle (ctx) {
  const { id } = ctx.request.body
  await Article.findByIdAndUpdate(id, {
    $set: {
      publish: false
    }
  }).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在')
    } else {
      this.throw(500, '服务器内部错误')
    }
  })
  ctx.body = {
    success: true
  }
}

