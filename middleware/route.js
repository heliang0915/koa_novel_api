/*路由中间件*/
const fs = require('fs');
let router=require('koa-router');
let path=require('path');
let filter="route.js";//需要过滤的文件
const rootRouter="routes"; //负责将router合并起来
const rootPath=path.join(__dirname,"../") //获取项目根路径
function addRouters(app,router,router_dir) {
	let importPath=(rootPath + `/${router_dir}`);
    let  files = fs.readdirSync(importPath);
    let js_files = files.filter((f) => {
        return f.endsWith('.js')&&f!=filter; 
    });
    let filesStr="";
    for (let f of js_files) {
        filesStr+=`${f},`;
        let routerFile = require(`${importPath}/${f}`);
        app.use(routerFile.routes(), routerFile.allowedMethods())
    }
    console.log(`扫描路由目录:【%s】 \n找到路由文件 【%s】`,`${router_dir}`,`${filesStr}`);
}
module.exports = function (app,dir) {
    let router_dir = dir || rootRouter;
    addRouters(app,router,router_dir);
    return function(){
    	console.log("调用路由中间件");
    };
};