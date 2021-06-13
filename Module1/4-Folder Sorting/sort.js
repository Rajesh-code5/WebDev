const fs = require("fs");
const extensions = require("./extensions");

let testFolderPath = "./TestFolder";

let files = fs.readdirSync(testFolderPath);

// console.log(files);

for(let i = 0;i < files.length;i++){
    let ext = files[i].split(".")[1];

    // console.log(ext);

    let folderName = getFolderName(ext);


    // console.log(folderName);

    let folderPath = testFolderPath + "/" + folderName;
    if(!fs.existsSync(folderPath)){
        // folder not exist
        // make dir

        fs.mkdirSync(folderPath);
    }

    //copy file

    let sourcePath = testFolderPath + "/" + files[i];
    let destinPath = folderPath + "/" + files[i];

    fs.copyFileSync(sourcePath, destinPath);

    
    // delete source file

    fs.unlinkSync(sourcePath);

}


function getFolderName(ext){
    let folderName;

    // for in

    for(let key in extensions){
        if(extensions[key].includes(ext)){
            folderName = key;
            return folderName;
        }
    }
}


// function sortFiles(ext){
    
// }