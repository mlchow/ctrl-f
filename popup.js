

function highlight(query) {
    console.log("highlight");
    console.log(query);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {query: query}, function(response) {
        
        // Do Something with the Response
        if (response.success)
          console.log("Success!");
        else
          console.log("Failure!");

        console.log("Number?: " + response.number);
      
      });
    });
  }


// findTags() will find and highlight the search term tag in the given
// source code. 
function findTags() {
  var search = document.getElementById( "search" );
  highlight(search.value);
}

// learnMore() opens a new tab to the w3schools URL appropriate to 
// the search term. 
// in the format: http://www.w3schools.com/tags/tag_[name].asp 
function learnMore() {
  var search = document.getElementById( "search" );
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

var button = document.getElementById( "search-button" ); //store variable from .html doc, ID=search, into variable 'search'
button.addEventListener("click", findTags);

var learnmore = document.getElementById( "learn-more" );
learnmore.addEventListener("click", learnMore);
