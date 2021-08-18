let body = document.querySelector("body");

// --------------------------- align -------------------------------------


let alignitems = document.querySelector(".text-align");

let left = alignitems.querySelector(".left");
let right = alignitems.querySelector(".right");
let center = alignitems.querySelector(".center");

left.addEventListener("click",function(e){
    if(lastCell){
        lastCell.style.textAlign = "left";
        let address = lastCell.getAttribute("cell-address");
        allCellDataObj[address].align = "left";
    }
});

center.addEventListener("click",function(e){
    if(lastCell){
        lastCell.style.textAlign = "center";
        let address = lastCell.getAttribute("cell-address");
        allCellDataObj[address].align = "center";
    }
});

right.addEventListener("click",function(e){
    if(lastCell){
        lastCell.style.textAlign = "right";
        let address = lastCell.getAttribute("cell-address");
        allCellDataObj[address].align = "right";
    }
});

// ----------------------------------------------------------------------------


// --------------------------------- Bold,Italic & Underline -----------------------------------

let textDesign = document.querySelector(".text-design");

let bold = textDesign.querySelector(".bold");
let italic = textDesign.querySelector(".italic");
let underline = textDesign.querySelector(".underline");

let isBold;
bold.addEventListener("click",function(e){
    if(lastCell){
        if(isBold){
            lastCell.style.fontWeight = "normal";
            let address = lastCell.getAttribute("cell-address");
            allCellDataObj[address].align = "normal";
            isBold = false;
            bold.style.backgroundColor = "rgb(65, 134, 65)";
        }else{
            lastCell.style.fontWeight = "bold";
            let address = lastCell.getAttribute("cell-address");
            allCellDataObj[address].align = "bold";
            isBold = true;
            bold.style.backgroundColor = "white";
        }
    }
});

let isItalic;
italic.addEventListener("click",function(e){
    if(lastCell){
        if(isItalic){
            lastCell.innerHTML = lastCell.innerText;
            let address = lastCell.getAttribute("cell-address");
            allCellDataObj[address].align = "normal";
            isItalic = false;
            italic.style.backgroundColor = "rgb(65, 134, 65)";
        }else{
            lastCell.innerHTML = lastCell.innerText.italics();
            let address = lastCell.getAttribute("cell-address");
            allCellDataObj[address].align = "italic";
            isItalic = true;
            italic.style.backgroundColor = "white";
        }
    }
});

let isUnderline;
underline.addEventListener("click",function(e){
    if(lastCell){
        if(isUnderline){
            lastCell.style.textDecoration = "none";
            let address = lastCell.getAttribute("cell-address");
            allCellDataObj[address].align = "normal";
            isUnderline = false;
            underline.style.backgroundColor = "rgb(65, 134, 65)";
        }else{
            lastCell.style.textDecoration = "underline";
            let address = lastCell.getAttribute("cell-address");
            allCellDataObj[address].align = "underline";
            isUnderline = true;
            underline.style.backgroundColor = "white";
        }
    }
});

// -----------------------------------------------------------------------------------


// ------------------------------------- Color Section --------------------------------------

let colorDiv = document.querySelector(".colorDiv");

let bgColor = colorDiv.querySelector(".bgColor");

let color = colorDiv.querySelector(".color");

bgColor.addEventListener("click",function(e){
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";

    colorPicker.click();

    colorPicker.addEventListener("input",function(e){
        if(lastCell){
            lastCell.style.backgroundColor = e.currentTarget.value;

            let address = lastCell.getAttribute("cell-address");

            allCellDataObj[address].bgColor = e.currentTarget.value;
        }
    });
});

color.addEventListener("click",function(e){
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";

    colorPicker.click();

    colorPicker.addEventListener("input",function(e){
        if(lastCell){
            lastCell.style.color = e.currentTarget.value;

            let address = lastCell.getAttribute("cell-address");

            allCellDataObj[address].color = e.currentTarget.value;
        }
    });
});


// ---------------------------------------------------------------------------------------


// -----------------------------------File Help-------------------------------------------

let file = document.querySelector(".file");

let help = document.querySelector(".help");

file.addEventListener("click",function(e){
    let isOpen = file.getAttribute("data-open");
    if(isOpen == "true"){
        file.setAttribute("data-open","false");
        file.querySelector(".file-dropdown").remove();

    }else{
        file.setAttribute("data-open","true");
        let div = document.createElement("div");
        div.classList.add("file-dropdown");

        div.innerHTML = '<p>Save</p><p>Clear</p>';

        file.append(div);

        let fileDropdown = file.querySelectorAll(".file-dropdown p");

        fileDropdown[0].addEventListener("click",function(e){
            localStorage.setItem("sheet", JSON.stringify(allCellDataObj));
        });

        fileDropdown[1].addEventListener("click",function(e){
            localStorage.setItem("sheet", "");
        });
    }
});

help.addEventListener("click",function(e){
    let div = document.createElement("div");
    div.classList.add("help-dropdown");

    help.append(div);
});
