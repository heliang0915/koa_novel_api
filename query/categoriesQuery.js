let fetch=require('../util/fetch');
let  config= require('../config');

// let cache=require('../cache/cache');

//获取带书籍数量的父分类
function getCategories() {
    return new Promise((resolve, reject)=>{
        fetch.get(`categories`).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}
//获取带子分类的分类
async function getSubCategories() {
    // console.log("getSubCategories...");
    return new Promise((resolve, reject)=>{
        fetch.get(`sub-categories`).then((res)=>{
            // console.log("getSubCategories...");
            // console.log(res.data);
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

module.exports={
    getCategories,
    getSubCategories
}