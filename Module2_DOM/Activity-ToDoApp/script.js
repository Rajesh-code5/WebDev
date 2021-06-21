let ul = document.querySelector("ul");
let btn = document.querySelector("button");
let input = document.querySelector("input");


btn.addEventListener("click",function(){
    let task = input.value;

    if(task == "") return;

    let li = document.createElement("li");

    li.innerText = task;

    li.addEventListener("dblclick",function(){
        li.remove();
    })

    input.value = "";

    ul.append(li);
})