/**
 * 这层Query是给追书神器API使用的
 * @type {[type]}
 */
let fetch = require('../util/fetch');
let config = require('../config');
let {pageSize} = config;
// let cache=require('../cache/cache');
let BookCacheManager = require("../cache/bookCacheManager");
let bookCacheManager=new BookCacheManager();

//根据书籍Id获取书籍列表信息
function getBooksByIds(bookIds) {
  return new Promise((resolve, reject) => {
    bookIds = bookIds == null? '': bookIds;
    bookCacheManager.getAllBooks().then((allBooks) => {
      let books = allBooks.filter((item) => {
        return bookIds.indexOf(item._id)>-1;
      })
      books.forEach((item)=>{
        item.cover=decodeURIComponent(item.cover.replace('/agent/',''));
      })
      resolve(books);
    }).catch((err)=>{
      reject(err);
    })
  })
}

module.exports = {
  getBooksByIds
}
