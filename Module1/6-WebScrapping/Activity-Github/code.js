const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const link = "https://github.com/topics";

request(link,function(error,response,html){
    process(html);
});


function process(html){
    let ch = cheerio.load(html);

   
    let allaTags = ch(".topic-box a");

    for(let i = 0;i < allaTags.length;i++){
        
    }

    console.log(allaTags.length);
}