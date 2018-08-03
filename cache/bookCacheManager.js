let bookQuery=require("./query/bookQuery");
let cache=require("../cache/cache");
let categoriesQuery=require("./query/categoriesQuery");
let catalogQuery=require("./query/catalogQuery");
function  bookCacheManager() {}
bookCacheManager.proto=bookCacheManager.prototype;
//加载所有书籍
bookCacheManager.proto.loadAll=async function(){
    console.log(`开始加载小说全部小说...`);
    let books=await this.getAllBooks();
    if(books&&books.length>0){
        console.log("已经缓存");
    }else{
      console.log("未缓存...");
        let allBookList=[];
        let subList=await  categoriesQuery.getSubCategories();
        for(let gender in subList){
            let majorList =subList[gender];
            if(typeof majorList=="object"){
                for(let item of majorList){
                    let major=item.major;
                    let mins=item.mins;
                    for(let min of mins){
                           let counter=0;
                            let category=gender+" "+major+" "+min;
                            console.log("加载小说分类:"+category);
                            let data= await bookQuery.getBookByCategory(gender,major,min,0,50);
                            let total=data.total;
                            let count=Math.ceil(total/50);
                            let books=data.books;
                            allBookList=allBookList.concat(books);
                            console.log(category+",共"+count+"页");
                            console.log(category+"，第1页,共:"+books.length+"部");
                            for(let start=1;start< count;start++){
                                let newStart=start*50;
                                data= await bookQuery.getBookByCategory(gender,major,min,newStart,50);
                                let books=data.books;
                                console.log(category+"，第"+(start+1)+"页,共:"+books.length+"部");
                                if(books.length==0){
                                    counter++
                                    if(counter>5){ //尝试5次 如果还为0 说明没数据了
                                        counter=0;
                                        break;
                                    }
                                    continue;
                                }
                                allBookList=allBookList.concat(books);
                            }
                    }
                }
            }
        }
        cache.set("books:all",JSON.stringify(allBookList));
        console.log(`加载小说全部小说${allBookList.length} 部`);
    }

}
//从缓存中获取所有书籍
bookCacheManager.proto.getAllBooks=function(){
    return new Promise((resolve, reject)=>{
        console.log("开始获取全部书籍...");
        cache.get("books:all",(err,books)=>{
            if(err){
                reject(err);
            }else{
              if(books){
                console.log(`获取全部书籍成功，书籍数量${books.length}...`);
                books=JSON.parse(books);
                resolve(books)
              }else{
                resolve([])
              }
            }
        })
    })
}




//加载书源信息
bookCacheManager.proto.loadAllBookSource=async function () {
    let books=await this.getAllBooks();
    console.log(books.length);
    // books=books.slice(0,2);
    for(var i=0;i<books.length;i++){
        let book=books[i];
        let bookId=book._id;
        let source=await bookQuery.getSource(book._id);
        // let sourceId=source[0]._id;
        cache.set(bookId,JSON.stringify(source));
        console.log(`加载小说【${book.title}】源信息`);
    }
}
//获取单一源
bookCacheManager.proto.getBookSource= function(bookId){
    return new Promise((resolve, reject)=>{
        cache.get(bookId,(err,sources)=>{
            if(err){
                reject(err);
            }else{
                sources=JSON.parse(sources);
                if(sources){
                    resolve(sources[0])
                }else{
                    resolve(null)
                }
            }
        })
    })

}
//加载章节信息
bookCacheManager.proto.loadAllBookChapters=async function () {
    let books=await this.getAllBooks();
    // books=books.slice(0,2);
    for(var i=0;i<books.length;i++) {
        let book = books[i];
        let bookId = book._id;
        let source=await this.getBookSource(bookId);
        if(source&&source._id){
            let sourceId=source._id;
            let catalogList=await catalogQuery.getCatalogList(sourceId);
            if(catalogList&&catalogList.length1){
                cache.set(sourceId,JSON.stringify(catalogList));
                console.log(`加载第${i+1}部小说,小说【${book.title}】章节【${catalogList.length}】章`);
            }

        }
    }
}


//装载单个源
bookCacheManager.proto.loadBookSource=async function(bookId){
    let source=await bookQuery.getSource(bookId);
    // console.log(JSON.stringify(source));
    cache.set(bookId,JSON.stringify(source));
    console.log(`加载小说 源信息`);
}

//装在单个章节信息
// 5aa8e1cd9bb8d27a1af3b5de
bookCacheManager.proto.loadSingleSourceChapters=async function(sourceId){
    let catalogList=await catalogQuery.getCatalogList(sourceId);
    if(catalogList&&catalogList.length){
        cache.set(sourceId,JSON.stringify(catalogList));
        console.log(`加载小说章节【${catalogList.length}】章`);
    }
}

//获取指定源的章节列表
bookCacheManager.proto.getBookChapterList=async function(sourceId){
    // console.log('sourceId::::@@@@@@'+sourceId);
    let startTime=Date.now();
    return new Promise((resolve, reject)=>{
        if(sourceId){
            cache.get(sourceId,(err,catalogList)=>{
                catalogList=(catalogList==null?[]:JSON.parse(catalogList));
                err==null?resolve(catalogList):reject(err);
                console.log("从缓存中获取章节信息");
                let endTime=Date.now();
                console.log("耗时："+(endTime-startTime)+"ms");
            });
        }else {
            reject(new Error("sourceId undefined"))
        }
    })
}

//初始化启动 缓存所有数据
bookCacheManager.proto.init=async function () {
    //加载所有书籍
    // await this.loadAll();
    //加载所有源
    await this.loadAllBookSource();
    //加载所有章节
    // await this.loadAllBookChapters();
}
// let manage=new bookCacheManager();
// manage.init().then(()=>{
// //
// });
// manage.loadAllBookChapters().then(()=>{})

// new bookCacheManager().getBookChapterList('5817f1137063737f47bb47fd').then((chapterList)=>{
//     console.log(chapterList);
// });

// manage.loadBookSource('5aa8e1cd9bb8d27a1af3b5dc').then(()=>{
//
// });

module.exports=bookCacheManager;
