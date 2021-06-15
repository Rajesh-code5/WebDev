const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


// let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";


function getMatchDetails(matchlink){
    request(matchlink, function(error,response,html){
        process(html);
    });
}

function process(html){
    let ch = cheerio.load(html);

    let bothInnings = ch(".Collapsible");

    // console.log(bothInnings);

    for(let i = 0;i < bothInnings.length;i++){
        let oneInning = bothInnings[i];

        let teamName = ch(oneInning).find("h5").text().split(" INNINGS ")[0];
        console.log(teamName);

        let allTrs = ch(oneInning).find(".table.batsman tbody tr");
        
        for(let j = 0;j < allTrs.length - 1;j+=2){
            let allTds = ch(allTrs[j]).find("td");
            let batsmanName = ch(allTds[0]).text().trim();
            let runs = ch(allTds[2]).text();
            let balls = ch(allTds[3]).text();
            let fours = ch(allTds[5]).text();
            let sixes = ch(allTds[6]).text();
            let strikeRate = ch(allTds[7]).text();

            // console.log(`Batsman = ${batsmanName} , score = ${runs} , fours = ${fours} , sixes = ${sixes} , strike rate = ${strikeRate}`);

            processDetails(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }

    }
    console.log("######################################################################");
}

function processDetails(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let folderPath = "./IPL";
    let isTeamFolderExist = checkTeamFolder(folderPath,teamName);

    if(isTeamFolderExist){
        let isBatsmanFileExist = checkBatsmanFile(folderPath,teamName,batsmanName);
        if(isBatsmanFileExist){
            updateBatsmanFile(folderPath,teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }else{
            createBatsmanFile(folderPath,teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
    }else{
        createTeamFolder(folderPath,teamName);
        createBatsmanFile(folderPath,teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
    }
    
}

function checkTeamFolder(folderPath,teamName){
    let teamFolderPath = `${folderPath}/${teamName}`;
    return fs.existsSync(teamFolderPath);
}

function checkBatsmanFile(folderPath,teamName,batsmanName){
    let batsmanFile = `${folderPath}/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanFile);

}

function createTeamFolder(folderPath,teamName){
    let teamFolderPath = `${folderPath}/${teamName}`;
    fs.mkdirSync(teamFolderPath);
}

function createBatsmanFile(folderPath,teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let batsmanFilePath = `${folderPath}/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let batsmanDetails = {
        Runs : runs ,
        Balls : balls , 
        Fours :fours ,
        Sixes : sixes ,
        StrikeRate : strikeRate
    }
    batsmanFile.push(batsmanDetails);

    fs.writeFileSync(batsmanFilePath, JSON.stringify(batsmanFile));
}

function updateBatsmanFile(folderPath,teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let batsmanFilePath = `${folderPath}/${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanFilePath);
    batsmanFile = JSON.parse(batsmanFile);
    let batsmanDetails = {
        Runs : runs ,
        Balls : balls , 
        Fours :fours ,
        Sixes : sixes ,
        StrikeRate : strikeRate
    }
    batsmanFile.push(batsmanDetails);

    fs.writeFileSync(batsmanFilePath , JSON.stringify(batsmanFile) );
}

module.exports = getMatchDetails;