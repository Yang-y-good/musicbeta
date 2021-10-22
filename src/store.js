import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comShare:[],
    songdata:[],
    songurl:'',
    //当前进度条
    progressScaleX:0
  },
  mutations: {
    ComShare(state,msg){
      state.comShare = msg;
    },
    //获取歌曲数据
    increment(state,msg){
      state.songdata = msg;
    },
    //获取音乐链接
    getsongurl(state,url){
      state.songurl = url;
    },
    //获取当前播放进度
    getpress(state,pro){
      state.progressScaleX = pro
    }
  },
  actions: {
    increment ({commit},data){
      commit('increment',data)
    },
    getsongurl({commit},url){
      commit('getsongurl',url)
    },
    getpress({commit},pro){
      commit('getpress',pro)
    }
  }
})
