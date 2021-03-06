const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger');
const static=require('koa-static');
// let catalogQuery=require('./query/catalogQuery')
const route = require('./middleware/route');
const proxy = require('./middleware/proxy');
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(static(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//注入代理
// app.use(proxy(app))
// routes 注入路由中间件
app.use(route(app))
//加载缓存
// catalogQuery.loadAllBook().then(()=>{});
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
