<template>
 <div style="padding: 0 16px;margin-bottom:10px;">

<van-row style="border-bottom: 2px #17A2E7 solid;margin-bottom:5px;">
  <van-col span="8" class="hotText">{{comicModel.hot.text}} </van-col>
  <van-col span="4" class="more" offset="12" @click.native="moreClick(comicModel.hot.a.href)">{{comicModel.hot.a?comicModel.hot.a.text:''}}</van-col>
</van-row>
<van-row gutter="20">
  <van-col span="8" v-show="index<parseInt(comicModel.hot.comicList.length/3)*3" 
  v-for="(comic,index) in comicModel.hot.comicList" :key="index">
    <div @click="onClick(comic.href,comic.title)">
        <img width="150" height="210"  class="comicImg"
        :src="$store.state.loadingGif"
        v-lazy:background-image="comic.imgUrl+'-noresize.webp'" />
        <div class="comicDiv">
            <div class="f1"></div>
            <div class="lastChapter">
                {{comic.lastChapter}}
            </div>
        </div>
        <span class="title">{{comic.title}}</span>
    </div>
  </van-col>
</van-row>

<van-row v-show="comicModel.update.text" style="border-bottom: 2px #99c712 solid;margin-bottom:5px;">
  <van-col span="8" class="updateText">{{comicModel.update.text}} </van-col>
</van-row>
<van-row>
    <van-cell-group>
        <van-cell v-show="index<6" v-for="(obj,index) in comicModel.update.updateList" :key="index" 
        :title="obj.comic.text" :value="obj.lastChapter.text" 
        @click="
        $store.state.chapterList=[];
        $store.state.chapterTitle=obj.lastChapter.text;
        $store.state.comicName=obj.comic.text;
        $router.push('/chapter' + obj.lastChapter.href)"/>
        <!-- :to="{path: '/chapter/' + obj.lastChapter.href}" -->
    </van-cell-group>
</van-row>

 </div>
</template>

<script>
import Vue from 'vue';
import { Row, Col,Cell, CellGroup,Lazyload } from 'vant';
Vue.use(Row).use(Col).use(Cell).use(CellGroup).use(Lazyload);
 export default {
   components: {
      Row, Col  ,Cell, CellGroup 
   },
   props:['comicModel'],
   created() {

   },
   data () {
     return {
         hot:{text:'测试文本',a:{text:'更多>>',href:''},comicList:[]},
     }
   },
   methods: {
       onClick(href,title){
           this.$router.push('/comic'+href+title);
           //this.$emit("clickComicEvent",href);
       },
       moreClick(href){
            //this.$store.state.activeNav = href;
            this.$router.push('/other'+href);
       }
   },
   mounted() {
      this.$nextTick(() => {

      })
   },
 }
</script>

<style>
body {
  background-color: #f8f8f8;
}
.comicImg{
 width:100%;
 height:auto;
 max-width:100%;
 max-height:100%;
 background-size:100% 100%;
}
span.title {
    color: #0086E3;
    cursor: pointer;
    display: block;
    margin-top: 5px;
    overflow: hidden;
    height: 20px;
    line-height: 20px;
    margin-bottom: 15px;
    font-size: 14px;
    text-align: center;
}
.f1{
    filter: Alpha(Opacity=50);
    opacity: 0.5;
    -moz-opacity: 0.5;
    background: #000;
    height: 20px;
    position: relative;
    line-height: 20px;
    overflow: hidden;
    text-align: right;
    bottom: 20px;
    z-index: 1;
}
.lastChapter{
    height: 20px;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    position: relative;
    overflow: hidden;
    bottom: 40px;
    z-index: 10;
}
.comicDiv{
    width: 100%;
    height: 0px;
}
.hotText{
    text-align: center;
    overflow: hidden;
    display: block;
    background: #17A2E7;
    color: #fff;
    font-size: 16px;
    float: left;
    padding: 0 10px;
    border-radius: 3px 3px 0 0;
    height: 32px;
    line-height: 32px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.updateText{
    text-align: center;
    overflow: hidden;
    display: block;
    background: #99c712;
    color: #fff;
    font-size: 16px;
    float: left;
    padding: 0 10px;
    border-radius: 3px 3px 0 0;
    height: 32px;
    line-height: 32px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.more{
    overflow: hidden;
    position: absolute;
    right: 0;
    vertical-align: middle;
    color: #999;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
}
.van-cell__value{
    font-size:12px;
}
</style>
