import storage from 'good-storage'

const ARTICLE_LIST_KEY = '__articleList__'

// 保存articleList到sessionStorage
export function saveArticleList (articleList) {
  storage.session.set(ARTICLE_LIST_KEY, articleList)
  return articleList
}
// 读取articleList
export function loadArticleList () {
  return storage.session.get(ARTICLE_LIST_KEY, [])
}
