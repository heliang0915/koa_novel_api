let  axios= require('axios');
let  config= require('../config');
var instance = axios.create({
  baseURL: config.api.baseURL
});

let fetch={
    get(url){
      return instance.get(url);
    },
    post(url,body){
      return instance.post(url,body);
    }
}

module.exports=fetch;
