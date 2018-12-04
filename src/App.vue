<template>
  <div id="app" class="app">
    <layout-header/>
    <div class="layout-main">
      <router-view></router-view>
    </div>
    <layout-footer/>
    <div class="layout-bg"></div>
  </div>
</template>

<script>
import layoutHeader from 'widgets/layout-header'
import layoutFooter from 'widgets/layout-footer'

export default {
  name: 'App',
  components: {
    layoutHeader,
    layoutFooter
  }
};
</script>
<style>

html, body, .app {
  height: 100%;
}
.layout-main {
  min-height: calc(100% - 350px - 80px);
  max-width: 640px;
  margin: 0 auto;
}
.layout-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("./assets/imgs/background-code2.png") no-repeat fixed top;
  background-size: cover;
  opacity: 0.1;
  filter: blur(2px);
  z-index: -1;
}
</style>

