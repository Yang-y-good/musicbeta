<template>
  <div id="ComShare">
    <div>
      <img src="~assets/image/detail/comment.svg" @click="Comclick(recomId)" :title="666"/>
      <p >{{$store.state.comShare[0]}}</p>
    </div>
    <div>
      <img src="~assets/image/detail/shares.svg"/>
      <p>{{$store.state.comShare[1]}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComShare",
  props: {
    recomId:String
  },
  data() {
    return {
      message:'评论'
    };
  },
  components: {},
  mounted() {
  },
  methods: {
    Comclick(Comclick){
     this.$router.push({
       path:'/comment',
       query:{
         comentid:this.recomId
       }
     })
    }
  },
};
</script>

<style scoped>
#ComShare {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
#ComShare > div {
  display: inline-block;
  height: 70px;
}
#ComShare > div > img {
  height: 25px;
}
#ComShare > div > p {
  padding-top: 3px;
  font-size: 14px;
  color: #1296db;
}
</style>