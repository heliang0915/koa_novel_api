/**
 * 这层Query是给追书神器API使用的
 * @type {[type]}
 */
let fetch = require('../../util/fetch');
let config = require('../../config');
let {pageSize} = config;
// let cache=require('../cache/cache');
let bookCacheManager = require("../bookCacheManager");
//获取分类书籍详情
function getBookByCategory(gender, major, minor, start, limit) {
  start = start == null
    ? 0
    : start;
  return new Promise((resolve, reject) => {
    // console.log('url:::'+`category-info?gender=${gender}&type=hot&major=${encodeURIComponent(major)}&minor=${encodeURIComponent(minor)}&start=${start}&limit=${limit==null?pageSize:limit}`);
    fetch.get(
      `category-info?gender=${gender}&type=hot&major=${encodeURIComponent(major)}&minor=${encodeURIComponent(minor)}&start=${start}&limit=${limit == null
      ? pageSize
      : limit}`).then((res) => {
      setTimeout(() => {
        resolve(res.data);
      }, 2000)
    }).catch((err) => {
      reject(err);
    })
  })
}
//获取书源
function getSource(bookId) {
  return new Promise((resolve, reject) => {
    fetch.get(`book-sources?view=summary&book=${bookId}`).then((res) => {
      setTimeout(() => {
        resolve(res.data);
      }, 1000)
    }).catch((err) => {
      reject(err);
    })
    // fetch.get(`api/book-chapters/${_id}`)
  })
}

//根据书籍Id获取书籍
function getBookById(){
  return new Promise((resolve, reject) => {
    fetch.get(`book-sources?view=summary&book=${bookId}`).then((res) => {
      setTimeout(() => {
        resolve(res.data);
      }, 1000)
    }).catch((err) => {
      reject(err);
    })
    // fetch.get(`api/book-chapters/${_id}`)
  })
}


module.exports = {
  getBookByCategory,
  getSource
  // ,
  // getBooksByIds
}
