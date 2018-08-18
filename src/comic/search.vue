<template>
 <div>
     <van-list style="height:92%;overflow-y: auto;">
        <van-cell @click="clickComic(item)" v-for="(item,index) in comicList" :key="index" 
        :title="item.cartoon_name" :value="item.latest_cartoon_topic_name"  />
    </van-list>
    <div v-show="comicList.length==0" style="text-align:center;">找不到相关的漫画</div>
 </div>
</template>

<script>
import Vue from 'vue';
import { List,Cell} from 'vant';
Vue.use(List).use(Cell);
 export default {
   components: {
   },
   created() {
       this.initComicInfo();
   },
   watch: {
    '$route':'initComicInfo'
   },
   data () {
     return {
         comicList:[],
     }
   },
   methods: {
       initComicInfo(){
            if(this.$route.params.sid==null||this.$route.params.sid==''){
                this.$router.back();
            }else{
                this.$store.state.searchName = this.$route.params.sid;
                this.searchComicData(this.$route.params.sid);
            }
        },
        searchComicData(){
            let url = "/getjson.shtml?q="+this.$route.params.sid;
            this.$ajax.get(url).then(result => {
                this.comicList = result.data;
            })
            .catch((err) => {console.log(err)});
        },
        clickComic(comic){
            this.$router.push('/comic/'+comic.cartoon_id+'/'+comic.cartoon_name);
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
</style>
