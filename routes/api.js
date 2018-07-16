const router=require('koa-router')();
let fetch=require('../util/fetch')
let BookCacheManager=require('../cache/bookCacheManager');
let bookCacheManager=new BookCacheManager();
router.prefix('/api');

router.get('*',async (ctx,next)=>{
    let url=ctx.request.originalUrl;
    url=url.replace('/api','');
    if(url.indexOf('/book-chapters/')>-1){
        let booId=url.substr(url.lastIndexOf('/')+1,url.length);
        console.log('booId:::'+booId);
        let data=await bookCacheManager.getBookChapterList(booId);
        // console.log(data);
        ctx.body={
            chapters:JSON.parse(data)
        };
    }else{
        let res=await  fetch.get(url);
        if(url.indexOf("info")>-1||url.indexOf("/recommend")>-1){
            let data=res.data;
            let maxLen=46;
            for(let key in data){
                if(key=="books"){
                    let ary= data[key];
                    ary.forEach((item)=>{
                        item.cover=decodeURIComponent(item.cover.replace('/agent/',''));
                        item.shortIntro=item.shortIntro.length>maxLen?item.shortIntro.substr(0,maxLen)+"...":item.shortIntro;
                    })
                }else{
                    let item= data[key];
                    if(key=="cover"){
                        data[key]=decodeURIComponent(item.replace('/agent/',''));
                    }else if(key=="shortIntro"){
                        data[key]=item.length>maxLen?item.substr(0,maxLen)+"...":item;
                    }
                }
            }
        }
        ctx.body=res.data;
    }
    //
    //     // console.log(booId)
    //     let data=await catalogQuery.getBookCatalogs(booId);
    //     if(data){
    //         console.log('取缓存');
    //         ctx.body={chapters:data};
    //     }else{
    //         let res=await  fetch.get(url);
    //         console.log('取接口');
    //         ctx.body=res.data;
    //         // catalogQuery.loadAllBook();
    //     }
    // }else{

    // }

})
module.exports=router;