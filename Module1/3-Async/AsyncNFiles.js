let files = ["./f1.txt", "./f2.txt", "./f3.txt","./f4.txt","f5.txt"];

let fs = require("fs");




//Parallel


for(let i = 0;i < files.length;i++){
    fs.readFile(files[i],function(error,data){
        console.log(data + "");
    });
}





// Serial


function asyncllel(files,i){
    if(i >= files.length) return;
    fs.readFile(files[i],function(error,data){
        console.log(data + "");
        asyncllel(files,i + 1);
    });
}


asyncllel(files,0);