let tokenUtil=require("../security/token")
let util=require("../util/util")
let fetch=require("../util/fetch")
const router=require("koa-router")();
router.prefix('/wx');
//登录
router.get('/login/:code', async (ctx, next)=>{
    var {code} = ctx.params;
    fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, req).then(function (resp, err) {
        var data = resp.data.data;
        ctx.body=data
    });
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


module.exports=router;