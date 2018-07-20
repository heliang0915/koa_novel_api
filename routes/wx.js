let tokenUtil=require("../security/token")
let util=require("../util/util")
let fetch=require("../util/fetch")
const router=require("koa-router")();
let config = require("../config");
let BookCacheManager = require("../cache/bookCacheManager");
let bookCacheManager=new BookCacheManager();
let wx = config.wx;
let  appId = wx.appId;
let secret = wx.secret;

router.prefix('/wx');
//登录
router.get('/login/:code', async (ctx, next)=>{
    var {code} = ctx.params;
    // var req=ctx.request;
    // console.log(fetch);

    function getWeiXinApi() {
           return new Promise((resolve, reject)=>{
               fetch.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`).then(function (resp) {

                   var data = resp.data;
                   console.log(data);
                   resolve(data);
               }).catch((err)=>{
                   console.log(err);
                   reject(err);
               })
           })
    }

    let data=await getWeiXinApi();
   // let resp=await fetch.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`);//.then(function (resp) {
        // console.log(resp);
        // var data = resp.data.data;
        //
        // ctx.body=data
    // })

    // var data = resp.data.data;
    ctx.body=data
    //    .catch((err)=>{
    //     console.log("error:"+err);
    // });
})
//用户是否注册过
router.get('/exist/:tid', async (ctx, next)=> {
    var {tid} = ctx.params;
    console.log("tid:" + tid);
    //创建token
    let tokenStr=tokenUtil.createUserToken("admin");
    ctx.body=tokenStr;
    // res.send(tokenStr);

    // userManager.find({tid: tid}, function (err, models) {
    //     if (models.length) {
    //         //创建token
    //         let tokenStr=tokenUtil.createUserToken(models[0].uuid);
    //         res.send(tokenStr);
    //     } else {
    //         res.send(false);
    //     }
    // })
});


//微信注册登录
router.post('/wxRegister',async (ctx, next)=>{
    var user = ctx.body;

    //创建token
    let tokenStr=tokenUtil.createUserToken("admin");
    // res.send(tokenStr);
    res.send(err == null ? tokenStr: err);


    // userManager.add(user, function (err,module) {
    //     //创建token
    //     let tokenStr=tokenUtil.createUserToken(module.uuid);
    //     // res.send(tokenStr);
    //     res.send(err == null ? tokenStr: err);
    // })



});

router.post('/checkLogin',async (ctx, next)=> {
    console.log("checkLogin.....");
    let isLogin=util.userUtil.checkLogin(ctx.request);
    ctx.body=isLogin
})

//更新登录时间等信息
router.get('/updateInfo/:tid', async (ctx, next)=> {
        ctx.body=true;
    // var tid = req.params.tid;
    // userManager.find({tid: tid}, function (err, users) {
    //     if (users.length) {
    //         //更新用户信息
    //         var user = users[0];
    //         user.loginTime = moment().format("YYYY-MM-DD HH:mm:ss");
    //         userManager.edit(user.uuid, user, function (err) {
    //             res.send(err == null ? true : err);
    //         })
    //     } else {
    //         res.send(true);
    //     }
    // })
});


//章节分页
router.get('/chapterPages/:sourceId', async (ctx, next)=> {
    let {sourceId}=ctx.params;
    console.log("sourceId"+sourceId);
    // let chapterList= await bookCacheManager.getBookChapterList(sourceId);
    let chapterList=await bookCacheManager.getBookChapterList(sourceId);
    let total=chapterList.length;
    console.log("total:::"+total);
    let pageSize=100;
    let totalPages=total>pageSize?Math.ceil(total/pageSize):1;
    console.log("totalPages!!!!!"+totalPages);
    let ary=[];
    for(let i=0;i<totalPages;i++){
        let join={};
        let start=i*pageSize+1;
        let end=(i+1)*pageSize>total?total:(i+1)*pageSize;
        // join[`第${start}至${end}章`]=i+1;
        ary.push(`第${start}至${end}章`);
    }
    ctx.body=ary;
});


module.exports=router;