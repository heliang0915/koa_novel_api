let  axios= require('axios');
let  config= require('../config');
var instance = axios.create({
  baseURL: config.api.proxyURL
});
//地址转换
let switchURL=(url)=>{
    let baseURL=config.api.proxyURL;
    //这种url需要被转义成api.zhuishushenqi.com
    if(url.indexOf("/post")>-1||url.indexOf("/book-list")>-1||url.indexOf("/atoc/")>-1){
        baseURL=config.api.proxyZhuiShuURL;
        console.log("baseURL:::"+baseURL)
    }
    return baseURL;
}
let fetch={
    get(url){
       var baseURL=switchURL(url);
       console.log("baseURL:::"+baseURL)
       instance.defaults.baseURL=baseURL;
      return instance.get(url);
    },
    post(url,body){
     var baseURL=switchURL(url);
      instance.defaults.baseURL=baseURL;
     console.log("baseURL:::"+baseURL)
      return instance.post(url,body);
    }
}

module.exports=fetch;
