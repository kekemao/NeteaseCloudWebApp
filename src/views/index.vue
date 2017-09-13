<template>
  <div>
    <v-header :title='title' :tag='tag'></v-header>
    <div>
    <div class="load-per" v-if="load_flg">
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
    </div>
    <div v-if="!load_flg" class="mt">
      <swiper loop auto :list="baseList" :show-dots="true" :show-desc-mask="false" dots-position="center" class="ad-swiper"></swiper>
      <div class="wrapper">
        <div class="g-title song-list">
          推荐歌单<router-link :to="{path: '/index/songList'}">更多></router-link>
        </div>
        <div class="box">

          <div class="item" v-for="item in playlists" :key="item.id">
            <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}" class="links">
              <span class="tot-num">{{item.playCount | formatCount}}</span>
              <img :src="item.coverImgUrl + '?param=230y230'" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </div>
        </div>
        <div class="g-title mv">推荐MV <router-link :to="{}">更多></router-link></div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import header from '../components/HeaderBar.vue'
import {Swiper} from 'vux'
import axios from 'axios'
import urls from '../common/requestURL'

const baseList = [{
  url: 'https://www.baidu.com',
  img: '/static/banner1.jpg',
  title: '送你一朵话'
}, {
  url: 'https://www.baidu.com',
  img: '/static/banner2.jpg',
  title: '送你一辆车'
}, {
  url: 'https://www.baidu.com',
  img: '/static/banner3.jpg',
  title: '送你一次旅行'
}]

export default {
  components: {
    'v-header': header,
    Swiper
  },
  data () {
    return {
      tag: '时下流行',
      title: '网易云音乐',
      baseList: baseList,
      playlists: [],
      load_flg: true
    }
  },
  mounted () {
    axios({
      method: 'post',
      url: urls.getPlayListByWhere('全部', 'hot', 0, true, 6),
      data: {
      }
    }).then(response => {
      console.log(response.data.playlists)
      this.load_flg = false
      this.playlists = response.data.playlists
    }).catch(function (error) { // ES5用  function
      console.log(error)
    })
  },
  methods: {
    infinite () {

    },
    refresh () {

    }
  }
}
</script>
<style type="text/css" lang="less">;
  body, p{
    margin: 0;
    padding: 0
  }
  .links{
    display: inline-block;
    height: 100%;
    color: #333;
    text-decoration:none;
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
  .ad-swiper{
    height: 2.67rem;
    .vux-swiper{
        height: 2.67rem !important;
        width: 100%;
    }
  }
  .wrapper{
    padding: 0 .1rem;
     // 通用的标题样式
    .g-title {
      padding-left: .5rem;
      color: #333;
      height: .65rem;
      line-height: .65rem;
      font-size: .3rem;
      a {
        float: right;
        font-size: .28rem;
        color: #666;
        text-decoration:none;
      }
    }
    // 推荐歌单
    .song-list {
      background: url("../../static/aei.png") no-repeat left center;
      background-size: .4rem .4rem;
    }
  }
.box{
  flex-wrap: wrap;
  .item {
    flex-grow: 0;
    height: auto;
    width: 32.7%;
    display: inline-block;
    margin-bottom: .15rem;
    text-align: center;
    position: relative;
    vertical-align: top;
    p{
      text-align: left;
    }
    img{
      width: 2.3rem;
      height: 2.3rem;
    }
    .tot-num{
      position: absolute;
      top:.1rem;
      right: .1rem;
      color: #fff;
    }
  }
}
  .mv {
    background: url("../../static/aee.png") no-repeat left center;
    background-size: .4rem .4rem;
    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    &-item {
      position: relative;
      margin: 0 5px 5px 10px;
    }
    &-author {
      font-size: 12px;
      color: #666;
    }
  }
</style>
