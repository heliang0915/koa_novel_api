let bookQuery=require("../query/bookQuery");
let cache=require("../cache/cache");
let categoriesQuery=require("../query/categoriesQuery");
function  bookCacheManager() {}
bookCacheManager.proto=bookCacheManager.prototype;
//加载所有
bookCacheManager.proto.loadAll=async function(){
    console.log(`开始加载小说源小说...`);

    // let allBookList=[];
    // let subList=await  categoriesQuery.getSubCategories();
    // for(let gender in subList){
    //     let majorList =subList[gender];
    //     if(typeof majorList=="object"){
    //         for(let item of majorList){
    //             let major=item.major;
    //             let mins=item.mins;
    //             for(let min of mins){
    //                    let counter=0;
    //                     let category=gender+" "+major+" "+min;
    //                     console.log("加载小说分类:"+category);
    //                     let data= await bookQuery.getBookByCategory(gender,major,min,0,50);
    //                     let total=data.total;
    //                     let count=Math.ceil(total/50);
    //                     let books=data.books;
    //                     allBookList=allBookList.concat(books);
    //                     console.log(category+",共"+count+"页");
    //                     console.log(category+"，第1页,共:"+books.length+"部");
    //                     for(let start=1;start< count;start++){
    //                         let newStart=start*50;
    //                         data= await bookQuery.getBookByCategory(gender,major,min,newStart,50);
    //                         let books=data.books;
    //                         console.log(category+"，第"+(start+1)+"页,共:"+books.length+"部");
    //                         if(books.length==0){
    //                             counter++
    //                             if(counter>5){ //尝试5次 如果还为0 说明没数据了
    //                                 counter=0;
    //                                 break;
    //                             }
    //                             continue;
    //                         }
    //                         allBookList=allBookList.concat(books);
    //                     }
    //             }
    //         }
    //     }
    // }
    cache.set("books:all",JSON.stringify(allBookList));
    console.log(`加载小说全部小说${allBookList.length} 部`);
}

let manage=new bookCacheManager();

manage.loadAll().then(()=>{

})


module.exports=bookCacheManager;