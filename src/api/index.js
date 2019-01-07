import request from 'utils/request'
// 获取文章列表
export const getAllArticle = (data = {}) => {
  return request.get('/article/getPublishArticle', data)
}
// 获取文章
export const getArticle = (data = {}) => {
  return request.get('/article/getArticle', data)
}
