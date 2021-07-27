let addBtn = document.querySelector(".add");

let body = document.querySelector("body");

let grid = document.querySelector(".grid");

let colors = ["pink","blue","green","black"];

addBtn.addEventListener("click",function(){
    let preModal = document.querySelector(".modal");

    if(preModal != null) return;

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
    let allModalPriority = div.querySelectorAll(".priority-inner-content");

    for(let i = 0;i < allModalPriority.length;i++){
        allModalPriority[i].addEventListener("click",function(e){
            for(let j = 0;j < allModalPriority.length;j++){
                color = allModalPriority[j].classList[1];
                allModalPriority[j].classList.remove(`selected-${color}`);
            }

            color = e.currentTarget.classList[1];
            e.currentTarget.classList.add(`selected-${color}`);
        });
    }

    let textArea = div.querySelector(".text-area");
    
    textArea.addEventListener("keydown",function(e){
        if(e.key == "Enter"){
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");

            ticketDiv.innerHTML = `<div class="ticket-color ${color}"></div>
            <div class="ticket-id">#hdruhy</div>
            <div class="ticket-task">
                ${e.currentTarget.innerText}
            </div>`;

            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

            ticketColorDiv.addEventListener("click",function(e){
                let currentColor = ticketColorDiv.classList[1];
                let index = -1;
                for(let i = 0;i < colors.length;i++){
                    if(currentColor == colors[i]) index = i;
                }

                index++;
                index %= 4;

                e.currentTarget.classList.remove(currentColor);
                e.currentTarget.classList.add(colors[index]);
            });

            grid.append(ticketDiv);
            div.remove();
        }

        else if(e.key == "Escape"){
            div.remove();
        }
    });

    

    body.append(div);
});
