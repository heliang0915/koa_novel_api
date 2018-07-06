// let proxy = require('koa-better-http-proxy');


module.exports=function (app) {
    // app.use(proxy('www.baidu.com'))
    console.log("代理中间件1...")
    return  function () {
       console.log("代理中间件2...")
    }
}