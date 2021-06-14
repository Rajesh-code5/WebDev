const request = require("request");
const cheerio = require("cheerio");

let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(link,cb);


function cb(error,response,html){
    eval(html);
}


function eval(html){
    let ch = cheerio.load(html);

    let allBowlersTrs = ch(".table.bowler tbody tr");
    // console.log(allBowlerstrs);


    let highestWicketTakerName;
    let highestWicket;
    let lowestEconomy;

    for(let i = 0;i < allBowlersTrs.length;i++){
        let onePlayerDetails = allBowlersTrs[i];

        let allTds = ch(onePlayerDetails).find("td");

        let bowlerName = ch(allTds[0]).text();

        let wickets = ch(allTds[4]).text();

        let economy = ch(allTds[5]).text();


        if(i == 0){
            highestWicketTakerName = bowlerName;
            highestWicket = wickets;
            lowestEconomy = economy;
        }else if(wickets > highestWicket || (wickets == highestWicket && economy < lowestEconomy)){
            highestWicketTakerName = bowlerName;
            highestWicket = wickets;
            lowestEconomy = economy;
        }
    }

    console.log(`Highest Wicket taker is ${highestWicketTakerName} with ${highestWicket} wickets, and economy of ${lowestEconomy}`);
}