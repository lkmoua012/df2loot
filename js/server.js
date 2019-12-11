// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every mission giving > 2000 xp\n" +
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
    var missionText = missionCity + " - " + missionBuilding + "- " + missionObj;

    var originBuilding = $(element).children("td:nth-child(11)").text();
    var originCity = $(element).children("td:nth-child(12)").text().toUpperCase();
    var originPerson = $(element).children("td:nth-child(10)").text();
    var originGuide = $(element).find("td.col-origin-location").text();
    var originText = originCity + " - " + originBuilding + " - " + originPerson;

    if (missionGuide == ""){
        missionGuide = "No guide available yet."
    };

    if (originGuide == "" || originGuide == "0"){
        originGuide = "No guide available yet."
    };

    // If EXP is greater than 2500 and is not Extermination, push results.
    if (Number(missionExp) > 2000 && missionObj !== "Exterminate"){
            results.push({
                missionExp: missionExp,
                missionCity: missionCity,
                missionBuilding: missionBuilding,
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
  var route = [];

// ----------
// FUNCTIONS
// ----------

  function createRoute(){
    for (i=0; i < results.length; i++){

      // if the optimal route has a quest, compare

      if (route.length == 0){
        console.log("Hey I'm empty");
        route.push(results[i]);
      } else {
        console.log("Hey I'm not empty anymore.");
      }

    }
  };

      /*
      Essentially, if a city is equal to another in the array, it'll place the quest ahead or below.
      */


// ----------
// END FUNCTIONS
// ----------

  // Run functions to analyze the results and push into the final route array.
  createRoute();
  console.log(route);
  console.log("\n***********************************\n" +
            "Generating route based on locations...\n" +
            "\n***********************************\n");
  console.log("Hello world");
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