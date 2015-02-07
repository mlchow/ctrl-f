


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {query: "a"}, function(response) {
    
    // Do Something with the Response
    if (response.success)
      console.log("Success!");
    else
      console.log("Failure!");

    console.log("Number?: " + response.number);
  
  });
});


