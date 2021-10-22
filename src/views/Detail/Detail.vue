<template>
  <div id="Detail">
    <!-- 标题栏 -->
    <nav-bar class="nav-bar">
      <div slot="left" class="left">
        <img src="~assets/image/detail/zuojiantou.svg" @click="backclick()" />
      </div>
      <div slot="center" class="center">歌单</div>
      <div slot="right" class="right">
        <img
          src="~assets/image/detail/comment.svg"
          @click="Comclick(recomId)"
        />
      </div>
    </nav-bar>
    <!-- 歌曲模块 -->
    <list-song :recomId="recomId" ref="comshare" />
    <!-- 评论分享模块 -->
    <!-- <com-share
      :commentCount="commentCount"
      :shareCount="shareCount"
      :recomId='recomId'
    /> -->
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import ListSong from "@/components/common/ListSong";
import ComShare from "./childDetail/ComShare";
export default {
  name: "Detail",
  props: {},
  data() {
    return {
      recomId: "",
      commentCount: 0,
      shareCount: 0,
    };
  },
  components: {
    NavBar,
    ListSong,
    ComShare,
  },
  created() {
    console.log('created');
    this.recomId = this.$route.query.recomId;
  },
  mounted() {
    // setTimeout(() => {
    //   this.commentCount = this.$store.state.comShare[0];
    //   console.log(this.commentCount);
    // }, 500);
  },
  methods: {
    //返回上一级路由
    backclick() {
      history.back();
    },

    //跳转评论页面
    Comclick(Comclick) {
      this.$router.push({
        path: "/comment",
        query: {
          comentid: this.recomId,
        },
      });
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: white;
}
.nav-bar {
  line-height: 44px;
}
.right > img {
  height: 25px;
  vertical-align: middle;
  padding-left: 30px;
}
.left > img {
  height: 25px;
  vertical-align: middle;
  padding-left: 5px;
}
.center {
  color: #1296db;
}
</style>