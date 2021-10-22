<template>
  <div class="Profile">
    <div class="profile_name" v-if="!Object.keys(this.profile).length==0">
      <div class="left">
        <img :src="profile.avatarUrl" alt="头像" />
      </div>
      <div class="center">
        <span>{{profile.nickname}}</span>
        <p class="level">
          <span>{{'LV.'+level}}</span>
        </p>
      </div>
      <div class="right">
        <img src="../../assets/image/youjiantou.svg" />
      </div>
    </div>

    <div class="profile_name" v-else>
      <div class="left">
        <img src="../../assets/image/chushitouxiang.svg" alt="头像" />
      </div>
      <div class="center" @click="login">
        <span class="profile_login">立即登录</span>
      </div>
      <div class="profile_right">
        <img src="../../assets/image/youjiantou.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { getdetail } from "../../network/axios";
export default {
  name: "Profile",
  data() {
    return {
      profile: {},
      level: "",
      isShow: false,
    };
  },
  created() {
    console.log("-------created-------");
    //获取个人信息
    // this.profile = this.$store.state.profile;
    // console.log(this.$store.state.profile);

    //判断本地是否有用户信息
    if (sessionStorage.getItem("userinfo")) {
      let item = sessionStorage.getItem("userinfo");
      // 将json转换成对象
      this.profile = JSON.parse(item);
      console.log(this.profile);
    }

    //判断有无数据
    if (this.profile) {
      // 传入用户id,获取用户等级
      this.getdetail(this.profile.userId);
    }

    
  },
  components: {},
  mounted() {},
  methods: {
    /**
     * 请求相关
     */
    // 请求用户详情
    getdetail(uid) {
      getdetail(uid).then((res) => {
        //存储用户等级
        if (res) {
          this.level = res.level;
        }
      });
    },

    //跳转登录界面
    login() {
      this.$router.push("login");
    },
  },
  computed: {},
};
</script>
<style scoped>
.profile_name {
  display: flex;
  height: 80px;
  background-color: #eee;
}
.left,
.right {
  width: 100px;
  text-align: center;
}
.center {
  flex: 1;
  margin-top: 20px;
}
.left > img {
  width: 50px;
  border-radius: 25px;
  margin-top: 20px;
}
.right > img {
  text-align: center;
  width: 25px;
  margin-top: 35px;
  float: right;
  margin-right: 15px;
}
.level {
  width: 30px;
  height: 20px;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}
.level span {
  font-size: 12px;
  font-style: italic;
  font-weight: 500;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.profile_login {
  display: inline-block;
  line-height: 45px;
  font-weight: 700;
  font-size: 17px;
}
.profile_right {
  width: 180px;
}
.profile_right > img {
  width: 20px;
  margin-top: 31px;
}
</style>