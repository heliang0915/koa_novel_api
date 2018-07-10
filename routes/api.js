const router=require('koa-router')();
let fetch=require('../util/fetch')

router.prefix('/api');

router.get('*',async (ctx,next)=>{
    let url=ctx.request.originalUrl;
    url=url.replace('/api','');
    let res=await  fetch.get(url);

    if(url.indexOf("/category-info")>-1){
        let data=res.data;
        let maxLen=46;
        for(let key in data){
            if(key=="books"){
               let ary= data[key];
                ary.forEach((item)=>{
                    item.cover=decodeURIComponent(item.cover.replace('/agent/',''));
                    item.shortIntro=item.shortIntro.length>maxLen?item.shortIntro.substr(0,maxLen)+"...":item.shortIntro;
                })
            }
        }
    }
    ctx.body=res.data;
})

module.exports=router;