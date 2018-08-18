import cheerio from 'cheerio'

const dataCleaner = {
    filterDataList(html) {
        let comic = {label:'',comicName:'',imgUrl:'',liList:[],description:'',bookClass:[],mhlisthead:'',chapterList:[]};//漫画数据对象
        if (html) {
            // 沿用JQuery风格，定义$ var cheerio = require('cheerio')
            let $ = cheerio.load(html);
            //获取主要内容包含dom元素
            let mainData = $('.mainctx .mhjs');
            //获取漫画简介标签
            comic.label = mainData.find('.mhjshead span').text();
            //漫画书名
            let cArr = (new Function("", "return " + $('.displayhide').text()))();
            if(cArr.length>2)comic.comicName = cArr[1];
            //获取简介详情主体元素
            let mhjsbody = mainData.find('.mhjsbody');
            //获取图片
            comic.imgUrl = mhjsbody.find('img').attr('data-url');
            //获取标签信息数组
            let liArr = mhjsbody.find('.jshtml li');
            for(let i = 0 ;i < liArr.length;i++){
                comic.liList.push(liArr.eq(i).text());
            }
            //获取漫画简介描述信息
            comic.description = mhjsbody.find('.jshtml .wz div').text().replace(/更多>>/,'');
            //获取漫画全集标签信息
            comic.mhlisthead = mainData.find('.mhlist .mhlisthead .nvi').text();
            //获取漫画连载和番外
            let bookClass = mainData.find('.bookClass li span');
            for(let i = 0 ;i<bookClass.length;i++){
                comic.bookClass.push(bookClass.eq(i).text())
            }
            //如果只有连载的话数组是0需要手动添加入连载
            if(comic.bookClass.length==0){
                comic.bookClass.push('连载');
            }
            //获取漫画全集列表数据
            let mhlistbody = mainData.find('.mhlistbody ul');
            for(let i = 0;i<mhlistbody.length;i++){
                let list = [];
                let arr = mhlistbody.eq(i).find('li a');
                for(let j = 0;j<arr.length;j++){
                    list.push({
                        title:arr.eq(j).attr('title'),
                        href:arr.eq(j).attr('href')
                    });
                }
                comic.chapterList.push(list);
            }
            //console.log(comic)
            // 返回列表信息
            return comic;
        } else {
            console.log('无数据传入！');
        }
    },

}

export default dataCleaner
