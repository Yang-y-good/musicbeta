<template>
  <div id="newmusic">
    <div
      v-for="(item, index) in newmusic"
      :key="item.index"
      class="newmusic-main"
    >
      <img :src="item.picUrl" />
      <div class="center">
        <span class="song-name">{{ item.name + " - " }}</span>
        <span class="artist-name">{{ item.song.artists[0].name }}</span>
      </div>
      <img
        src="~assets/image/find/songplay.svg"
        alt=""
        class="playsong"
        v-if="!(currentindex == index)"
        @click="playsong(index)"
      />
      <img
        src="~assets/image/find/songplay_active.svg"
        alt=""
        class="playsong"
        v-else
        @click="playsong(index)"
      />
    </div>
   
  </div>
</template>
<script>
import { getnewmusic, getsongurl } from "../../../network/axios";

export default {
  name: "newmusic",
  data() {
    return {
      newmusic: [],
      musicId: [],
      currentindex: null, //播放设置默认为空
      musicurl: [],
      audio: "",
      playing: false, // 播放状态
      bufferedScaleX: 0, // 缓存进度
      progressScaleX: 0, // 播放进度
    };
  },
  created() {
    this.getnewmusic();
  },
  components: {},
  mounted() {
    // audio的DOM结构获取需要在mounted中，在created中话会变成 <audio :src="song.url" id="audio" controls autoplay></audio>
    this.audio = document.getElementById("audio");
    console.log(this.audio);
    this.audioInit();
  },
  methods: {
    //请求音乐数据
    getnewmusic() {
      getnewmusic().then((res) => {
        this.newmusic = res.result;
        this.newmusic.splice(4, 6); //删除数组中6个的元素
        this.getsongid();
        this.NewSongName();
      });
    },

    //请求音乐url
    getsongurl(id) {
      getsongurl(id).then((res) => {
        let [{ url }] = res.data; //解构data对象里的音乐地址
        this.musicurl = url;
        // 提交歌曲url进行播放
        this.$store.dispatch("getsongurl", url);

        console.log(this.$store.state.songurl);
      });
    },

    //点击音乐事件
    playsong(index) {
      // this.play();
      this.currentindex = index;
      console.log(this.newmusic[index]);
      this.getsongurl(this.musicId[index]);
      // //提交歌曲数据到vuex
      this.$store.dispatch("increment", this.newmusic[index]);
    },

    //获取音乐id
    getsongid() {
      this.newmusic.forEach((item) => {
        this.musicId.push(item.id);
      });
    },

    //切割字符串
    NewSongName() {
      this.newmusic.forEach((item) => {
        if (item.name.split("").indexOf("(") != -1) {
          //将字符串分隔为数组
          let oldname = item.name.split("");
          //获取数组的长度
          let old_length = oldname.length;
          //获取数组指定元素位置的长度
          let oldnamelength = item.name.split("").indexOf("(");
          //分割指定位置后面的所有元素
          oldname.splice(oldnamelength, old_length - oldnamelength);
          //将分割完成的数组拼接成字符串
          item.name = oldname.join("");
        }
      });
    },

    //音频事件初始化
    audioInit(){
      this.audio.addEventListener('timeupdate', () => {
        // console.log(audio.duration || 0);
        // console.log((this.audio.currentTime));
        // console.log((this.audio.currentTime / this.audio.duration).toFixed(3));
        let progress =  (this.audio.currentTime / this.audio.duration).toFixed(3)
        this.$store.dispatch('getpress',progress)
      })
    },
    // 暂停与播放
    // play() {
    //   if (this.playing) {
    //     // 播放中,点击则为暂停
    //     this.playing = false;
    //     this.audio.pause();
    //   } else {
    //     // 暂停中,点击则为播放
    //     this.playing = true;
    //     this.audio.play();
    //   }
    // },
  },
};
</script>

<style scoped>
#newmusic {
  display: flex; /* 弹性布局 */
  margin-top: 20px;
  width: 100%;
  height: 80px;
  justify-content: space-between; /* 横向中间自动空间 */
  align-content: space-between; /* 竖向中间自动空间 */
  flex-wrap: wrap; /* 换行 */
}
.newmusic-main {
  width: 100%;
  height: 100%;
  padding: 10px 0px 10px 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.newmusic-main:nth-child(4) {
  margin-bottom: 40px;
}
.newmusic-main > img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 5px;
  vertical-align: middle;
}
.center {
  display: inline-block;
  width: 65%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.song-name {
  font-size: 15px;
}
.artist-name {
  font-size: 12px;
  color: #aeaeae;
}
.newmusic-main .playsong {
  position: absolute;
  right: 15px;
  width: 30px;
}
</style>