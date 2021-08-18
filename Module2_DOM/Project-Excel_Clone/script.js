let rowSection = document.querySelector(".row-number-section");

let allCellDataObj = new Object;

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

        // let obj = new Object();

        // obj.value = undefined;
        // obj.formula = undefined;
        // obj.downstream = [];
        // obj.upstream = [];

        // allCellDataObj[cellAddress] = obj;

        allCellDataObj[cellAddress] = {
            value: undefined,
            formula : undefined,
            downstream : [],
            upstream : [],
            bold : "normal",
            italic : "normal",
            underline : "normal",
            align : "left",
            bgColor : "white",
            color : "black",
            text : "Mukta",
            height : 10,
        };

        cellDiv.addEventListener("input",function(e){
            currCellAddress = e.currentTarget.getAttribute("cell-address");

            let currCellObj = allCellDataObj[currCellAddress];

            currCellObj.value = e.currentTarget.innerText;

            currCellObj.formula = undefined;

            let upstream = currCellObj.upstream;

            for(let i in upstream){
                removeFromDownstream(upstream[i],currCellAddress);
            }

            currCellObj.upstream = [];

            let downstream = currCellObj.downstream;
            for(let i in downstream){
                updateCell(downstream[i]);
            }

            allCellDataObj[currCellObj] = currCellObj;
        });
    }

    cellSection.append(columnDiv);
}

if(localStorage.getItem("sheet")){

    allCellDataObj = JSON.parse(localStorage.getItem("sheet"));

    for(let x in allCellDataObj){
        let cell = document.querySelector(`[cell-address = '${x}']`);

        if(allCellDataObj[x].value) cell.innerText = allCellDataObj[x].value;
    }
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

let formulaInput = document.querySelector(".formula-input");

formulaInput.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        let typedFormula = e.currentTarget.value;

        if(!lastCell) return;

        let selectedCellAddress = lastCell.getAttribute("cell-address");

        let currCellObj = allCellDataObj[selectedCellAddress];

        // 1- change formula
        currCellObj.formula = typedFormula;

        // 2- remove from upstream and empty upstream
        let upstream = currCellObj.upstream;

        for(let i in upstream){
            removeFromDownstream(upstream[i],selectedCellAddress);
        }

        currCellObj.upstream = [];

        // 3- make new upstream
        let arr = typedFormula.split(" ");

        for(let i in arr){
            if(isNaN(arr[i]) && arr[i] != "+" && arr[i] != "-" && arr[i] != "*" && arr[i] != "/"){
                currCellObj.upstream.push(arr[i]);
            }
        }

        // 4- update to downstream of upstream
        for(let i in currCellObj.upstream){
            updateDownstream(currCellObj.upstream[i],selectedCellAddress);
        }
        
        // 5- update value
        updateCell(selectedCellAddress);

        // allCellDataObj[currCellObj] = currCellObj;


    }
});

function removeFromDownstream(parentCell,childCell){
    let downstream = allCellDataObj[parentCell].downstream;
    downstream.splice(downstream.indexOf(childCell),1);
    allCellDataObj[parentCell].downstream = downstream;
}

function updateCell(cell){
    let cellObj = allCellDataObj[cell];
    let formula = cellObj.formula;
    let upstream = cellObj.upstream;
    for(i in upstream){
        formula = formula.replace(upstream[i],allCellDataObj[upstream[i]].value == "" ? "0" : allCellDataObj[upstream[i]].value);
    }
    cellObj.value = eval(formula) == 0 ? "" : eval(formula);

    document.querySelector(`[cell-address = '${cell}']`).innerText = cellObj.value


    for(let i in cellObj.downstream){
        updateCell(cellObj.downstream[i]);
    }
}

function updateDownstream(parentCell,childCell){
    allCellDataObj[parentCell].downstream.push(childCell);
}