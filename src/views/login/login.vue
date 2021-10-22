<template>
  <div id="login">
    <div class="main-login">
      <h3 class="title">网抑云音乐</h3>
      <!-- <form action='/' class="user_input_form"> -->
      <div class="username_box">
        <input
          class="username_input"
          type="text"
          name
          placeholder="手机号"
          v-model="userinfo.username"
        />
      </div>
      <div class="password_box">
        <input
          class="password_input"
          type="password"
          name
          placeholder="密码"
          v-model="userinfo.password"
        />
      </div>
      <div class="submit_box">
        <input
          class="submit_input"
          type="submit"
          name
          value="登录"
          @click="login()"
        />
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getphone } from "../../network/axios";
export default {
  name: "login",
  data() {
    return {
      userinfo: {
        username: "",
        password: "",
      },
      profile: {},
    };
  },
  components: {},
  created() {
    //vue实列对象
    console.log(this);
  },
  mounted() {},
  methods: {
    getphone(phone, password) {
      getphone(phone, password).then((res) => {
        console.log(res);
        // 判断登陆信息
        if (res.code == 400) {
          Toast("请输入正确的手机号和密码");
          //登陆状态码
        } else if (res.code == 502) {
          //弹出相对信息
          Toast(res.message);
        } else if (res == undefined) {
        } else if (res.code == 200) {
          Toast.success("登陆成功");
          // 保存个人信息
          this.profile = res.profile;
          //登陆成功跳转路由
          this.$router.push("profile");
          //提交信息至vuex
          // this.$store.commit("profile", res.profile);
          //存储用户个人信息
          window.sessionStorage.setItem(
            "userinfo",
            JSON.stringify(res.profile)
          );
          console.log(res);
        }
      }).catch((error) =>{
        Toast('网络较慢或无网络可用');
      });
    },
    login() {
      Toast.loading({
        message: "登陆中...",
        forbidClick: true,
      });
      // this.getphone(this.userinfo.username, this.userinfo.password);
      this.getphone(this.userinfo.username, this.userinfo.password);
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
input {
  background: none;
  outline: none;
  border: 1px solid #ccc;
}
input:focus {
  border: none;
  border-bottom: 1px solid blue;
}
/* html,body{
  width: 100vh;
  height: 100vh;
  background: blue;
} */
#login {
  height: 100vh;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-login {
  background-color: #fff;
  width: 350px;
  height: 500px;
  border-radius: 15px;
  text-align: center;
}
.main-login .title {
  margin-top: 50%;
  text-align: center;
  margin-bottom: 30px;
  font-size: 25px;
}
.main-login .submit_box {
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 10px;
  text-align: center;
  border-radius: 10px;
}
.main-login .username_box {
  height: 50px;
}
.username_input {
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid red;
}
.password_input {
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid red;
  margin-bottom: 20px;
}
.submit_input {
  height: 30px;
  width: 200px;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee, #fbc2eb);
  border-radius: 10px;
  border-bottom: none !important;
}
</style>