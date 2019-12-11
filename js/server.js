// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every mission giving > 2500 xp\n" +
            "from DF2 Haven:" +
            "\n***********************************\n");

axios.get("https://www.df2haven.com/missions/").then(function(response) {

  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  $("tr").each(function(i, element) {

    var missionBuilding = $(element).children("td:nth-child(3)").text();
    var missionCity = $(element).children("td:nth-child(4)").text().toUpperCase();
    var missionObj = $(element).children("td:nth-child(5)").text();
    var missionGuide = $(element).find("div.guide-text").text();
    var missionExp = $(element).children("td:nth-child(15)").text();
    var missionText = missionBuilding + "- " + missionObj;

    var originBuilding = $(element).children("td:nth-child(11)").text();
    var originCity = $(element).children("td:nth-child(12)").text().toUpperCase();
    var originPerson = $(element).children("td:nth-child(10)").text();
    var originGuide = $(element).find("td.col-origin-location").text();
    var originText = originPerson + " - " + originBuilding;

    if (missionGuide == ""){
        missionGuide = "No guide available yet."
    };

    if (originGuide == "" || originGuide == "0"){
        originGuide = "No guide available yet."
    };

    // If EXP is greater than 2500 and is not Extermination, push results.
    if (Number(missionExp) > 2500 && missionObj !== "Exterminate"){
            results.push({
                missionExp: missionExp,
                missionCity: missionCity,
                missionObj: missionObj,
                missionGuide: missionGuide,
                missionText: missionText,

                originCity: originCity,
                originBuilding: originBuilding,
                originPerson: originPerson,
                originGuide: originGuide,
                originText: originText
              });
    }

    if (results==[]){
        console.log("Missions are currently unavailable due to reset. Please try again later.")
    }
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);

console.log("\n***********************************\n" +
            "Pushing all missions\n" +
            "into their respective cities..." +
            "\n***********************************\n");

  // Object containing the optimal route.
  var route = new Object();
  route.alban = [];
  route.arch = [];
  route.coop = [];
  route.dall = [];
  route.dawn = [];
  route.dunt = [];
  route.grey = [];
  route.have = [];
  route.lerw = [];
  route.rave = [];
  route.rich = [];
  route.smoor = [];
  route.wmole = [];
  route.final = ["Hello world"];
  route.return = [];

// ----------
// FUNCTIONS LISTED BELOW
// ----------

  function createRoute(){
    for (i=0; i < results.length; i++){

        if (results[i].missionCity=="DAWNHILL" || results[i].originCity=="DAWNHILL" ){
          route.dawn.push(results[i]);
        };

        if (results[i].missionCity=="LERWILLBURY" || results[i].originCity=="LERWILLBURY" ){
          route.lerw.push(results[i]);
        };

        if (results[i].missionCity=="RICHBOW HUNT" || results[i].originCity=="RICHBOW HUNT" ){
          route.rich.push(results[i]);
        };

        if (results[i].missionCity=="GREYWOOD" || results[i].originCity=="GREYWOOD" ){
          route.grey.push(results[i]);
        };

        if (results[i].missionCity=="ALBANDALE PARK" || results[i].originCity=="ALBANDALE PARK"){
          route.alban.push(results[i]);
        };
    }
  };
/*
  function tallyRoute(){

    var arch = route.arch.length;
    var alban = route.alban.length;
    var coop = route.coop.length;
    var dawn = route.dawn.length;
    var dunt = route.dunt.length;
    var grey = route.grey.length;
    var have = route.have.length;
    var lerw = route.lerw.length;
    var rave = route.rave.length;
    var rich = route.rich.length;
    var wmole = route.wmole.length;

    // Go through each key in the Route object.
    // Tally missions per city count
  }
*/

// ----------
// END OF ALL FUNCTIONS
// ----------

  // Run functions to analyze the results and push into the final route array.
  createRoute();
  console.log(route);
  console.log("\n***********************************\n" +
            "Generating route based on locations...\n" +
            "\n***********************************\n");
  tallyRoute();
  console.log(route.final);
  console.log("\n***********************************\n" +
            "END\n" +
            "\n***********************************\n");


//AXIOS THEN RESPONSE CLOSING TAG. DO NOT DELETE.
});

/* -Pseudo Code-
Grab each row.
Separate each column into their respective categories.
Separate into their cities.
*/