let tokenUtil=require("../security/token");
let util={
    stringUtil:{
        substr(str,n){
            var r=/[^\x00-\xff]/g;
            if(str.replace(r,"mm").length<=n){return str;}
            var m=Math.floor(n/2);
            for(var i=m;i<str.length;i++){
                if(str.substr(0,i).replace(r,"mm").length>=n){
                    return str.substr(0,i)+"...";
                }
            }
            return str;
        }
    },
    userUtil:{
        //从token中直接解析userId 存入的时候也是只存了userId
        getUserId(req){
            let userId="";
            var {token} = req.body;
            console.log("token::::"+token);
            if(token){
                userId=tokenUtil.getByKey(token,"userId");
            }
            console.log("token中解析的userId为:"+userId);
            return userId;
        },
        //从token中解析用户对象 并取出userId
        getUserIdByToken(token){
            let userId=tokenUtil.getByKey(token,"uuid");
            console.log("token中解析的userId为:"+userId);
            return userId;
        },
        checkLogin(req){
            var {token} = req.body;
            return tokenUtil.checkToken(token);

        },
        getTokenFromReq(req){
            let token=req.headers.token;
            let userId=0;
            if(token){
                userId=this.getUserIdByToken(token);
                console.log("userId>>>"+userId);
            }else{
                console.log("没有获取到token信息");
            }
            return userId;
        }
    },
    urlUtil:{
         getQueryByName:function(url,name){
            var reg=new RegExp('[?&]'+name+'=([^&#]+)');
            var query=url.match(reg);
            return query?query[1]:null;
        },
         parseQuery: function(url) {
            var queryObj={};
            var reg=/[?&]([^=&#]+)=([^&#]*)/g;
            var querys=url.match(reg);
            if(querys){
                for(var i in querys){
                    var query=querys[i].split('=');
                    var key=query[0].substr(1),
                        value=query[1];
                    queryObj[key]?queryObj[key]=[].concat(queryObj[key],value):queryObj[key]=value;
                }
            }
            return queryObj;
        }
    }

}


module.exports=util;

