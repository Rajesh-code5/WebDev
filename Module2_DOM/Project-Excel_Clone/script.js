let rowSection = document.querySelector(".row-number-section");

for(let i = 1;i <= 100;i++){
    let div = document.createElement("div");

    div.innerText = i;
    div.classList.add("row-number");
    rowSection.append(div);
}

let columnSection = document.querySelector(".column-tag-section");

for(let i = 65;i <= 90;i++){  //A to Z
    let div = document.createElement("div");
    div.innerText = String.fromCharCode(i);
    div.classList.add("column-tag");
    columnSection.append(div);
}