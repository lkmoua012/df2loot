// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every mission and xp reward\n" +
            "from DF2 Haven:" +
            "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
axios.get("https://www.df2haven.com/missions/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("tr").each(function(i, element) {

    // Save the text of the element in a "title" variable
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

    // If EXP is greater than 1500 and is not Extermination, push results.
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

  // Object containing the optimal route.
  var route = new Object();
  route.dawn = [];
  route.grey = [];
  route.lerw = [];
  route.rave = [];
  route.smoor = [];
  // Run function to analyze the results and push into the new route array.

  function createRoute(){
    for (i=0; i < results.length; i++){

        //

        if (results[i].originCity=="DAWNHILL"){
            route.dawn.push("TALK: " + results[i].originText + " --- " + results[i].originGuide);
        };

        if (results[i].missionCity=="DAWNHILL"){
            route.dawn.push(results[i].missionText + " --- " + results[i].missionGuide);
        };

        // Check Mission City

        // Check Origin City

    }
  }

  createRoute();
  console.log(route);

});

/*
Grab each row.
Separate each column into their respective categories.
*/