<template>
  <div class="home">
    <layout-line title="CODING"/>
    <post-list/>
    <layout-line title="SHARING"/>
    <post-list/>
    <layout-line title="NOTES"/>
    <post-list/>
  </div>
</template>
<script>
import layoutLine from 'widgets/layout-line'
import postList from 'widgets/post-list'
export default {
  name: 'home',
  components: {
    layoutLine,
    postList
  }
}
</script>
<style lang="postcss" scoped>
.home {
  padding: 0 10px;
}

</style>


