# ComicBook
### a free comic book app  ,一款免费漫画app

# 代码仅用于研究及学习技术使用  
### 本webapp主要是基于有赞的 vant ui 组件开发而成，数据源解析来自漫画台官方网站  
### 由于有赞的slider滑块组件不符合想要的效果，所以在源码的基础上做了点修改  
### 要修改的文件地址（node_modules/vant/lib/slider/index.js）  
### 具体的代码修改地方如下：  

1.对显示的百分比进度条重新计算  
```sh
computed: {
    barStyle: function barStyle() {
      return {
        width: Math.round(this.format(this.value)*100/(this.max-this.min+1)) + '%',//这里是修改的地方
        height: this.barHeight
      };
    }
  },
```

2.修改滑动监听
```sh
onTouchMove: function onTouchMove(event) {
  if (this.disabled) return;
  this.touchMove(event);
  var rect = this.$el.getBoundingClientRect();
  var diff = this.deltaX / rect.width * (this.max-this.min+1);//这里是修改的地方
  this.updateValue(this.startValue + diff);
},
```

3.修改点击事件
```sh
onClick: function onClick(event) {
  if (this.disabled) return;
  var rect = this.$el.getBoundingClientRect();
  var value = (event.clientX - rect.left) / rect.width * (this.max-this.min+1);//这里是修改的地方
  this.updateValue(value, true);
},
```
    
4.修改更新数值
```sh
format: function format(value) {
  var correctVal = Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;//这里是修改的地方
  return correctVal==this.min?0:correctVal;//这里是修改的地方
}
```
#改了完了npm run dev打开并不能请求数据成功，因为涉及跨域问题
#为了解决跨域，需要建立一个http代理
#下面是基于httpProxy模块实现的代理的具体代码（proxyweb.js）
```sh
var http = require("http");
var httpProxy = require('http-proxy'); 
var proxy = httpProxy.createProxyServer({});
var express = require('express');
var app = express();
proxy.on('error', function (err, req, res) { 
    res.writeHead(500, { 
	'Content-Type': 'text/plain' 
    }); 
    res.end('500');
})  
app.get('*', proxyer);//把请求链接使用代理
function proxyer(req,res,next){
	delete req.headers.host;//一定要把host删除，不然会出现404，我在这里踩了好久的坑！
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    proxy.web(req, res, {target: 'http://m.manhuatai.com'});
}
console.log("proxy listening on port 8765") 
app.listen(8765);
```
#终端执行命令：
```sh
npm install
node proxyweb.js
```
### 记得在项目中src下的httpServer.js进行修改请求地址
baseURL: "http://{运行请求代理的服务器ip地址}:8765/"
### 到此即可运行项目了，build后可以将生产文件在hubilder下打包成app使用

