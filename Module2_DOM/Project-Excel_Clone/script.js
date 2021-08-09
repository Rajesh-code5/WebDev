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

let cellSection = document.querySelector(".cell-section");

for(let i = 1;i <= 100;i++){
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for(let j = 65;j <= 90;j++){
        let cellAddress = String.fromCharCode(j) + i;

        let cellDiv = document.createElement("div");

        cellDiv.setAttribute("cell-address",cellAddress);
        cellDiv.classList.add("cell")

        rowDiv.append(cellDiv);
    }

    cellSection.append(rowDiv);
}