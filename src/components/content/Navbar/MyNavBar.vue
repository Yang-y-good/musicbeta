<template>
  <div class="MyNavBar">
    <nav-bar class="new-bar">
      <div slot="center" class="center">
        <div class="nav-center" >
          <span
            v-for="(item,index) in title"
            :key="index"
            @click="titleclick(index)"
            :class="{active: currentindex==index}"
          >{{item}}</span>
        </div>
      </div>
      <div slot="right" class="right" @click="searchckick">
        <img src="../../../assets/image/search.svg" />
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../common/NavBar";
export default {
  name: "MyNavBar",
  props:{
      isShow:{
          type:Boolean,
          default:true
      }
  },
  data() {
    return {
      title: ["我的", "发现", "云村", "视频"],
      path: ["/profile", "/find", "/other", "/voide"],
      currentindex: 0,
    };
  },
  components: {
    NavBar,
  },
  created(){
    // this.getpath();
  },
  mounted() {},
  watch: {
    $route(to, from) {
      // 监听路由
      this.currentindex=this.path.indexOf(to.path);
    },
  },
  computed:{
    
  },
  methods: {
    //判断标题点击
    titleclick(index) {
      // 判断下标是否相等
      this.currentindex = index;
      1
      this.$router.push(this.path[index]).catch((err) => err);
    },
    //搜索
    searchckick(){
      console.log('searchckick');
      this.$router.push('search');
    },
    getpath(){
      console.log(this.$route.path);
    }

  },
};
</script>

<style scoped>
.active {
  font-size: 16px;
  font-weight: 700;
}
.new-bar {
  text-align: center;
  background-color: #fff;
}
.nav-center {
  display: flex;
}
.nav-center span {
  flex: 1;
}
.right > img {
  width: 25px;
  vertical-align: middle;
}
</style>