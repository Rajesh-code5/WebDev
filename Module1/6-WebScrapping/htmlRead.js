const fs = require("fs");

const cheerio = require("cheerio");

let htmlData = fs.readFileSync("./index.html", "utf-8");

let data = cheerio.load(htmlData);

console.log(data);