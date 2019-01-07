<template>
  <div class="home">
    <layout-line title="CODING"/>
    <post-list :article="articleList"/>
    <!-- <layout-line title="SHARING"/>
    <post-list :article="article"/> -->
    <!-- <layout-line title="NOTES"/>
    <post-list :article="article"/> -->
  </div>
</template>
<script>
import layoutLine from 'widgets/layout-line'
import postList from 'widgets/post-list'
import axios from 'axios'
import { getAllArticle } from 'api'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      // article: []
    }
  },
  asyncData ({ store, route }) {
    // console.log(store.state)
    // 触发 action 后，会返回 Promise
    return store.dispatch('getAllArticleAction')
  },
  components: {
    layoutLine,
    postList
  },
  created () {
    // this._getAllArticle()
  },
  methods: {
    // _getAllArticle () {
    //   getAllArticle().then(res => {
    //     if (res && res.success) {
    //       this.article = res.data.articleList
    //     }
    //   })
    // }
  },
  computed: {
    ...mapGetters(['articleList'])
  }
}
</script>
<style lang="postcss" scoped>
.home {
  padding: 0 10px;
}

</style>


