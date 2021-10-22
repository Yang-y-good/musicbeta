<template>
  <div id="find">
   
      <banner />
      <ball />
      <div class="recommend">
        <span>推荐歌单</span>
      </div>
      <recommend />
      <div class="recommend">
        <span>推荐新音乐</span>
      </div>
    <newmusic />
    <!-- <music-play/> -->
  </div>
</template>

<script>
import banner from "@/components/content/banner/banner";
import MusicPlay from "@/components/common/MusicPlay";

import recommend from "./childFind/recommend";
import newmusic from "./childFind/newmusic";
import ball from "./childFind/ball";
export default {
  name: "Find",
  data() {
    return {
      findheight: 0,
    };
  },
  components: {
    banner,
    MusicPlay,
    ball,
    recommend,
    newmusic,
  },
  created() {
    
  },
  mounted() {
    // setTimeout(() => {
    //   this.getFindHeght();
    // }, 1000);
  },
  methods: {
    // getFindHeght() {
    //   this.findheight = document.body.clientHeight;
    //   console.log(this.findheight);
    // },
  },
};
</script>

<style scoped>
.find {
  position: relative;
  margin-top: 44px;
}
.recommend {
  padding: 10px 25px 0px 25px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
}
</style>