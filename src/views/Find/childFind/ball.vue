<template>
  <div id="ball">
    <div
      class="ball-scroll"
      v-for="(item, index) in imglist"
      :key="item.index"
      @click="onclick(index)"
    >
      <p>
        <img :src="item.imgurl" alt="icon" />
      </p>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
import { getball } from "../../../network/axios";
export default {
  name: "ball",
  data() {
    return {
      ball: [],
      font: [
        "每日推荐",
        "歌单",
        "排行榜",
        "直播",
        "电台",
        "火前留名",
        "数字专辑",
        "新说唱",
        "线上演出",
      ],
      imglist: [
        {
          name: "recom",
          text: "每日推荐",
          imgurl: "",
        },
        {
          name: "songlist",
          text: "歌单",
          imgurl: "",
        },
        {
          name: "charts",
          text: "排行榜",
          imgurl: "",
        },
        {
          name: "live-telecast",
          text: "直播",
          imgurl: "",
        },
        {
          name: "station",
          text: "电台",
          imgurl: "",
        },
        {
          name: "huo",
          text: "火前留名",
          imgurl: "",
        },
        {
          name: "number",
          text: "数字专辑",
          imgurl: "",
        },
        {
          name: "rap",
          text: "新说唱",
          imgurl: "",
        },
        {
          name: "online",
          text: "线上演出",
          imgurl: "",
        },
      ],
    };
  },
  components: {},
  created() {
    this.getImage();
  },
  mounted() {},
  methods: {
    //获取图片地址
    getImage() {
      this.imglist.forEach((item) => {
        // 将图片地址存入当前对象中
        item.imgurl = require("../../../assets/image/find/" +
          item.name +
          ".jpg");
      });
    },

    onclick(index) {
      console.log(index);
      console.log(this.font[index]);
    },
  },
};
</script>

<style scoped>
#ball {
  margin-top: 10px;
  width: 100%;
  height: 83px;
  display: flex;
  /* 内容超出则可以滚动 */
  overflow-x: auto;
  /*适应苹果*/
  -webkit-overflow-scrolling: touch;
  align-items: center;
  text-align: center;
}
/* 隐藏滚动条 */
#ball::-webkit-scrollbar {
  display: none;
}
.ball-scroll {
  margin: 10px 25px;
  scrollbar-width: none;
}
.ball-scroll img {
  width: 35px;
  height: 35px;
  background-color: red;
  border-radius: 15px;
  margin-bottom: 5px;
}
.ball-scroll span {
  font-size: 12px;
  white-space: nowrap;
  display: inline-block;
}
</style>