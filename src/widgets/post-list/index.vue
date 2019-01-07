<template>
  <ul class="posts-list">
    <li v-for="item in article" :key="item.id">
      <router-link class="title" :to="'/post/' + item.id">{{item.title}}</router-link>
      <span class="createTime">（{{item.lastEditTime}}）</span>
    </li>
  </ul> 
</template>

<script>
export default {
  name: 'posts-list',
  props: {
    article: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.posts-list {
  margin-bottom: 30px;
  padding: 0 10px;
  list-style: none;
  & li {
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    & .title {
      color: #333;
      cursor: pointer;
      text-decoration: underline;
    }
    & .createTime {
      font-size: 12px;
    }
  }
}
</style>

