let rowSection = document.querySelector(".row-number-section");

let allCellDataObj = new Object();

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

let cellSection = document.querySelector(".cell-section");

for(let i = 65;i <= 90;i++){
    let columnDiv = document.createElement("div");
    columnDiv.classList.add("column");

    for(let j = 1;j <= 100;j++){
        let cellAddress = String.fromCharCode(i) + j;

        let cellDiv = document.createElement("div");

        cellDiv.contentEditable = true;
        cellDiv.setAttribute("cell-address",cellAddress);
        cellDiv.classList.add("cell")

        columnDiv.append(cellDiv);

        let obj = new Object();

        obj.value = 0;
        obj.formula = "formula";
        obj.downstream = [];
        obj.upstream = [];

        allCellDataObj[cellAddress] = obj;
    }

    cellSection.append(columnDiv);
}

cellSection.addEventListener("scroll",function(e){
    columnSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
    rowSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
});

let selectedDiv = document.querySelectorAll(".cell");
let lastCell;
let formulaBarSelectedCell = document.querySelector(".formula-selected-cell")

for(let i = 0;i < selectedDiv.length;i++){
    selectedDiv[i].addEventListener("click",function(e){
        if(lastCell) lastCell.classList.remove("selected-cell");
        e.currentTarget.classList.add("selected-cell");
        lastCell = e.currentTarget;
        formulaBarSelectedCell.innerText = e.currentTarget.getAttribute("cell-address");
    });
}