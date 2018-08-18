import cheerio from 'cheerio'

const dataCleaner = {
    filterDataList(html) {
        let comicModel = {comicList:[],pageinfo:{currentPage:1,total:1}};//漫画数据对象集合
        if (html) {
            // 沿用JQuery风格，定义$ var cheerio = require('cheerio')
            let $ = cheerio.load(html);
            //获取漫画集合
            let mhlist = $('.lazyloadclass .mhlist2 .sdiv');
            for(let i =0;i<mhlist.length;i++){
                 //漫画对象json结构
                let comic = {href:'',title:'',status:'',imgUrl:'',lastChapter:'',type:'',description:''};
                let c = mhlist.eq(i);
                comic.href = c.attr('href');
                comic.imgUrl = c.find('.wrapleft img').attr('data-url');
                comic.lastChapter = c.find('.wrapleft .a').text();
                comic.title = c.find('.wrapright .title').text();
                comic.type = c.find('.wrapright .type').text();
                comic.status = c.find('.wrapright .status').text();
                let des = c.find('.wrapright li');
                comic.description = des[(des.length-1)].children[1].data;
                comicModel.comicList.push(comic);
            }
            //处理分页数据
            let page = $('.mhlist2 .pages a');
            if(page.length>=3){
                comicModel.pageinfo.currentPage = parseInt($('.mhlist2 .pages .thispage').text());
                comicModel.pageinfo.total = parseInt(page.eq(page.length-2).text());
            }
            // 返回列表信息
            return comicModel;
        } else {
            console.log('无数据传入！');
        }
    },

}

export default dataCleaner
