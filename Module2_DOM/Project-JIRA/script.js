let addBtn = document.querySelector(".add");

let body = document.querySelector("body");

let grid = document.querySelector(".grid");

let colors = ["pink","blue","green","black"];


// add fuctionality to filter option
let filterColorBtn = document.querySelectorAll(".filter div");

let filterFlag = [false,false,false,false];

for(let i = 0;i < filterColorBtn.length;i++){
    filterColorBtn[i].addEventListener("click",function(e){
        let filterDiv = document.querySelectorAll(".filter");
        if(filterFlag[i]){
            filterFlag[i] = false;
            loadTasks();
            filterDiv[i].classList.remove("filter-select");
        }else{
            filterFlag[i] = true;
            let filterColor = filterColorBtn[i].classList[1];
            loadTasks(filterColor);
            filterDiv[i].classList.add("filter-select");
        }
    });
}
//---------------------------------------------------


let deleteBtn = document.querySelector(".delete");

let uid = ShortUniqueId();

// Create allTickets obj in localstorage
if(localStorage.getItem("AllTickets") == undefined){
    
    let allTickets = {};
    
    allTickets = JSON.stringify(allTickets); // localstorage only store string
    
    localStorage.setItem("AllTickets",allTickets);
}
//-----------------------------------------

loadTasks();

//delete
let flag = false;  //delete btn off
deleteBtn.addEventListener("click",function(){
    
    if(flag == false){
        
        flag = true; // delete btn on
        
        deleteBtn.classList.add("delete-select"); // highlight delete
        
        let div = document.querySelector(".modal"); //  if add modal div on the screen or not
        
        if(div) div.remove(); // if modal div on screen remove it
    
    }else{
        
        flag = false;
        
        deleteBtn.classList.remove("delete-select");  //unhighlight delete
    }
});
//--------------------------------------------------

//add
addBtn.addEventListener("click",function(){

    if(flag){  //if delete on,off and unhighlight it
        
        flag = false;
        
        deleteBtn.classList.remove("delete-select");
    }


    let preModal = document.querySelector(".modal");

    if(preModal != null) return;  //if modal is already on screen dont pop it again

    let div = document.createElement("div");

    div.classList.add("modal");

    div.innerHTML = `<div class="task-section">
    <div class="text-area" contenteditable="true"></div>
    </div>
    <div class="priority-section">
        <div class="priority-content">
            <div class="priority-inner-content pink"></div>
            <div class="priority-inner-content blue"></div>
            <div class="priority-inner-content green"></div>
            <div class="priority-inner-content black selected-black"></div>
        </div>
    </div>`;
    
    let color = "black";
    
    let allModalPriority = div.querySelectorAll(".priority-inner-content"); // select all colors div in modal

    for(let i = 0;i < allModalPriority.length;i++){
        
        allModalPriority[i].addEventListener("click",function(e){ // change color to selected color div from black
            
            for(let j = 0;j < allModalPriority.length;j++){
            
                color = allModalPriority[j].classList[1];
            
                allModalPriority[j].classList.remove(`selected-${color}`);
            }

            color = e.currentTarget.classList[1];
            
            e.currentTarget.classList.add(`selected-${color}`);
        });
    }

    let textArea = div.querySelector(".text-area");
    
    textArea.addEventListener("keydown",function(e){ // if enter pressed in text area make ticket if escape pressed remove modal fron UI 
        if(e.key == "Enter"){ // Enter pressed add ticket and also save to local Storage
            
            let ticketDiv = document.createElement("div");
            
            ticketDiv.classList.add("ticket");
            
            let id = uid();
            
            let task = e.currentTarget.innerText;
            
            //get data for localStorage
            let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object

            // update
            let ticketObj = { TicketColor : color,
                taskValue : task,
            };

            allTickets["#" + id] = ticketObj;

            // save updated data to local storage
            localStorage.setItem("AllTickets",JSON.stringify(allTickets));

            
            ticketDiv.innerHTML = `<div data-id = "#${id}" class="ticket-color ${color}"></div>
            <div class="ticket-id">#${id}</div>
            <div data-id = "#${id}" class="ticket-task" contenteditable = "true">
                ${task}
            </div>`



            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

            let ticketTaskDiv = ticketDiv.querySelector(".ticket-task");

            ticketTaskDiv.addEventListener("input",function(e){

                let ticketIdDict = e.currentTarget.getAttribute("data-id") // Select ticket id from local storage
                
                let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object
                
                allTickets[ticketIdDict].taskValue = e.currentTarget.innerText; // change ticket color in local storage
                
                localStorage.setItem("AllTickets",JSON.stringify(allTickets)); //update updated color in local storage
            });

            ticketColorDiv.addEventListener("click",function(e){ // change color of ticket-color div in ticket
                
                let currentColor = ticketColorDiv.classList[1];
                
                let index = -1;
                
                for(let i = 0;i < colors.length;i++){
                    if(currentColor == colors[i]) index = i;
                }

                index++;
                index %= 4;

                e.currentTarget.classList.remove(currentColor); // remove previous color
                e.currentTarget.classList.add(colors[index]); // add updated color

                let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object
                
                let ticketIdDict = allTickets[ticketDiv.querySelector(".ticket-id").innerText]; // Select ticket id from local storage               
                
                ticketIdDict["TicketColor"] = colors[index]; // change ticket color in local storage
                
                localStorage.setItem("AllTickets",JSON.stringify(allTickets)); //update updated color in local storage
            });

            ticketDiv.addEventListener("click",function(e){ // remove ticket if delete is on
                if(flag){

                    let ticketId = e.currentTarget.querySelector(".ticket-id").innerText;

                    e.currentTarget.remove();

                    let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object
                    
                    delete allTickets[ticketId];
                    
                    localStorage.setItem("AllTickets",JSON.stringify(allTickets));
                    
                }
            });

            grid.append(ticketDiv); // add ticket to grid
            
            div.remove(); // remove modal
        }

        else if(e.key == "Escape"){ // if escapr pressed remove modal from UI
            div.remove();
        }
    });

    

    body.append(div);  //show modal in div
});
//----------------------------------------------------------

//load saved data
function loadTasks(color){

    let ticketOnUi = document.querySelectorAll(".ticket");

    for(let i = 0;i < ticketOnUi.length;i++){
        ticketOnUi[i].remove();
    }

    // 1. Fetch all tickets data

    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

    // 2. Create Ticket UI for Each object

    for(id in allTickets){
        let singleTicketObj  = allTickets[id];

        if(color && color != singleTicketObj.TicketColor) continue;

        let ticketDiv = document.createElement("div");
            
        ticketDiv.classList.add("ticket");

        ticketDiv.innerHTML = `<div data-id = "${id}" class="ticket-color ${singleTicketObj.TicketColor}"></div>
            <div class="ticket-id">${id}</div>
            <div data-id = "${id}" class="ticket-task" contenteditable = "true">
                ${singleTicketObj.taskValue}
            </div>`

            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

            let ticketTaskDiv = ticketDiv.querySelector(".ticket-task");

            ticketTaskDiv.addEventListener("input",function(e){

                let ticketIdDict = e.currentTarget.getAttribute("data-id") // Select ticket id from local storage
                
                let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object
                
                allTickets[ticketIdDict].taskValue = e.currentTarget.innerText; // change ticket color in local storage
                
                localStorage.setItem("AllTickets",JSON.stringify(allTickets)); //update updated color in local storage
            });

            ticketColorDiv.addEventListener("click",function(e){ // change color of ticket-color div in ticket
                
                let currentColor = ticketColorDiv.classList[1];
                
                let index = -1;
                
                for(let i = 0;i < colors.length;i++){
                    if(currentColor == colors[i]) index = i;
                }

                index++;
                index %= 4;

                e.currentTarget.classList.remove(currentColor); // remove previous color
                e.currentTarget.classList.add(colors[index]); // add updated color

                let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object

                let ticketIdDict = allTickets[ticketDiv.querySelector(".ticket-id").innerText]; // Select ticket id from local storage               

                ticketIdDict["TicketColor"] = colors[index]; // change ticket color in local storage
                
                localStorage.setItem("AllTickets",JSON.stringify(allTickets)); //update updated color in local storage
            });

            ticketDiv.addEventListener("click",function(e){ // remove ticket if delete is on
                if(flag){

                    let ticketId = e.currentTarget.querySelector(".ticket-id").innerText;

                    e.currentTarget.remove();

                    let allTickets = JSON.parse(localStorage.getItem("AllTickets")); // convert string(converted from object) in localhost to object
                    
                    delete allTickets[ticketId];
                    
                    localStorage.setItem("AllTickets",JSON.stringify(allTickets));
                    
                }
            });

            grid.append(ticketDiv); // add ticket to grid
    }
}
//------------------------------------------------------
