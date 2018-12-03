import { createApp } from './main.js'

// 核心的目的有2个
// 摘取每一个当前路由 index/test -> vue router => components
// components 异步的数据组装成一个页面
export default context => {
  return new Promise ((resolve, reject) => {
    const {app, router, store} = createApp()
    // 后台真实的路由
    router.push(context.url)
    router.onReady(() => {
      const matchComponents = router.getMatchedComponents()
      Promise.all(matchComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store
          })
        }
      }))
      .then(() => {
        context.state = store.state
        resolve(app)
      })
      .catch(reject)
    }, reject)
  })
}