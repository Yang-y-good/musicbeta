<template>
  <div id="recommend">
    <div class="recom-img" v-for="(item, index) in recommend" :key="item.index">
      <img :src="item.picUrl" alt="img" @click="getrecomid(index)" />
      <i>{{ item.playCount }}</i>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { getrecommend } from "../../../network/axios";
export default {
  name: "recommend",
  data() {
    return {
      recommend: [],
    };
  },
  components: {},
  created() {
    this.getrecommend();
  },
  mounted() {},
  methods: {
    //请求歌单数据
    getrecommend() {
      getrecommend().then((res) => {
        this.recommend = res.result;
        this.getnumber();
      }).catch((error) =>{
        Toast('网络较慢或无网络可用');
      });
    },

    //对数字进行简化取整
    getnumber() {
      this.recommend.forEach((item) => {
        item.playCount = Math.round(item.playCount / 10000) + "万";
      });
    },

    getrecomid(index) {
      // console.log(this.recommend[index].id);
      this.$router.push({
        path:'/detail',
        query: {
          recomId: this.recommend[index].id,
        },
      });
    },
  },
};
</script>

<style scoped>
#recommend {
  margin-top: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  flex-direction: row;
}
#recommend::-webkit-scrollbar {
  display: none;
}
.recom-img {
  position: relative;
  padding: 0 3px 0 10px;
}
.recom-img > img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}

.recom-img > i {
  position: absolute;
  top: 2px;
  right: 8px;
  z-index: 999;
  color: #fff;
  font-size: 12px;
}
.recom-img > i::before {
  margin-right: 2px;
  display: inline-block;
  content: "";
  background-image: url(../../../assets/image/find/icon-play.svg);
  height: 18px;
  width: 18px;
  background-size: 18px;
  /* 图片跟文字垂直居中 */
  vertical-align: middle;
}
.recom-img > span {
  font-size: 12px;
}
</style>