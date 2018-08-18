<template>
  <div style="background:#343434;width:100%;height:100%;position:absolute;">

    <div class="read" style="position:fixed;z-index:999;top:0;left:0;width: -webkit-fill-available;">
     <van-nav-bar  
        :title="$store.state.chapterTitle"
        left-text=""
        right-text=""
        left-arrow
        @click-left="$router.back()"
        />
     </div>

    <van-swipe ref="imgSwipe" :vertical=false :show-indicators=false :loop=false @change="onChange" style="position:relative;margin:60px 0;z-index:9999;overflow-y: auto;height:auto;">
      <van-swipe-item v-for="(image, index) in imgList" :key="index">
          <img class="comic_img" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <div class="read">
      <van-tabbar>
      <van-tabbar-item @click="clickMenu(menu.text)" v-for="(menu,index) in menuNav" :key="index" icon="shop">
        <span style="color:#BEBEBE;">{{menu.text}}</span>
        <img slot="icon" :src="menu.imgUrl" width="20" height="20">
        </van-tabbar-item>
      </van-tabbar>
    </div>
    
    
    <van-row class="comicSlider" v-show="jdShow">
      <van-col span="3" style="text-align: center;" @click.native="currentIndex>0?clickChapter($store.state.chapterList[$store.state.bindex][currentIndex-1]):$toast('无上一章')">|&lt;</van-col>
      <van-col span="4" style="text-align: center;">{{selectImgIndex}}/{{mh_info.totalimg}}</van-col>
      <van-col span="14" style="margin-top: 10px;padding: 0 10px;"><van-slider v-model="selectImgIndex" @input="onSliderInput" @change="onSliderChange"  :min="mh_info.startimg" :max="mh_info.totalimg"/></van-col>
      <van-col span="3" style="text-align: center;" @click.native="currentIndex<$store.state.chapterList[$store.state.bindex].length?clickChapter($store.state.chapterList[$store.state.bindex][currentIndex+1]):$toast('无下一章')">&gt;|</van-col>
    </van-row>


    <div class="catalogFrame" v-show="mlShow">
      <div class="catalogLeft" @click="mlShow=false">
      </div>
      <div class="catalogRight">
        <van-row type="flex" justify="center" style="height:45px;">
          <span style="color:#BEBEBE;margin-top:10px;">{{$store.state.comicName}}</span>
        </van-row>
        
        <van-list style="height:92%;overflow-y: auto;">
          <van-cell @click="clickChapter(item)" :style="{'color':isCurrent(item.href,index)?'#CC9269':'#BEBEBE'}" :icon="isCurrent(item.href,index)?'location':''" v-for="(item,index) in $store.state.chapterList[$store.state.bindex]" :key="index" :title="item.title" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import comic from '../new.comic.read.js';
import formatDetail from '../format_detail.js';
import Vue from 'vue';
import { Swipe, SwipeItem ,Toast,Lazyload,Tabbar, TabbarItem,NavBar,List,Cell,Row,Slider,Col} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Toast).use(Lazyload).use(Tabbar).use(TabbarItem).use(NavBar).use(List).use(Slider)
.use(Cell).use(Row).use(Col);
export default {
  components: {
  },
  created() {
    this.initUrl();
  },
  watch:{
    '$route':'initUrl'
  },
  data() {
    return {
      menuNav: [
        {text:'目录',imgUrl:'./static/icon/menu_chapter.png'},
        {text:'进度',imgUrl:'./static/icon/menu_slider.png'},
        {text:'设置',imgUrl:'./static/icon/menu_set.png'},],
      mh_info : {
        imgpath: "J+8L+K<+?<+?=+K=+HJ+?=+K;+G:+G=+K?+??+><+K<+>H+><+K;+>>+><+K=+>?+>>+8L<6<+K>+GL+?JMW+8L",
        startimg: 1,
        totalimg: 13,
        mhid: "douluodalu",
        mhname: "斗罗大陆",
        pageid: 1530486,
        pagename: "",
        pageurl: "606",
        readmode: 1,
        maxpreload: 5,
        defaultminline: 1,
        domain: "cnmanhua.com",
        comic_size: "-mht.middle",
        default_price: 79,
        price: 79,
        time_diff: 1228161442
      },
      imgList:[],
      mlShow:false,jdShow:false,szShow:false,
      currentChapterHref:'',
      currentIndex:-1,
      selectImgIndex:1,
    };
  },
  methods: {
    initUrl(){
      let url = this.$route.params.cname+'/'+this.$route.params.number;
      this.currentChapterHref = url;
      this.getComicData(url);
      if(this.$store.state.chapterList.length==0){
        this.getCatalogData();
      }
    },
    getComicData(url){
      this.$ajax
        .get(url)
        .then(result => {
          let sIndex = 0,eIndex = 0;
          let str = result.data;
          let start = str.indexOf('mh_info');
          if(start>-1){
            str = str.substring(start);
            sIndex = str.indexOf('{');
            eIndex = str.indexOf('}');
            str = str.substring(sIndex,eIndex+1);
          }
          //this.varData = (new Function("", "return " + str))(); 
          this.mh_info = eval("(" + str + ")");
          window.mh_info = this.mh_info;
          comic(window,undefined);
          window.__cr.init();
          //console.log(window.mh_info)
          this.imgList=[];
          this.$nextTick(() => {
            for(let i = mh_info.startimg;i<=mh_info.totalimg;i++){
              this.imgList.push(window.__cr.getPicUrl(i))
            }
          });
        })
        .catch((err) => {console.log(err)});
    },
    getCatalogData(){
      let url = "/"+this.$route.params.cname+"/";
      this.$ajax.get(url).then(result => {
          this.comic = formatDetail.filterDataList(result.data);
          this.$store.state.chapterList = this.comic.chapterList;
          this.$store.state.comicName = this.comic.comicName;
          for(let i = 0;i<this.$store.state.chapterList.length;i++){
            let flag = false;
            for(let j = 0;j<this.$store.state.chapterList[i].length;j++){
              if(this.$store.state.chapterList[i][j].href.indexOf(this.currentChapterHref)>-1){
                this.$store.state.bindex = i;this.$store.state.chapterTitle = this.$store.state.chapterList[i][j].title;flag=true;break;
              }
            }
            if(flag)return;
          }
      })
      .catch((err) => {console.log(err)});
    },
    // onOutOfBounds(index){
    //   console.log('越界 索引：' + index);
    // },
    onChange(index) {
      console.log('当前 Swipe 索引：' + index);
      this.selectImgIndex = index + 1;
    },
    onSliderChange(index){
      setTimeout(()=>{
        this.jdShow=false;
      },1000);
    },
    onSliderInput(index){
      this.$refs.imgSwipe.swipeTo(index-1);
    },
    clickMenu(val){
      switch(val){
        case '目录':
          this.mlShow = true;
          break;
        case '进度':
          this.jdShow =!this.jdShow;
          break;
      }
    },
    isCurrent(href,index){
      if(href.indexOf(this.currentChapterHref)>-1){
        this.currentIndex = index;
        return true;
      }
      return false;
    },
    clickChapter(item){
      //console.log(href);
      this.$store.state.chapterTitle = item.title;
      this.currentChapterHref = item.href;
      this.getComicData(item.href);
      this.mlShow = false;
      setTimeout(()=>{
        this.jdShow=false;
      },1000);
      //this.$router.push('/chapter'+href);
    }
  },
  mounted() {
    this.$nextTick(() => {
      //window.__cr;
      document.addEventListener('plusready', function() {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function() {
            webview.canBack(function(e) {
                if(e.canBack) {
                    webview.back();             
                } else {
                    //webview.close(); //hide,quit
                    //plus.runtime.quit();
                    //首页返回键处理
                    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                    var first = null;
                    plus.key.addEventListener('backbutton', function() {
                        //首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime();
                            console.log('再按一次退出应用');
                            setTimeout(function() {
                                first = null;
                            }, 1000);
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit();
                            }
                        }
                    }, false);
                }
            })
        });
      });
    })
  },
  // 进入路由时判断当前登录状态，已登录则跳转到首页
  //beforeRouteEnter(to, from, next) {
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //   console.log("userToken:" + localStorage.getItem("userToken"));
    //   console.log("userType:" + localStorage.getItem("userType"));
    //   console.log(localStorage.getItem("userType") !== "1");
    //   if (
    //     localStorage.getItem("userToken") == null ||
    //     localStorage.getItem("userType") !== "1"
    //   ) {
    //     //!auth.loggedIn()
    //     next({
    //       path: "/login"
    //       //    query: { redirect: to.fullPath }
    //     });
    //   } else {
    //     next();
    //   }
    // } else {
    //   next(); // 确保一定要调用 next()
    // }
  //}
};
</script>

<style>
body {
  background-color: #f8f8f8;
}
.comic_img{
 width:auto;
 height:auto;
 max-width:100%;
 max-height:100%;
}
.read .van-tabbar{
background-color: #282828;
height: 60px;
}
.van-hairline--top-bottom::after {
    border-width: 1px 0 0 0;
}

[class*=van-hairline]::after {
    border: 0 solid #343434;
}
.read .van-nav-bar{
background-color: #282828;
}
.read .van-nav-bar__title{
  color:#BEBEBE;
}
.read .van-nav-bar .van-icon{
  color:#BEBEBE;
}
.catalogFrame{
  position: fixed;
  top:0;
  left:0;
  width: -webkit-fill-available;
  z-index: 99999;
  height: 100%;
}
.catalogLeft{float: left;
  position: relative;
  width: 30%;
  height: 100%;
}
.catalogRight{
  position: relative;float: left;
  width: 70%;
  height: 100%;
  background: #282828;
}
.catalogRight .van-cell {
    padding: 10px 15px;
    line-height: 24px;
    background-color: transparent;
    color: #BEBEBE;
}
.catalogRight .van-cell:not(:last-child)::after {
    border-bottom-width: 0px;
    border-top-width: 2px;
}
.comicSlider{
  color:#BEBEBE;
  z-index: 999;
  position: fixed;
  width: 100%;
  bottom: 60px;
  background: #282828;
  height: 30px;
  padding-top: 8px;
}
</style>
