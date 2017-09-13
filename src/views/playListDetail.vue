<template>
  <div>
    <div class="cont-top">
    <div class="bac-head">
      <span @click="back">返回</span>
    </div>
      <div class="bag-img"></div>
      <div class="cont-left">
         <img class="img-logo" :src="coverImgUrl + '?param=300y300'" alt="">
          <span>{{playCount | formatCount}}</span>
      </div>
      <div class="cont-right">
        <p class="titile">{{name}}</p>
        <p class="mu-avatar-inner">
        <img :src="creator.avatarUrl + '?param=50y50'">
        <span>{{creator.nickname}}</span>
        </p>
      </div>
    </div>
    <div class="load-per" v-if="load_flg">
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
    </div>
    <div class="cont-main"  v-if="!load_flg">
      <div>
      <audio src="http://m7c.music.126.net/20170910140525/7d8e807c89cb450c9804f4d255468bd2/ymusic/1909/c301/196c/76d24b651a88a13622de428a4ae3ee5d.mp3" id="audio"></audio>
      </div>
      <div class="list" v-for="(item, index) in list" :key="item.id" @click="playAudio(item)">
        <span class="list-lt">{{index + 1}}</span>
        <div class="list-rt">
          <p>{{item.name}}</p>
          <p>Hans Zimmer</p>
        </div>
      </div>
    </div>

  </div>
</template>
  <script>
  import axios from 'axios'
  import urls from '../common/requestURL'

  export default{
    data () {
      return {
        coverImgUrl: '../../static/default_cover.png',
        name: '歌单标题',
        id: 0,
        fname: '歌单',
        playCount: this.$router.playCount,
        description: '描述描述',
        creator: {
          'avatarUrl': '../../static/user-default.png',
          'nickname': '昵称'
        },
        list: [],
        opacity: 0,
        value: 0,
        load_flg: true,
        url: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
         // 判断过来的路由是否带有对应的参数信息
        if (to.params.coverImg) {
           // 获取songList传入的数据
          vm.coverImgUrl = vm.$route.params.coverImg
          vm.name = vm.$route.params.name
          vm.description = vm.$route.params.desc
          vm.playCount = vm.$route.params.count
          vm.creator = vm.$route.params.creator
          vm.id = vm.$route.params.id
        }
      })
    },
    mounted () {
      this.getList()
    },
    components () {
    },
    methods: {
      getList () {
        axios({
          method: 'post',
          url: urls.getPlayListDetail(this.$route.params.id, 6, 6),
          data: {
          }
        }).then(response => {
          console.log('response.=' + response.data.playlist.tracks)
          this.list = response.data.playlist.tracks
          this.load_flg = false
        }).catch(function (error) { // ES5用  function
          console.log('加载歌单信息出错:' + error)
        })
      },
      back () {
        this.$router.go(-1)
      },
      playAudio (song) {
        document.getElementById('audioPlay').pause()
      }
    }
  }
  </script>
  <style lang="less">
   p{
    margin: 0;
    padding: 0;
   }
   .load-per{
    .loading {
      position: absolute;
      left: 40%;
      top:37%;
      background: #fff;
      width: 1.5rem;
      height: 1.5rem;
      transform: translate(-50%,-50%);
      background: url('../../static/rage_loading.png') no-repeat;
      background-size: cover;
      -webkit-animation: rotating 5s  linear infinite;
      animation: rotating 5s linear infinite;
    }
    .loading-txt {
      position: absolute;
      top:0;
      color: #4a4a4a;
      margin-top: 87%;
      width: 100%;
      text-align:center;
      font-size: .2rem;
    }
  }
  @keyframes rotating {
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
  }
  .cont-top{
    .bac-head{
      height: .88rem;
      width: 100%;
      position: fixed;
      line-height: .88rem;
      color: #fff;
      font-size: .32rem;
      z-index: 999;
      span{
        display: inline-block;
        margin-left: .2rem;
      }
    }
    .bag-img{
      position: relative;
      height: 4.5rem;
      background: url(http://p1.music.126.net/qFYxOUjw2t9XOy33NtaulA==/19227159835245744.jpg?param=300y300;) no-repeat;
      background-size: cover;
      border: 1px solid #ddd;
      filter: blur(40px);
      -webkit-filter: blur(40px);
      border: 1px solid #ddd;
    }
    .cont-left{
       position: absolute;
        top: 1.5rem;
        left: .2rem;
      .img-logo{
        width: 2.8rem;
       }
      span{
        position: absolute;
        top:.1rem;
        right: .2rem;
        color: #fff;
      }
    }
    .cont-right{
      position: absolute;
      top: 1.5rem;
      right: .4rem;
      width: 3.5rem;
      color: #fff;
      font-size: .26rem;
      span{
        margin-left: .1rem;
      }
      .mu-avatar-inner{
        margin-top: .2rem;
      }
      img{
        vertical-align: middle;
      }
    }
  }
.list{
   height: 1.2rem;
   border-bottom: 2px solid #ddd;
  .list-lt{
    display: inline-block;
    float: left;
    width: 14%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: .3rem;
  }
  .list-rt{
    display: inline-block;
    float: left;
    width: 86%;
    margin-top: .3rem;
  }
}
  </style>
}
