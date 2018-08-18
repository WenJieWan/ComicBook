import Vue from 'vue'
import Vuex from 'vuex'//引入vuex全局数据共享状态管理

Vue.use(Vuex);

const store = new Vuex.Store({
    // 定义状态
    state: {
        homeData: [],
        chapterList:[],
        bindex:0,
        chapterTitle:'',
        comicName:'',
        searchName:'',
        navMap:[],
        activeNav:0,
        loadingGif:'./static/space3x4.gif',//由于hbuilder打包造成无法显示/static/下的资源文件，直接写在src中也会编译报错，所以需要折中一下动态插入地址
    }
});

export default store