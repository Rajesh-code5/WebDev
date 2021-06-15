const request = require("request");
const cheerio = require("cheerio");
const getMatchDetails = require("./match");


let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(link ,cb);

function cb(error, response, html){
    process(html);
}

function process(html){
    let ch = cheerio.load(html);

    let allaTags = ch('a[data-hover="Scorecard"]');

    for(let i = 0;i < allaTags.length;i++){
        let matchLink = "https://www.espncricinfo.com" + ch(allaTags[i]).attr("href");
        
        getMatchDetails(matchLink);
    }
}