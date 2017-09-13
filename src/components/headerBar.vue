<template>
    <!-- 头部 -->
    <div class="head">
    <div class="header">{{title}}<span class="search">搜索</span></div>
       <tab :line-width="2" class="tab-h" active-color='#ce3d3e' defaultColor='#444'>
        <tab-item :selected="tag === item" v-for="item in taglist" :key="item.id" @on-item-click="switchTab(item)">{{item}}</tab-item>
      </tab>
    </div>
</template>
<script type="text/javascript">
import {Tab, TabItem} from 'vux'
export default {
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      taglist: ['时下流行', '歌单', '排行榜', '热门歌手']
    }
  },
  props: ['title', 'tag'],
  methods: {
    switchTab (item) {
      if (item === '时下流行') {
        this.$router.replace({path: '/index/rage'})
      } else if (item === '歌单') {
        this.$router.replace({path: '/index/songList'})
      } else if (item === '排行榜') {
        this.$router.replace({path: '/index/songList'})
      } else {
        this.$router.replace({path: '/index/songList'})
      }
    }
  }
}
</script>
<style lang="less">
  .head{
    width: 100%;
    color: #fff;
    text-align: center;
    overflow: hidden;
    .tab-h{
      height: .68rem;
    }
    .vux-tab .vux-tab-item{
      height: .68rem;
      line-height: .68rem;
      font-size: .26rem;
    }
  }
.header{
    width: 100%;
    color: #fff;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    overflow: hidden;
    background-color: #ce3d3e;
    font-size: .32rem;
}
.search{
    position: absolute;
    right: 0.3rem;
    font-size: .28rem;
}
</style>
