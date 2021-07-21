let addBtn = document.querySelector(".add");

let body = document.querySelector("body");

addBtn.addEventListener("click",function(){
    let div = document.createElement("div");

    div.classList.add("modal");

    body.append(div);
});
