
const router=require('koa-router')();
router.prefix('/novel');

// router.get('/',async (ctx)=>{
//    await ctx.render('novel/novel-list',{
//    		title:"小说列表"
//    })
// })
router.get('/category',async (ctx)=>{
   await ctx.render('novel/novel-category',{
   		title:"小说分类"
   })
})


router.get('/sub-category/:gender/:type/:major/:minor?',async (ctx)=>{
   let {gender,type,major,minor}=ctx.params;

   // await ctx.render('novel/novel-sub-categories',{
   // 		title:"小说子分类",
   // 		gender,
   // 		type,
   // 		major,
   // 		minor
   // })

   await ctx.render('novel/novel-list',{
   		title:"小说列表",
   		gender,
   		type,
   		major,
   		minor
   })
})


router.get('/getDetail/:id',async (ctx)=>{
     let {id}=ctx.params;
     await ctx.render('novel/novel-detail',{
     	 title:"小说详情",
     	 id
     }) 
})

router.get('/read/:link',async (ctx)=>{
	console.log("read.....");
     let {link}=ctx.params;
     await ctx.render('novel/read',{
     	 title:"小说正文",
     	 link
     }) 
})



module.exports=router;