var sel_btn       = document.getElementById( "search-button" );
var unsel_btn     = document.getElementById( "unselect-button" );
var learnmore_btn = document.getElementById("learn-more");

var num_div   = $("#num");

var select    = $("#search-button");
var unselect  = $("#unselect-button");

var learnmore = $( "#learn-more" );
learnmore.hide();

var unselect  = $( "#unselect-button" );
unselect.hide();

var selectedColor = "red";

var redButton = document.getElementById("redButton");
var yellowButton = document.getElementById("yellowButton");
var blueButton = document.getElementById("blueButton");
var greenButton = document.getElementById("greenButton");

var redTag = "";
var yellowTag = "";
var blueTag = "";
var greenTag = "";

var numColors = 0;

var greeting = $("#greeting");


// function handler() {
//   $("#scroll").scrollIntoView();
// }

// var scroll = document.getElementById("scroll");
// scroll.addEventListener("click", handler);


// findTags() will find and highlight the search term tag in the given
// source code. 
function findTags() {
  var search = document.getElementById( "tags" );
  if (search.value == "") return;
  else if ($.inArray(search.value, availableTags) < 0) {
    window.alert("Cannot find term");
  } else {
    highlight(search.value);
  }
}

// Show Search button
function prepareSelect() {
  if (numColors == 0) {
    unselect.hide();
    // select.show();
    num_div.remove();

    // Disable "Learn More" Button
    learnmore.hide();
    greeting.hide();
    num_div.empty();
    $("#search").val("");
  }
}

// Show Unselect Button 
function prepareUnselect() {
  // select.hide();
  unselect.show();

  // Enable "Learn More" Button
  learnmore.show();
  greeting.show();
}

// Send a message to content.js to apply styling to the selected content.

function highlight(query) {
  console.log("highlight: " + query);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {query: query, task: "highlight", col: selectedColor}, function(response) {
        prepareUnselect();

        var str = "#" + selectedColor + "Button";
        $(str).empty();
        $("#term").empty();
        $("#term").append("\u003c " + query + " \u003e");

        // construct ID
        var id = "#" + selectedColor + "Button";
        $(id).append("<div>"+response.number+'</div>');
        console.log(id);

        // Return the number of matches
        //num_div.append("<strong>"+response.number+" matches</strong>");
      });
    });
    if (selectedColor == "red") redTag = query;
    if (selectedColor == "yellow") yellowTag = query;
    if (selectedColor == "blue") blueTag = query;
    if (selectedColor == "green") greenTag = query;

    numColors++;

  }

function unhighlight() {
      var query = "";
      var id = "#" + selectedColor + "Button";
      $(id).empty();
      if (selectedColor == "red") {query = redTag; redTag = "";}
      if (selectedColor == "yellow") {query = yellowTag; yellowTag = "";}
      if (selectedColor == "blue") {query = blueTag; blueTag = "";} 
      if (selectedColor == "green") {query = greenTag; greenTag = "";}

      $(".count").empty();
      $("#term").empty();

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {query: query, task: "unhighlight"}, function(response) {
          prepareSelect();

      });
    });

      numColors--;


}

function isTag(query) {
  if (query == "") 
    return false;
  else 
    return true;
}


// When search is clicked. Determine whether to move to a successful state (and highlight)
// or a failure state (error).
function handleSearch() {
  var query = findTags();
  if (isTag(query))
    highlight(query);
  // else
    // handleError(query);
}

// learnMore() opens a new tab to the w3schools URL appropriate to 
// the search term. 
// in the format: http://www.w3schools.com/tags/tag_[name].asp 
function learnMore() {
  var search = document.getElementById( "tags" );
    if ($.inArray(search.value, availableTags) < 0) {
      window.alert("Cannot find term");
    } else {
    var div = document.body.children[0];
    var span = document.createElement('span');
    span.innerHTML = search.value;
    resetTerm(span);

    var s1 = "http://www.w3schools.com/tags/tag_";
    var s2 = span.innerHTML;
    var s3 = ".asp";
    var url = s1.concat(s2.concat(s3));
    window.open(url);
  }
}

// getTerm() determines the appropriate URL value and changes the 
// span's innerHTML.
// eg: <!--...--> will change the innerHTML to 'comment'
function resetTerm(span) {
  var item = span.innerHTML;
  if (item == "!--...--" || item == "<!--...-->") 
    span.innerHTML = "comment";
  if (item == "h1" || 
    item == "h2" ||
    item == "h3" ||
    item == "h4" ||
    item == "h5" ||
    item == "h6")
    span.innerHTML = "hn";
}

function handleRed() {
  
  learnmore.show();
  greeting.show();
  selectedColor = "red";
  $("#redButton").css("background-color", "rgb(170, 57, 57)"); 
  $("#yellowButton").css("background-color", "");
  $("#blueButton").css("background-color", "");
  $("#greenButton").css("background-color", "");

  $("#term").empty();
  if (redTag != "")
    $("#term").append("\u003c " + redTag + " \u003e");
  else { learnmore.hide(); greeting.hide(); }

}

function handleYellow() {
  learnmore.show();
  greeting.show();
  selectedColor = "yellow";
  $("#yellowButton").css("background-color", "rgb(170, 108, 57)");
  $("#redButton").css("background-color", "");
  $("#blueButton").css("background-color", "");
  $("#greenButton").css("background-color", "");

  $("#term").empty();
  if (yellowTag != "") 
      $("#term").append("\u003c " + yellowTag + " \u003e");
  else { learnmore.hide(); greeting.hide(); }
}

function handleBlue() {
  learnmore.show();
  greeting.show();
  selectedColor = "blue";
  $("#blueButton").css("background-color", "rgb(34, 102, 102)");
  $("#yellowButton").css("background-color", "");
  $("#redButton").css("background-color", "");
  $("#greenButton").css("background-color", "");

  $("#term").empty();
  if (blueTag != "") 
    $("#term").append("\u003c " + blueTag + " \u003e");
  else { learnmore.hide(); greeting.hide(); }
}

function handleGreen() {
  learnmore.show();
  greeting.show();
  selectedColor = "green";
  $("#greenButton").css("background-color", "rgb(45, 136, 45)");
  $("#yellowButton").css("background-color", "");
  $("#blueButton").css("background-color", "");
  $("#redButton").css("background-color", "");

  $("#term").empty();
  if (greenTag != "")
    $("#term").append("\u003c " + greenTag + " \u003e");
  else { learnmore.hide(); greeting.hide(); }
}

function names() {
  window.open("https://github.com/mlchow/ctrl-f");
}

$("#redButton").css("background-color", "rgb(170, 57, 57)"); 
redButton.addEventListener("click", handleRed);
yellowButton.addEventListener("click", handleYellow);
blueButton.addEventListener("click", handleBlue);
greenButton.addEventListener("click", handleGreen);

var infobutton = document.getElementById("info-button");
infobutton.addEventListener("click", names);

learnmore_btn.addEventListener("click", learnMore);
sel_btn.addEventListener("click", findTags);
unsel_btn.addEventListener("click", unhighlight);
greeting.hide();