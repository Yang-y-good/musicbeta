<template>
  <div id="comment">
    <nav-bar>
      <div slot="left" class="left">
        <img src="~assets/image/detail/zuojiantou.svg" @click="backclick()" />
      </div>
      <div slot="center" class="center">评论({{ commentCount }})</div>
      <div slot="right" class="right">
        <img src="~assets/image/detail/shares.svg" @click="showShare = true" />
      </div>
    </nav-bar>

    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />

    <div class="com-nav-bar">
      <span>评论区</span>
    </div>

    <div class="aaaaa">
      <div class="comentes" v-for="(item, index) in commentslist" :key="index">
        <div class="com-left">
          <img :src="item.user.avatarUrl" alt="icon" />
        </div>
        <div class="com-right">
          <span class="nickname">{{item.user.nickname}}</span>
          <span class="likedCount">
            {{item.likedCount}}
            <img src="../../assets/image/detail/likedCount.svg" alt="likedCount">
          </span>
          <p class="time">{{item.time}}</p>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";

import { ShareSheet, Toast } from "vant";
import { formatDate } from "./utils";

import { getcomment } from "../../network/axios";
export default {
  name: "Comment",
  props: {},
  data() {
    return {
      commentCount: 0,
      commentslist: 0,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      // Comments: ["最新", "最热", "推荐"],
    };
  },
  components: {
    NavBar,
    ShareSheet,
  },
  created() {
    this.id = this.$route.query.comentid;
    console.log(this.id);
    this.getcomment(this.id);
  },
  mounted() {},
  methods: {
    //返回上一级路由
    backclick() {
      history.back();
    },

    onSelect(options) {
      // Toast(options.name);
      switch (options.name) {
        case "微信":
          Toast(options.name);
          break;
        case "微博":
          Toast(options.name);
          break;
        case "QQ":
          Toast(options.name);
          break;
      }
      this.showShare = false;
    },

    //请求歌单评论信息
    getcomment(id, limit) {
      getcomment(id, limit)
        .then((res) => {
          //获取评论数量
          this.commentCount = res.total;
          //获取评论数据
          // this.list.splice(this.list.length,0,res.comments);
          
          this.commentslist = res.comments;
          console.log(this.commentslist);
          this.showDate();
        })
        .catch((error) => {
          Toast("评论数据获取出错，请重新刷新！");
        });
    },
    indexclick(index) {
      console.log(index);
    },

    //将时间戳转换为日期
    showDate() {
      this.commentslist.forEach((item) => {
        const date = new Date(item.time);
        item.time = formatDate(date, "MM月dd日");
      });
    },
  },
};
</script>

<style scoped>
.nav-bar {
  margin-top: 0px;
  background-color: white;
}
.com-right {
  padding: 5px;
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

.com-nav-bar {
  position: fixed;
  width: 100%;
  top: 44px;
  line-height: 40px;
  background-color: white;
  padding: 10px 0 0 10px;
}
.aaaaa {
  margin-top: 100px;
}
.comentes {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.com-left {
  width: 15%;
  margin-left: 10px;
}
.com-right {
  flex: 1;
  border-bottom: 1px solid #eee;
}

.com-left img {
  height: 40px;
  border-radius: 20px;
  vertical-align: top;
}
.nickname {
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
}
.likedCount {
  float: right;
  margin-right: 10px;
}
.likedCount img {
  height: 20px;
  vertical-align: bottom;
}
.time {
  font-size: 10px;
  margin-bottom: 10px;
  color: #999;
}
</style>