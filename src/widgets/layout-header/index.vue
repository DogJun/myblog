<template>
  <header>
    <img class="avatar" :src="require('../../assets/imgs/avatar.jpeg')" alt="avatar">
    <p class="name">DogJun@1995</p>
    <p class="description">A Front-end developer passionate about coding and sharing!</p>
    <ul class="navigations">
      <router-link to="/" tag="li">
        <i class="iconfont icon-home" title="回到首页"></i>
      </router-link>
      <router-link to="/post" tag="li">
        <i class="iconfont icon-article" title="全部文章"></i>
      </router-link>
    </ul>
  </header>
</template>
<script>
export default {
  name: "layout-header"
};
</script>
<style lang="postcss" scoped>
header {
  position: relative;
  width: 100%;
  height: 350px;
  padding: 40px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  & .avatar {
    margin: 0 auto;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    opacity: 0.6;
  }
  & .name {
    margin: 20px 0;
    font-weight: bold;
  }
  & .description {
    padding: 0 20px;
    color: #65737e;
  }
  & .navigations {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    list-style: none;
    & li {
      margin: 10px 20px;
      cursor: pointer;
      transition: all .3s;
      & .iconfont {
        font-size: 24px;
      }
    }
    & li:hover {
      transform: scale(1.5);
    }
  }
}
</style>

