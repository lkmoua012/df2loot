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
    if (Number(missionExp) > 2000 && missionObj !== "Exterminate" && missionExp !== ""){
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
            "into the optimal route..." +
            "\n***********************************\n");

  // Object containing the optimal route.
  var route = [];
  var noGuide =[];

// ----------
// FUNCTIONS
// ----------

  function createRoute(){

    console.log("\n***********************************\n");
    console.log("There are " + results.length + " quests in the results.");
    console.log("\n***********************************\n");

    /* ------ORIGINAL------
    for (i=0; i < results.length; i++){
      console.log("\n***********************************\n");
      console.log("This is the current quest index in the results route: " + i);
      console.log("This is the length of the optimal route: " + route.length);
      console.log("\n***********************************\n");
      // if the optimal route is emtpy, push.
      if (route.length === 0){
        route.push(results[i]);
        console.log("Because it is empty, I'm pushing " + results[i].missionText + " into the optimal route");
        console.log("\n***********************************\n");
        console.log(route);
        console.log("\n***********************************\n");
      } else {

      // otherwise compare

        for (j=0; j < route.length; j++){
          console.log("\n***********************************\n");
          console.log("This is j: " + j);
          console.log("This is the length of the j route: " + route.length);
          console.log("This is the splicing formula: " + route.length + " - " + i);
          console.log("This is the pushing formula: " + route.length + " - " + "1");
          console.log("\n***********************************\n");

            if (results[i].originCity === route[j].originCity){
              console.log("I'm splicing " + results[i].missionText + " ---above--- " + route[j].missionText + " because the origin is equal to the origin.");
              route.splice(j, 0, results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            } else

            if (results[i].missionCity === route[j].originCity){
              console.log("I'm pushing1 " + results[i].missionText + " ---near--- " + route[j].missionText + " because the mission is equal to the origin.");
              route.splice(route.length-1, 0, results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            } else

            if (results[i].missionCity === route[j].missionCity){
              console.log("I'm pushing2 " + results[i].missionText + " ---near--- " + route[j].missionText + " because the mission is equal to the mission.");
              route.splice(route.length-1, 0, results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            } else

            if (results[i].originCity === route[j].missionCity){
              console.log("I'm pushing3 " + results[i].missionText + " ---below--- " + route[j].missionText + " because the origin is equal to the mission.");
              route.splice(j, 0, results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            } else

            if (j!==route.length-1){
              console.log("\nGo back to the beginning!\n");
              console.log("\n***********************************\n");
              continue;
            } else
            {
              console.log("I'm pushing4 " + results[i].missionText);
              route.push(results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            }

        }
      }
    }*/

    for (i=0; i < results.length; i++){
      console.log("\n***********************************\n");
      console.log("This is the current quest index in the results route: " + i);
      console.log("This is the length of the optimal route: " + route.length);
      console.log("\n***********************************\n");
      // if the optimal route is emtpy, push.
      if (route.length === 0){
        route.push(results[i]);
        console.log("Because it is empty, I'm pushing " + results[i].missionText + " into the optimal route");
        console.log("\n***********************************\n");
        console.log(route);
        console.log("\n***********************************\n");
      } else {

      // otherwise compare

        for (j=0; j < route.length; j++){
          console.log("\n***********************************\n");
          console.log("This is j: " + j);
          console.log("This is the length of the j route: " + route.length);
          console.log("\n***********************************\n");

            if (results[i].originCity === route[j].originCity
              || results[i].missionCity === route[j].originCity
              || results[i].missionCity === route[j].missionCity
              || results[i].originCity === route[j].missionCity){
              console.log("I'm splicing " + results[i].missionText + " ---above--- " + route[j].missionText + " because of reasons.");
              route.splice(j, 0, results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            } else

            if (j!==route.length-1){
              console.log("\nGo back to the beginning!\n");
              console.log("\n***********************************\n");
              continue;
            } else
            {
              console.log("I'm pushing4 " + results[i].missionText + " because it doesn't match with anything in the route.");
              route.push(results[i]);
              console.log("\n***********************************\n");
              console.log(route);
              console.log("\n***********************************\n");
              break;
            }

        }
      }
    }
  };

  function generateRoute(){

    console.log("There are " + route.length + " quests in the optimal route.");

    
  };

      /*
      Essentially, if a city is equal to another in the array, it'll place the quest ahead or below.

      -- Current Issue --
      console log is correct, but the results are pushing and splicing incorrectly. need to find out how to track j and i.
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
  generateRoute();
  console.log("\n***********************************\n" +
            "END\n" +
            "\n***********************************\n");


//AXIOS THEN RESPONSE CLOSING TAG. DO NOT DELETE.
});