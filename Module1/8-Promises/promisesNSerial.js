let files = ["./f1.txt", "./f2.txt", "./f3.txt"];
const fs = require("fs");

serial(files,0);

function serial(files,i){
    if(i == files.length) return;
    let pendingPromise = fs.promises.readFile(files[i]);
    pendingPromise.then(function(data){
        console.log(data + "");
        serial(files,i + 1);
    });
    pendingPromise.catch(function(error){
        console.log(error);
    });
}
