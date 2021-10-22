<template>
  <div id="Search">
    <form action="/" class="search-form">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <div class="songs-main">
      <div
        class="songs-list"
        v-for="(item, index) in this.songs"
        :key="item.index"
        @click="onplay(index)"
      >
        <p>{{ item.name }}</p>
        <span v-for="itemartists in item.artists" :key="itemartists.index">{{
          itemartists.name + " - " + item.album.name
        }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { Search, Toast } from "vant";
import { getSearch, getsongurl } from "../../../network/axios";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      songs: {},
      songsurl: [],
    };
  },
  components: {
    Search,
  },
  mounted() {},
  methods: {
    //请求搜索数据
    getSearch(keywords) {
      getSearch(keywords).then((res) => {
        console.log(res);
        this.songs = res.result.songs;
      });
    },
    //请求音乐url
    getsongurl(id) {
      getsongurl(id).then((res) => {
        // 得到歌曲url
        this.songsurl = res.data[0].url;

        console.log(this.songsurl)

        this.$store.dispatch("getsongurl", this.songsurl);
      });
    },

    onSearch() {
      //调用请求传入用户搜索的内容
      this.getSearch(this.value);
    },
    //点击取消进行路由跳转
    onCancel() {
      this.$router.push("profile");
    },

    onplay(index) {

      // 传入歌曲id
      this.getsongurl(this.songs[index].id);
      console.log(this.songs[index])

      this.$store.dispatch("increment", this.songs[index]);
    },

    //播放
    audioplay(audio) {
      //判断音乐是否可用
      if (this.songsurl) {
        
      } else {
        Toast("音乐不可用");
      }
    },
    //重新加载
    onload() {
    },
  },
};
</script>

<style scoped>
.search-form {
  position: fixed;
  top: 0;
  width: 100%;
}
.songs-main {
  margin-top: 5px;
  width: 100%;
  height: 100%;
  /* padding-top: 54px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.songs-list {
  /* background-color: #eee; */
  padding: 10px 10px;
}
.songs-list :nth-child(1) {
  color: blue;
  margin-bottom: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songs-list :nth-child(2) {
  font-size: 12px;
  margin-right: 4px;
}
</style>