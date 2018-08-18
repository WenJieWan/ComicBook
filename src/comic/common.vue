<template>
<div>

<div style="padding:10px 10px 0 10px;" v-for="(comic,index) in comicModel.comicList" :key="index">
<a class="sdiv" @click="clickComic(comic)">
  <div class="wrapleft">
    <div>
      <span class="a">{{comic.lastChapter}}</span>
      <span class="fl"></span>
    </div>
    <img class="comicImg" :src="$store.state.loadingGif"
        v-lazy:background-image="comic.imgUrl+'-noresize.webp'"/>
  </div>
  <div class="wrapright">
    <ul>
      <li class="title">{{comic.title}}</li>
      <li class="type">
        <span>类型</span>{{comic.type}}</li>
      <li class="status">
        <span>状态</span>{{comic.status}}</li>
      <li>
        <span style="float:left;">剧情</span><div style="float:left;width: 80%;max-height:40px;">{{comic.description}}</div></li></ul>
  </div>
</a>
</div>

<van-pagination  style="margin-top:10px;"
  v-model="comicModel.pageinfo.currentPage" 
  :page-count="comicModel.pageinfo.total"
  mode="simple" 
  @change = "onPageChange"/>

</div>
</template>

<script>
import formatCommon from '../format_common.js';
import Vue from 'vue';
import { Pagination,Lazyload } from 'vant';
import { setTimeout } from 'timers';
Vue.use(Pagination).use(Lazyload);
 export default {
   components: {

   },
   created() {
    this.initUrl();
    },
    watch:{
     '$route':'initUrl'
    },
   data () {
     return {
       comicModel:{comicList:[],pageinfo:{currentPage:1,total:1}},
       originUrl:'',
     }
   },
   methods: {
     initUrl(){
       let url = this.$route.params.href;
       this.getComicData(url);
     },
     getComicData(url){
      this.$ajax
        .get(url)
        .then(result => {
          this.comicModel = formatCommon.filterDataList(result.data);
         // console.log(this.comicModel)
        })
        .catch((err) => {console.log(err)});
      if(this.$store.state.navMap.length==0){
         setTimeout(()=>{this.dealWithUrl();},500);
       }else{
         this.dealWithUrl();
       }
    },
    dealWithUrl(){
       let url = this.$route.params.href;
       let suffixIndex = url.indexOf('_');
       if(suffixIndex>-1){
         this.originUrl = url.substring(0,suffixIndex);
         this.$store.state.activeNav = this.$store.state.navMap['/'+this.originUrl+'.html'];
       }else{
         this.$store.state.activeNav = this.$store.state.navMap['/'+url];
         this.originUrl = url.replace(/.html/,'');
       }
    },
     onPageChange(index){
       let href = index>1?this.originUrl+'_p'+index+'.html':this.originUrl+'.html';
       this.$router.push('/other/'+href);
     },
     clickComic(comic){
       this.$router.push('/comic'+comic.href+comic.title);
     }
   },
   mounted() {
      this.$nextTick(() => {

      })
   },
 }
</script>

<style>
a.sdiv {
    font-size: 12px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    padding: 10px;
    min-height: 150px;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.wrapleft {
    width: 30%;
    overflow: hidden;
    float: left;
    margin-right: 10px;
    position: relative;
}
.wrapleft div {
    overflow: hidden;
    position: absolute;
    text-align: right;
    width: 100%;
    height: 20px;
    line-height: 20px;
    bottom: 0;
}
.wrapleft div span.a {
    color: #fff;
    display: inline-block;
    position: absolute;
    text-decoration: none;
    z-index: 2;
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
}
.wrapleft div span.fl {
    filter: Alpha(Opacity=50);
    opacity: 0.5;
    -moz-opacity: 0.5;
    background: #000;
    height: 20px;
    display: block;
    position: relative;
    z-index: 1;
}
.wrapleft img {
    height: auto;
    width: 100%;
    cursor: pointer;
    vertical-align: top;
    border: none;
}
.wrapright {
    overflow: hidden;
}
.wrapright ul {
    display: block;
    list-style: none;
    font-size: 100%
}
.wrapright li {
    line-height: 20px;
    color: #333;
    height: auto;
    cursor: pointer;
}
.wrapright li.title {
    color: #0086E3;
    line-height: 32px;
    height: 32px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    display: block;
}
.wrapright li.type {
    white-space: nowrap;
}
.wrapright li span {
    font-weight: bold;
    padding-right: 10px;
}
.comicImg{
 width:100%;
 height:auto;
 max-width:100%;
 max-height:100%;
 background-size:100% 100%;
}
.van-pagination .van-hairline::after {
    border: 0 solid #fff;
}
</style>
