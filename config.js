let config={
    api:{
        // proxyURL: 'http://novel.juhe.im/',
        proxyURL: 'http://59.110.157.243:8020/',
        proxyZhuiShuURL:'http://api.zhuishushenqi.com/', //有几个接口没有包装 这里直接调用追书接口
    },
    wx: {
        appId: "wx2097779e598c14f4",
        secret: "315f6fbb1823e36ebd8131e6c2668178"
    },
    redis:{
        port:6379,
        host:'127.0.0.1'
        // host:'www.blogapi.top'
    },
    pageSize:10
}
module.exports= config;