<template>
 <div >
     <div style="position:fixed;z-index:999;top:0;left:0;width: -webkit-fill-available;">
     <van-nav-bar  
        :title="$route.params.title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
     </div>
    <div style="padding: 0 16px;margin-top:55px;">
        <van-row style="border-bottom: 2px #17A2E7 solid;margin-bottom:5px;">
        <van-col span="12" class="hotText">{{comic.label}}</van-col>
        </van-row>
        <van-row>
            <div class="mhjsbody">
                    <div class="comic-cover" style="position: relative;">
                        <img class="fm" :src="$store.state.loadingGif"
                        :style="{'background': 'url(&quot;'+comic.imgUrl+'-noresize.webp'+'&quot;) center center / 100% 100% no-repeat'}" />
                    </div>
                    <div class="jshtml">
                        <ul>
                        <li v-for="(text,index) in comic.liList" :key="index">{{text}}</li>
                        </ul>
                        <div class="jswz">
                        <div class="wz t1">
                            <div>{{comic.description}}</div>
                        </div>
                        </div>
                    </div>
                    </div>
        </van-row>
    </div>
    <div style="padding: 0 16px;">
        <van-row style="border-bottom: 2px #17A2E7 solid;margin-bottom:5px;">
        <van-col span="12" class="hotText">{{comic.mhlisthead}}</van-col>
        <van-col span="4" offset="4">
            <van-button size="small" type="warning" @click="reverseClick">{{!reverseState?'倒序':'顺序'}}</van-button>
        </van-col>
        <van-col span="4">
            <van-button size="small" type="warning" @click="openClick">{{!openState?'展开':'收缩'}}</van-button>
        </van-col>
        </van-row>
        <van-row>
            <van-tabs>
            <van-tab v-for="(book,bindex) in comic.bookClass" :key="bindex">
                <div slot="title">{{book}}</div>
                <div class="mhlistbody" :style="{height:vHeight}">
                    <van-row gutter="10">
                    <van-col span="6" v-for="(chapter,index) in comic.chapterList[bindex]" :key="index">
                        <van-button @click="clickChapter(chapter,bindex)" size="small" style="width: 100%;margin-top:5px;overflow: hidden;text-decoration: none;" tag="a">
                        {{chapter.title}}
                        </van-button>
                    </van-col>
                    </van-row>
                </div>
            </van-tab>
            </van-tabs>
        </van-row>
    </div>
 </div>
</template>

<script>
import formatDetail from '../format_detail.js';
import Vue from 'vue';
import { Row, Col, Tab,Tabs,Button,NavBar} from 'vant';
Vue.use(Row).use(Col).use(Tab).use(Tabs).use(Button).use(NavBar);
 export default {
   components: {
    Row, Col ,Tab,Tabs 
   },
   created() {
       this.initComicInfo();
   },
   watch: {
    '$route':'initComicInfo'
   },
   data () {
     return {
         comic:{label:'',imgUrl:'',liList:[],description:'',bookClass:[],mhlisthead:'',chapterList:[]},
         reverseState:true,
         openState:false,
         vHeight:'160px',
     }
   },
   methods: {
       initComicInfo(){
           this.$store.state.comicName = this.$route.params.title;
           if(this.$route.params.cid==null){
            this.$router.back();
            }else{
                this.getComicData(this.$route.params.cid)
            }
        },
        getComicData(href){
            let url = href+"/";
            this.$ajax.get(url).then(result => {
                console.log('获取漫画详情数据')
                this.comic = formatDetail.filterDataList(result.data);
                this.$store.state.chapterList = this.comic.chapterList;
                //this.navList = data.navList;
                //this.$store.state.homeData = data.comicList;
                //console.log(this.$store.state.homeData)
            })
            .catch((err) => {console.log(err)});
        },
        clickChapter(chapter,bindex){
            this.$store.state.bindex = bindex;
            this.$store.state.chapterTitle = chapter.title;
            this.$router.push('/chapter'+chapter.href);
        },
        reverseClick(){
            this.reverseState = !this.reverseState;
            for(let list of this.comic.chapterList){
                list = list.reverse();
            }
        },
        openClick(){
            this.openState = !this.openState;
            if(this.openState){
                this.vHeight = 'auto';
            }else{
                this.vHeight = '160px';
            }
        },
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {
        //Toast('按钮');
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
 }
</script>

<style>
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
.mhjsbody {
    margin: 10px 0;
    position: relative;
} 
.comic-cover {
    float: left;
    width: 92px;
    min-height: 120px;
}
.mhjsbody img.fm {
    border: #ccc solid 1px;
    display: block;
    width: 90px;
    height: 120px;
    float: left;
}
img {
    border: none;
}
.jshtml ul {
    margin-left: 100px;
}
ul, ol, li {
    list-style: none;
    font-size: 100%;
}
.jshtml ul li:nth-child(1) {
    display: none;
}
.jshtml ul li {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.jshtml .jswz {
    clear: both;
    padding-top: 10px;
    overflow: hidden;
    overflow-y: auto;
}
.jshtml .wz.t1 {
    overflow: hidden;
    max-height: 200px;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
}
.mhlistbody {
    height: 160px;
    overflow: hidden;
    margin-bottom: 10px;
}
.van-nav-bar__text{
    color:#17A2E7;
}
</style>
