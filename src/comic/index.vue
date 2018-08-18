<template>
  <div>
    <van-tabs v-model="$store.state.activeNav" swipeable @click="onClick" style="position:fixed;z-index:999;top:0;left:0;width: -webkit-fill-available;">
    <van-tab v-for="(nav,index) in navList" :title="nav.value" :key="index">
    </van-tab>
    </van-tabs>
    <van-search  style="margin-top:45px;"
      v-model.trim="$store.state.searchName"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>
<script>
import formatIndex from '../format_index.js';
import Vue from 'vue';
import { Tab, Tabs ,Search} from 'vant';
Vue.use(Tab).use(Tabs).use(Search);
export default {
  components: {
    Tab, Tabs
  },
  created() {
    let url = "/";
    this.$ajax
      .get(url)
      .then(result => {
        //console.log('测试数据')
        let data = formatIndex.filterDataList(result.data)
        this.navList = data.navList;
        this.$store.state.navMap=[];
        for(let i = 0;i<this.navList.length; i++){
          this.$store.state.navMap[this.navList[i].href] = i;
        }
        this.$store.state.homeData = data.comicList;
        //console.log(this.$store.state.homeData)
      })
      .catch((err) => {console.log(err)});
  },
  data() {
    return {
      navList:[],
    };
  },
  methods: {
    onClick(index, title) {
      //this.$toast(title);
      this.$store.state.activeNav = index;
      if(index==0){
        this.$router.push('/');
      }else{
        console.log(this.navList[index].href);
        if(this.navList[index].href!='javascript:void(0)'){
          this.$router.push('/other'+this.navList[index].href);
        }else{
          this.$toast('此版块未开放！');
        }
      }
    },
    onSearch(){
      if(this.$store.state.searchName.length==0){
        this.$toast('搜索内容不能为空！');
      }else{
        this.$router.push('/search/'+this.$store.state.searchName);
      }
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
};
</script>

<style>
body {
  background-color: #f8f8f8;
}
img{
 width:auto;
 height:auto;
 max-width:100%;
 max-height:100%;
}
.van-tabs__line{
  background-color:#17A2E7;
}
.van-tab--active{
  color:#17A2E7;
}
</style>
