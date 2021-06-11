const fs = require("fs");

const cheerio = require("cheerio");

let htmlData = fs.readFileSync("./index.html", "utf-8");

let data = cheerio.load(htmlData);

// console.log(data);

let ch = data("body>p").text();

console.log(ch);