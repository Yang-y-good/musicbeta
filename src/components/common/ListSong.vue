<template>
  <div id="newmusic" ref="comshare">
    <div class="songlist" v-for="(item, index) in playlist_tracks" :key="index">
      <div class="left">
        <img :src="item.al.picUrl" />
      </div>
      <div class="center">
        <span class="song-name">{{ item.name + " - " }}</span>
        <span class="artist-name">{{ item.ar[0].name }}</span>
      </div>
      <div class="right">
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
  </div>
</template>
<script>
import { Toast } from "vant";
import { getrecomdetail, getsongurl, getsongdetail } from "../../network/axios";
export default {
  name: "newmusic",
  props: {
    recomId: String, //歌单id
  },
  data() {
    return {
      playlist_tracks: "",
      currentindex: null,
      commentCount: "",
      shareCount: "",
      songid: [],
      songurl: [],
      audio: "",
      playing: false, // 播放状态
      bufferedScaleX: 0, // 缓存进度
      progressScaleX: 0, // 播放进度
    };
  },
  created() {
    this.getrecomdetail(this.recomId);
  },
  components: {},
  mounted() {
    // audio的DOM结构获取需要在mounted中，在created中话会变成 <audio :src="song.url" id="audio" controls autoplay></audio>
    this.audio = document.getElementById("audio");
    console.log(this.audio);
    this.audioInit();
  },
  methods: {
    //请求歌单详情
    getrecomdetail(id) {
      getrecomdetail(id)
        .then((res) => {
          console.log(res);
          //获取歌单播放列表
          this.playlist_tracks = res.playlist.tracks;
          console.log(this.playlist_tracks);
          // this.getsongurl(this.playlist_tracks.id)
          //获取歌单评论人数
          this.commentCount = res.playlist.commentCount;
          //获取歌单分享人数
          this.shareCount = res.playlist.shareCount;
          //获取歌单歌曲id
          this.songid = res.privileges;
          console.log(this.songid);
          // 将评论和分享数量提交至store
          this.$store.commit("ComShare", [this.commentCount, this.shareCount]);
        })
        .catch((error) => {
          Toast("网络较慢或网络不可用");
        });
    },
    //获取歌曲链接
    getsongurl(id) {
      getsongurl(id)
        .then((res) => {
          console.log(res);
          this.songurl = res.data[0].url;
          console.log(this.songurl);
          this.$store.dispatch("getsongurl", this.songurl);
        })
        .catch((error) => {
          console.log("网络出错，请重试！");
        });
    },

    //获取歌曲详情数据
    getsongdetail(ids) {
      getsongdetail(ids).then((res) => {
        console.log(res.songs[0].al);
        this.$store.dispatch("increment", res.songs[0].al);
      });
    },
    //歌曲点击事件
    playsong(index) {
      this.currentindex = index;
      console.log(index);
      console.log(this.songid[index].id);
      this.getsongdetail(this.songid[index].id);
      this.getsongurl(this.songid[index].id);
    },

    //音频事件初始化
    audioInit() {
      this.audio.addEventListener("timeupdate", () => {
        // console.log(audio.duration || 0);
        // console.log((this.audio.currentTime));
        // console.log((this.audio.currentTime / this.audio.duration).toFixed(3));
        let progress = (this.audio.currentTime / this.audio.duration).toFixed(
          3
        );
        this.$store.dispatch("getpress", progress);
      });
    },
  },
};
</script>

<style scoped>
.songlist {
  display: flex;
  height: 80px;
  line-height: 44px;
}
.left > img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 5px;
  vertical-align: middle;
  margin-left: 10px;
}
.left,
.right {
  width: 70px;
}
.center {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artist-name {
  font-size: 12px;
  color: #aeaeae;
}
.playsong {
  width: 30px;
  vertical-align: middle;
}
</style>