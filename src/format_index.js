// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
import cheerio from 'cheerio'

const dataCleaner = {
    filterDataList(html) {
        let navList = [];//头部导航
        let comicList = [];//漫画专栏
        if (html) {
            // 沿用JQuery风格，定义$ var cheerio = require('cheerio')
            let $ = cheerio.load(html);
            //获取nav导航 a标签信息
            let navData = $('#nav a');
            //console.log(navData)
            for (let i = 0;i<navData.length;i++) {
                let a = navData.eq(i);
                //移除不存在的版块
                if(a.attr('href')!='javascript:void(0)'&&a.attr('href')!='/top.html'){
                    navList.push({href:a.attr('href'),value:a.text()})
                }
            }
            //console.log(navList)
            //获取首页的各专栏简介
            let cardData = $('.mainctx.lazyloadclass');
            for (let i = 0;i<cardData.length;i++) {
                let comicModel = {hot:{},update:{}}//人气专栏,更新专栏
                let cardDatal = cardData.eq(i).find('.l');
                let cardDatar = cardData.eq(i).find('.r');
                let nvi = {text:'',a:{text:'',href:''},comicList:[]};
                //处理人气专栏数据
                if(cardDatal.length>0){
                    //获取专栏头部标签类型数据
                    let mhlisthead = cardDatal.find('.box.boxhot.mhlisthead');
                    nvi.text = mhlisthead.find('span').text();
                    nvi.a.href = mhlisthead.find('a').attr('href');
                    nvi.a.text = mhlisthead.find('a').text();
                    //获取专栏热点漫画内容数据
                    let rhotbody = cardDatal.find('.ulbox.rhotbody');
                    let comicA = rhotbody.find('a');
                    for (let i = 0;i<comicA.length;i++) {
                        let a = comicA.eq(i);
                        nvi.comicList.push({
                            href:a.attr('href'),
                            lastChapter:a.find('.a').text(),
                            imgUrl:a.find('img').attr('data-url'),
                            title:a.find('.title').text()
                        })
                    }
                    comicModel.hot=nvi;
                }
                nvi = {text:'',updateList:[]};
                //处理更新专栏信息
                if(cardDatar.length>0){
                    //获取专栏头部标签类型数据
                    nvi.text = cardDatar.find('.nvi').text();
                    let updateComics = cardDatar.find('.zxgxbody.magazinezsgs li');
                    if(updateComics.length>0){
                        for(let i=0;i<updateComics.length;i++){
                            let a = updateComics.eq(i).find('a');
                            nvi.updateList.push({
                                comic:{
                                    href:a.eq(0).attr('href'),
                                    text:a.eq(0).text()
                                },
                                lastChapter:{
                                    href : a.eq(1).attr('href'),
                                    text : a.eq(1).text()
                                }
                            });
                        }
                        comicModel.update=nvi;
                    }
                }
                //加入数组保存
                comicList.push(comicModel);
            }
            // this.$nextTick(()=>{
            //     this.btData.list=listData;
            // });
            let listData={navList:navList,comicList:comicList}
            // 返回列表信息
            return listData;
        } else {
            console.log('无数据传入！');
        }
    },

}

export default dataCleaner
