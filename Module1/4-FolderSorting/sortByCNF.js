

/*function to move files by creating new folder */


const fs = require("fs");
const extensions = require("./extensions");

let mainTestFolderPath = "./TestFolder";

allLevelSorting(mainTestFolderPath);

function allLevelSorting(testFolderPath){
    let files = fs.readdirSync(testFolderPath);
    // console.log(files);

    sortFiles(files,testFolderPath);
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

function move(testFolderPath,folderPath,file){
    //copy file
    
    let sourcePath = testFolderPath + "/" + file;
    let destinPath = folderPath + "/" + file;

    fs.copyFileSync(sourcePath, destinPath);

    
    // delete source file

    fs.unlinkSync(sourcePath);
}

function sortFiles(files,testFolderPath){
    for(let i = 0;i < files.length;i++){
        var sync = fs.statSync(testFolderPath + "/" + files[i]);

        // check if folder
        if(sync.isDirectory()){
            allLevelSorting(testFolderPath + "/" + files[i]);
        }else{
            let ext = files[i].split(".")[1];
            // console.log(ext);
    
            let folderName = getFolderName(ext);
            // console.log(folderName);

            let folderPath = testFolderPath + "/" + folderName;
            let testFolderPathName = testFolderPath.split("/");
            // console.log(testFolderPathName , folderName);

            if(folderName != testFolderPathName[testFolderPathName.length - 1]){
                if(!fs.existsSync(folderPath)){
                // folder not exist
                // make dir
    
                fs.mkdirSync(folderPath);
                }
    
                move(testFolderPath,folderPath,files[i]);
            }
        }
    }
}