<template>
  <div>

    <div class="header">单曲搜索</div>
    <div class="search"><label>歌曲名:</label><input type="text" ref="inputVal"><span @click="search">搜索</span></div>
     <div class="load-per" v-if="load_flg">
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
    </div>
    <div v-if="!load_flg">
      <div class="list" v-for="(item, index) in songsList" :key="item.id" @click="playAudio(item)">
        <span class="list-lt"><img :src="item.al.picUrl"></span>
        <div class="list-rt">
          <p>{{item.name}}</p>
          <p>
            <span v-for="ite in item.ar" :key="ite.id">
              {{ite.name}}/
            </span>-
            {{item.al.name}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import urls from '../common/requestURL'

  export default {
    data () {
      return {
        load_flg: true,
        songsList: [],
        ar: []
      }
    },
    mponents: {
    },
    methods: {
      search () {
        axios({
          method: 'post',
          url: urls.search(this.$refs.inputVal.value),
          data: {
          }
        }).then(response => {
          this.songsList = response.data.result.songs
          this.load_flg = false
        }).catch(function (error) { // ES5用  function
          console.log('加载歌单信息出错:' + error)
        })
      }
    },
    mounted () {

    }
  }
</script>
<style lang="less">
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
    margin-left: .2rem;
    margin-right: .2rem;
    label{
      font-size: .3rem;
    }
    span{
      margin-left: .2rem;
      font-size: .3rem;
    }
  }
  .list{
    padding-left: .2rem;
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
      img{
        display: block;
        height: 1rem;
        width: 1rem;
        margin-top: .1rem;
      }
    }
    .list-rt{
      display: inline-block;
      width: 80%;
      margin-left: .2rem;
    }
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
  input{
      width: 70%;
      margin-left: .2rem;
      height: .6rem;
      font-size: .28rem;
      margin-top: .2rem;
      border: 1px solid #ddd;
  }
</style>
