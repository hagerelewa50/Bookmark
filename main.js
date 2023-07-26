var nameInput=document.getElementById("bookName");
var urlInput = document.getElementById("siteUrl");
var btnSub = document.getElementById("btn-sub");
var alertName = document.getElementById("alertName")
var nameReq = document.getElementById("nameReq")
var siteReq = document.getElementById("siteReq")
var currentIndex=0;
var bookList = [];
if (localStorage.getItem("bookmark")!=null){
    bookList=JSON.parse(localStorage.getItem("bookmark"));
    disply();
}else{
    bookList = [];
}


function addBook(){
    var book ={
        name:nameInput.value,
        site:urlInput.value
    }
    var bookListFilter = bookList.filter((book)=>book.name.includes(nameInput.value ));
        if(nameInput.value == "" ){
            nameReq.style.display ="block";
        } else if( urlInput.value == ""){
            siteReq.style.display ="block";
        }
        else if (bookListFilter.length === 0){
            bookList.push(book);
            localStorage.setItem("bookmark",JSON.stringify(bookList))
            disply();
            nameInput.value = "";
            urlInput.value = "";        
            alertName.style.display ="none";
            nameReq.style.display ="none";
            siteReq.style.display ="none";
        } else if(bookListFilter.length !== 0) {
            alertName.style.display="block";
        }
    }

function disply(){
    var temp='';
    for(var i =0; i<bookList.length;i++){
        temp+=`<div class="col-11  mx-auto py-5 containr-add mt-4">
        <div class="add-book d-flex px-3">
            <h3 class="col-5">`+bookList[i].name +`</h3>
            <div class="col-4">
                <a  target="_blank" href="`+bookList[i].site +`"><button type="submit" class="btn btn-primary me-2">visit</button></a>
                <button type="submit"  onclick="deleteBook(`+i+`)" class="btn btn-danger btn-delete">delete</button>
            </div>
        </div>
    </div>`
    }
    document.getElementById("contBook").innerHTML = temp;
}

btnSub.addEventListener("click",addBook);

function deleteBook(ind){
    bookList.splice(ind,1);
    disply();
    localStorage.setItem("bookmark",JSON.stringify(bookList))
}
