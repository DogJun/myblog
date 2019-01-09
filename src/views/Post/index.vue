<template>
  <div class="post">
    <h1 class="post__title">{{this.currentArticle.title}}</h1>
    <p class="post__createTime">{{this.currentArticle.createTime}}</p>
    <div class="post__content markdown-body" v-html="post" v-highlight></div>
  </div>
</template>

<script>
import marked from "marked"
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'post',
  created () {
    this.getArticleAction({
      id: this.$route.params.id
    }) 
  },
  methods: {
    ...mapActions(['getArticleAction'])
  },
  computed: {
    post: function () {
      return this.currentArticle.content ? marked(this.currentArticle.content) : ''
    },
    ...mapGetters(['currentArticle'])
  }
}
</script>

<style lang="postcss" scoped>
.post {
  padding: 0 20px;
  & .post__title {
    margin-bottom: 10px;
    text-align: center;
  }
  & .post__createTime {
    margin-bottom: 10px;
    color: gray;
    text-align: center;
  }
  & .post__content {
    margin-bottom: 40px;
  }
}
</style>


