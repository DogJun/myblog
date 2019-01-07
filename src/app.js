import Vue from 'vue'
import App from './App.vue'
import hljs from 'highlight.js'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import './assets/styles/common.css'
import './assets/styles/markdown.css'
import './assets/highlight-style/solarized-light.css'

Vue.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  })
})

export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    render: h => h(App)
  })
  // 返回 app 和 router
  return { app, router, store }
}
