import Vue from 'vue'
import Vuex from 'vuex'
import { getAllArticle, getArticle } from '../api'
import * as types from './mutation-types'
// import { loadArticleList, saveArticleList } from 'utils/cache'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      articleList: [],
      currentArticle: {}
    },
    getters: {
      articleList: state => state.articleList,
      currentArticle: state => state.currentArticle
    },
    actions: {
      getAllArticleAction ({commit}) {
        return getAllArticle().then(res => {
          if (res && res.success) {
            commit(types.GET_ALL_ARTICLE, res.data)
          }
        })
      },
      getArticleAction ({commit}, data) {
        return getArticle(data).then(res => {
          if (res && res.success) {
            commit(types.GET_ARTICLE, res.data)
          }
        })
      }
    },
    mutations: {
      [types.GET_ALL_ARTICLE] (state, data) {
        state.articleList = data.articleList
        // if (window) {
        //   saveArticleList(data.articleList)
        // }
      },
      [types.GET_ARTICLE] (state, data) {
        console.log(data)
        state.currentArticle = data.article
      }
    }
  })
}
