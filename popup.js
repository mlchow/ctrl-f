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


// function handler() {
//   $("#scroll").scrollIntoView();
// }

// var scroll = document.getElementById("scroll");
// scroll.addEventListener("click", handler);


// findTags() will find and highlight the search term tag in the given
// source code. 
function findTags() {
  var search = document.getElementById( "tags" );
  if ($.inArray(search.value, availableTags) < 0) {
    window.alert("Cannot find term");
  } else {
    highlight(search.value);
  }
}

// Show Search button
function prepareSelect() {
  unselect.hide();
  // select.show();
  num_div.remove();

  // Disable "Learn More" Button
  learnmore.hide();
  num_div.empty();
  $("#search").val("");

}

// Show Unselect Button 
function prepareUnselect() {
  // select.hide();
  unselect.show();

  // Enable "Learn More" Button
  learnmore.show();
}

// Send a message to content.js to apply styling to the selected content.

function highlight(query) {
  console.log("highlight: " + query);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {query: query, task: "highlight", col: "red"}, function(response) {
        prepareUnselect();

        // Return the number of matches
        num_div.append("<strong>"+response.number+" matches</strong>");
      });
    });
  }

function unhighlight() {
      var query = findTags();
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {query: query, task: "unhighlight"}, function(response) {
          prepareSelect();
      });
    });
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



learnmore_btn.addEventListener("click", learnMore);
sel_btn.addEventListener("click", handleSearch);
unsel_btn.addEventListener("click", unhighlight);


