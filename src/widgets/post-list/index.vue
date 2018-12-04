<template>
  <ul class="posts-list">
    <li>
      <router-link class="title" to="/post">免费SSL证书升级全站HTTPS</router-link>
      <span class="createTime">（October 2018）</span>
    </li>
    <li>
      <router-link class="title" to="/post">免费SSL证书升级全站HTTPS</router-link>
      <span class="createTime">（October 2018）</span>
    </li>
    <li>
      <router-link class="title" to="/post">免费SSL证书升级全站HTTPS</router-link>
      <span class="createTime">（October 2018）</span>
    </li>
  </ul> 
</template>

<script>
export default {
  name: 'posts-list'
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

