import Vue from 'vue'  //引入vue模块
import App from './App.vue'//引入vue组件
import router from "./router"; // 引入路由配置文件
import store from './store' //引入状态管理配置文件
//import Vant from 'vant'; // 引入UI
//import 'vant/lib/vant-css/index.css';
//import VueWechatTitle from 'vue-wechat-title';//引入微信统一修改title开源组件
import axiosPlugin from './httpServer';//引入url请求文件
import axios from 'axios';
Vue.config.productionTip = false;// 关闭生产模式下给出的提示
//Vue.use(Vant);
Vue.use(axiosPlugin);
//Vue.prototype.$ajax= axios
//Vue.use(VueWechatTitle);





const app = new Vue({
  el: '#app', //挂载id,这个实例下所有的内容都会在index.html 一个id为app的div下显示
  router, // 注入路由配置
  store, // 注入状态配置
  render: h => h(App)
});

