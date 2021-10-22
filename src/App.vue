<template>
  <div id="app">
    <!-- 当前路由不是login的隐藏魔板 -->
    <my-nav-bar v-show="(path === '/profile' || path === '/find' || path === '/other' || path === '/voide')" class="nav-bar"></my-nav-bar>
    <music-play/>
    <!-- //排除login模板缓存 -->
    <!-- <keep-alive exclude="login" > -->
      <!-- <router-view class="view"/> -->
    <!-- </keep-alive> -->
            <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="view"></router-view>
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" class="view"></router-view>
<MusicPlay/>
     <!-- controls显示浏览器默认原生播放器  autoplay 音频就绪后立即播放 -->
    <audio :src="this.$store.state.songurl" id="audio" autoplay></audio> 
  </div>
</template>

<script>
import MyNavBar from "./components/content/Navbar/MyNavBar";
import MusicPlay from "@/components/common/MusicPlay";
export default {
  name: "App",
  data() {
    return {
      path: "",
    };
  },
  components: {
    MyNavBar,
    MusicPlay
  },
  mounted() {
    // //判断当前路由
    // this.path = this.$route.path;
    // console.log(this.$route.path);
  },
  watch: {
    // 使用watch监测变化
    $route(to, from) {
      this.path = to.path;
    },
  },
};
</script>
<style>
@import './assets/css/base.css';
.view{
  margin-top: 44px;
}
.nav-bar{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  
}
</style>
