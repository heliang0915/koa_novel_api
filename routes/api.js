const router=require('koa-router')();
let fetch=require('../util/fetch')

router.prefix('/api');

router.get('*',async (ctx,next)=>{
    let url=ctx.request.originalUrl;
    url=url.replace('/api','');
    let res=await  fetch.get(url);
    ctx.body=res.data;
})

module.exports=router;