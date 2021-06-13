

// function to move files in parent folder of same type as file




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
                let pathSoFar = testFolderPathName[0];
                let flag = false;
                for(let j = 1; j < testFolderPathName.length - 1;j++){
                    pathSoFar += "/" + testFolderPathName[j];
                    if(testFolderPathName[j] == folderName){
                        move(testFolderPath,pathSoFar,files[i]);
                        flag = true;
                        break;
                    }
                }
                if(!flag){
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
}