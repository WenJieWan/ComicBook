import axios from 'axios'
import qs from "qs";
import router from "./router";
import { Toast } from 'vant';


const Axios = axios.create({
    baseURL: "http://118.89.225.141:8765/", // 因为我本地做了反向代理 需要设置为 /
    timeout: 10000,
    //responseType: "json",
    //withCredentials: true, // 是否允许带cookie这些
    // headers:{
    //     'Access-Control-Allow-Origin':'*',
    //     "Access-Control-Allow-Methods": "GET,POST"
    // }
    /*headers: {
        "Content-Type": "application/json;charset=utf-8"
    }*/
    /*headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }*/
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
      //  console.log("请求数据中。。。。。。。");
        // 在发送请求之前做某件事
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            //config.data = qs.stringify(config.data);
        }
        // 若是有做鉴权token , 就给头部带上token
        // if (localStorage.getItem("userToken")) {// localStorage.token
        //     config.headers.Authorization = localStorage.getItem("userToken");
        // }
        return config;
    },
    error => {
        console.log("request失败了");
        Toast.fail(error);
        return Promise.reject(error.data.message);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //console.log("请求获取到的数据：");
        //对响应数据做些事
        if (res.status!=200) {
            console.log("请求失败了");
            Toast.fail(res.data.message);
            return Promise.reject(res.data.message);
        }else{
            console.log("请求成功");
            return res;
        }
    },
    error => {
        console.log("response失败了");
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        // if (error.response.status === 403) {
        //     router.push({path: "/error/403"});
        // }
        // if (error.response.status === 500) {
        //     router.push({path: "/error/500"});
        // }
        // if (error.response.status === 502) {
        //     router.push({path: "/error/502"});
        // }
        // if (error.response.status === 404) {
        //     router.push({path: "/error/404"});
        // }

        // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
        // 直接丢localStorage或者sessionStorage
/*
        if (!window.localStorage.getItem("loginUserBaseInfo")) {
            // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
            router.push({
                path: "/login"
            });
        } else {
            // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
            // 乖乖的返回去登录页重新登录
            let lifeTime =
                JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
                1000;
            let nowTime = new Date().getTime(); // 当前时间的时间戳
            console.log(nowTime, lifeTime);
            console.log(nowTime > lifeTime);
            if (nowTime > lifeTime) {
                Message({
                    showClose: true,
                    message: "登录状态信息过期,请重新登录",
                    type: "error"
                });
                router.push({
                    path: "/login"
                });
            } else {

            }
        }*/
        // 返回 response 里的错误信息
        let errorInfo =  error.data.code==="200" ? error.data : error.data.message;
        return Promise.reject(errorInfo);
    }
);



export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, '$ajax', { value: this.methods });
    },
    methods:{
        getAxiosObj(){return Axios;},
        //////////////////////        restful api              ///////////////////////////////////
        post(url,param){return new Promise((resolve, reject) => {Axios.post(url,param).then(function (response) { resolve(response)}).catch(function (error) { reject(error)});});},
        get(url,param){return new Promise((resolve, reject) => {Axios.get(url,{params: param}).then(function (response) {resolve(response)}).catch(function (error) {reject(error)});});},
        get(url){return new Promise((resolve, reject) => {Axios.get(url).then(function (response) {resolve(response)}).catch(function (error) {reject(error)});});},
        
        
        
        // getMajorCourse(param) {
        //     return new Promise((resolve, reject) => {
        //         Axios.post(getMajorCourseUrl,param).then(function (response) { resolve(response)}).catch(function (error) { reject(error)});
        //     });
        // },
        // getMajorCourseForMajor(param1,param2){
        //     return new Promise((resolve, reject) => {
        //         axios.all([this.getMajorCourse(param1),this.getCourse(param2)])
        //             .then(axios.spread(function(acc,pers){
        //                 let result={
        //                     dest:acc.data.data.courseList,
        //                     src:pers.data.data.list
        //                 };
        //                 resolve(result)//两个请求现在都完成
        //             }))
        //             .catch(function (error) { reject(error)});
        //     });
        // },
        // updateMajorCourse(param) {
        //     return new Promise((resolve, reject) => {
        //         Axios.post(updateMajorCourseUrl,param).then(function (response) { resolve(response)}).catch(function (error) { reject(error)});
        //     });
        // },
       
    }
}

