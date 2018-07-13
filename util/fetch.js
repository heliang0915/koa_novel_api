let  axios= require('axios');
let  config= require('../config');
var instance = axios.create({
  baseURL: config.api.proxyURL
});
//地址转换
let switchURL=(url)=>{
    let baseURL=config.api.proxyURL;
    //这种url需要被转义成api.zhuishushenqi.com
    if(url.indexOf("/post")>-1||url.indexOf("/book-list")>-1){
        baseURL=config.api.proxyZhuiShuURL
    }
    return baseURL;
}
let fetch={
    get(url){
       var baseURL=switchURL(url);
       instance.defaults.baseURL=baseURL;
      return instance.get(url);
    },
    post(url,body){
     var baseURL=switchURL(url);
      instance.defaults.baseURL=baseURL;
      return instance.post(url,body);
    }
}

module.exports=fetch;
