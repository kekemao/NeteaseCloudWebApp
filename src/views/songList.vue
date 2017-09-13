<template>
  <div>
    <v-header :title='title' :tag='tag' class="wxHead"></v-header>
    <div class="content">
      <div class="title">全部歌单</div>
      <div style="height:1px"></div>
      <div class="box" :style="{height:scrollHeightHead}">
        <scroller v-if="scrollerShow" :on-infinite="infinite" noDataText="没有数据咯">
          <div class="item" v-for="item in playlists" :key="item.id">
            <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}" class="links">
              <span class="tot-num">{{item.playCount | formatCount}}</span>
              <img :src="item.coverImgUrl + '?param=300y300'" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../components/HeaderBar.vue'
  import axios from 'axios'
  import urls from '../common/requestURL'
  import $ from 'webpack-zepto'
  export default {
    data () {
      return {
        tag: '歌单',
        title: '歌单',
        playlists: [],
        offset: 0,
        total: 1,
        scrollerShow: false,
        scrollHeightHead: ''
      }
    },
    components: {
      'v-header': header
    },
    mounted () {
      this.scrollHeightHead = `${window.innerHeight - $('.wxHead').height() - $('.title').height()}px`
      this.scrollerShow = true  /* 延迟显示scroll组件-获取scrollHeight高度 */
    },
    methods: {
      getList () {
        axios({
          method: 'post',
          url: urls.getPlayListByWhere('全部', 'hot', this.offset, true, 12),
          data: {
          }
        }).then(response => {
          this.total = 50
          console.log('response.data.total=' + response.data.total)
          // this.playlists = response.data.playlists
          this.playlists.push(...response.data.playlists)
          this.load_flg = false
        }).catch(function (error) { // ES5用  function
          console.log(error)
        })
      },
      infinite (done) {
        console.log('this.offset=' + this.offset)
        console.log('this.total=' + this.total)
        if (this.offset >= this.total) {
          done(true)
          return
        }
        this.offset = this.offset + 12
        this.getList()
        setTimeout(() => {
          done()
        }, 2000)
      }
    }
  }
</script>
<style type="text/css" lang="less">
  .content{
    padding: 0 .1rem;
  }
  .links{
    display: inline-block;
    height: 100%;
    color: #333;
    text-decoration:none;
  }
  .title {
    margin: .1rem 0;
    padding-left: .2rem;
    border-left: .05rem solid #ce3d3e;
  }
  .box{
  flex-wrap: wrap;
  position: relative;
  .item {
    flex-grow: 0;
    height: auto;
    width: 32.33%;
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
</style>
