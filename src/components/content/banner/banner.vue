<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.index">
        <img :src="item.imageUrl" />
        <span :style="{ background: item.titleColor }">{{
          item.typeTitle
        }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getbanner } from "../../../network/axios";
export default {
  name: "banner",
  data() {
    return {
      banner: [],
    };
  },
  components: {},
  created() {
    this.getbanner();
  },
  mounted() {},
  methods: {
    getbanner() {
      getbanner().then((res) => {
        this.banner = res.banners;
      }).catch((error) =>{
        Toast('网络较慢或无网络可用');
      });
    },
  },
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  text-align: center;
}
.van-swipe-item img {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.van-swipe-item span {
  position: absolute;
  right: 0px;
  bottom: 4px;
  padding: 3px;
  font-size: 14px;
  z-index: 999;
  border-bottom-right-radius: 10px;
}
</style>