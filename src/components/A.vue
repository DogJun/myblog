<template>
  <div class="a">1111{{ item }}</div>
</template>

<script>
export default {
  name: 'A',
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id);
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.items[this.$route.params.id];
    }
  }
};
</script>

<style lang="postcss" scoped>
.a {
  color: var(--mainColor);
}
</style>

