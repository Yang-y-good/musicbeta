<template>
  <div id="Music-Play" v-if="Object.keys($store.state.songdata).length !== 0">
    <div class="left">
      <img :src="songdatachange.picUrl" alt="img" />
    </div>
      <div class="center">
        <span class="song-name">{{ songdatachange.name}}</span>
        <span class="artosts-name" v-if="songdatachange.song">{{
       " - " + songdatachange.song.artists[0].name
      }}</span>
      </div>
    <div class="right">
      <van-circle
        v-model="currentRate"
        :rate="100"
        :speed="200"
        :text="text"
        style="height: 40px"
        layer-color="#ccc"
      ></van-circle>
    </div>
  </div>
</template> 

<script>
import { Circle } from "vant";

export default {
  name: "Music-Play",
  props: {
    findheight: Number,
  },
  data() {
    return {
      currentRate: 0,
      progress: 0,
    };
  },
  components: {
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    //计算属性监听数据变化
    songdatachange() {
      return this.$store.state.songdata;
    },

    text() {
      //获取时间进度条
      this.progress = Math.trunc(
        this.$store.state.progressScaleX * 100
      ).toString();

      this.currentRate = this.progress * 1;
      return this.progress + '%' || 0;
    },
  },
};
</script>

<style scoped>
#Music-Play {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  border-top: 1px solid #eee;
  background-color: #fff;
  z-index: 999;
  
}
.left{
  width:40px;
}
.left > img {
  height: 40px;
  border-radius: 20px;
}
.center {
  padding-left: 20px;
  display: inline-block;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 40px;
}
.song-name {
  font-size: 14px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.artosts-name {
  font-size: 12px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #999;
}
</style>