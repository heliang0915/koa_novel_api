
let fetch=require('../../util/fetch');
let cache=require('../cache')
let categorys=[
    "武侠",
    "玄幻",
    "同人",
    "军事",
    "都市"
];
 /*
 * _id : 书籍源id
 * */
let  config= require('../../config');


 function getCatalogList(sourceId) {
    return new Promise((resolve, reject)=>{
        fetch.get(`book-chapters/${sourceId}`).then((res)=>{
            resolve(res.data.chapters);
        }).catch((err)=>{
            reject(err);
        })
    })
}


// function  getSource(bookId){
//     return new Promise((resolve, reject)=>{
//         fetch.get(`book-sources?view=summary&book=${bookId}`).then((res)=>{
//             resolve(res.data);
//         }).catch((err)=>{
//             reject(err);
//         })
//         // fetch.get(`api/book-chapters/${_id}`)
//     })
// }
//
// function getBookList(major){
//     return new Promise((resolve, reject)=>{
//         fetch.get(`category-info?gender=male&type=hot&major=${encodeURI(major)}&minor=&start=0&limit=5`).then((res)=>{
//             // console.log(res);
//             resolve(res.data.books);
//         }).catch((err)=>{
//             reject(err);
//         })
//     })
// }


// async function getAllBook(){
//     let bookList =[];
//     for(let major of categorys){
//         let books=await getBookList(major);
//         // console.log(books);
//         bookList=bookList.concat(books);
//         // console.log()
//     }
//     return bookList;
// }

// async function  loadAllBook(){
//     let bookList=await  getAllBook();
//     for(let book of bookList){
//         let source=await getSource(book._id);
//         let sourceId=source[0]._id;
//         let catalogList=await getCatalogList(sourceId);
//         // console.log(catalogList.length);
//         cache.set(sourceId,JSON.stringify(catalogList));
//         console.log(`加载小说【${book.title}】章节【${catalogList.length}】章`);
//     }
// }

// loadAllBook().then(()=>{
//
// });

//获取指定书籍的章节
// function getBookCatalogs(bookId){
//      // console.log(cache.get(bookId));
//     return new Promise((resolve, reject)=> {
//         cache.get(bookId, (err, catalogList) => {
//                 if(err){
//                     reject(err);
//                 }else{
//                     if(catalogList){
//                         catalogList=JSON.parse(catalogList);
//                         catalogList= catalogList.filter((catalog)=>{
//                             return catalog.isVip==false;
//                         })
//                         catalogList.forEach((item)=>{
//                             console.log(JSON.stringify(item));
//                         })
//                         resolve(catalogList)
//                     }else {
//                         resolve([])
//                     }
//
//                 }
//         })
//     })
//     // let catalogList=JSON.parse(cache.get(bookId));
//     // return catalogList;
// }

module.exports = {
    // getBookCatalogs,
    getCatalogList
    // loadAllBook
}
