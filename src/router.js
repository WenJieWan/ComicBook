import Vue from 'vue' // 导入Vue
import Router from 'vue-router' // 导入vue-router 库
Vue.use(Router); //全局注册Router组件，它会绑定到Vue实例里面。

// 定义（路由）
const routes = [
    {
        path: '/',
        component: resolve => require(['./comic/index.vue'], resolve),
        meta: { requiresAuth: true ,title:'首页-免费漫画'},//理论需要登录访问，暂不设置
        children: [
            {
                path: '',
                component: resolve => require(['./comic/home.vue'], resolve)
            },{
                path: '/other/:href',
                component: resolve => require(['./comic/common.vue'], resolve),
            },
            {
                path: 'search/:sid',
                component: resolve => require(['./comic/search.vue'], resolve)
            },
        ]
    },
    {
        path: '/comic/:cid/:title',
        meta:{title:'漫画详情'},
        component:resolve => require(['./comic/detail.vue'], resolve),
    },
    {
        path: '/chapter/:cname/:number',
        meta:{title:'漫画章节内容'},
        component:resolve => require(['./comic/read.vue'], resolve),
    }
]

// 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数。
const router = new Router({
    //mode:'history', //历史模式在Nginx上会造成问题就算配置了重定向多层路径会有无响应现象，所以还是使用默认的hash吧
    routes, // （缩写）相当于 routes: routes
    /*linkActiveClass:' '*/
    linkExactActiveClass:'active',//精确显示导航栏的高亮
    base: '/',
})

export default router

// 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
/*const app = new Vue({
    router
}).$mount('#app')*/

// 现在，应用已经启动了！
