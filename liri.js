
// liri.js is a command-line node.js application to output tweets, get movie info from omdb,
// and song info from spotify. This application uses each service's respective API.
// Author Miles Helm 26 April 2017


// Load the fs package to read and write
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");


// parse the input and assign to variables
var input = process.argv
var action = "default"



// Test to see if the correct number of command-line arguments is used (1 or 2)
if (input.length <= 2) {
  help();
  var action = "default";
}


else {
  var action = input[2];
  console.log(action);
  var value = "";
  // valueEntered flag indicates if a second command-line value was entered,
  var valueEntered = false;
  if (input.length >= 4) {
    valueEntered = true;


    // concatenate all words of the song or movie title into one string
    for (var i = 3; i < input.length; i++) {
      if ( i >= 4) {
        value = value.concat(" ");
      } 
      value = value.concat(input[i]);
    }
  }

}



// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    says();
    break;

  default:
    help();
}




function tweets() {
  console.log("tweets");
}


function spotify() {
  console.log("spotify");
}


function movie() {

  if (valueEntered === false) {
    value = "Remember the Titans";
  }
  request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Released: " + JSON.parse(body).Released);
    console.log("Language(s): " + JSON.parse(body).Language);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Runtime: " + JSON.parse(body).Runtime);
    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
  }
});


}

function says() {
  console.log("says");
}

function help() {
  console.log("Options are:\nmy-tweets\nspotify-this-song [song-name]");
  console.log("movie-this [optional movie-name]\ndo-what-it-says");
}
