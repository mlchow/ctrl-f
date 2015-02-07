chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    var onList = true;

	var tagName = request.query;

	var num = 0;

    $(tagName).each(function() {
    	$(this).css("color", "yellow");
    	num++;
    });
    
    if (onList) {
    	sendResponse({
    		success: true,
    		number: num
    	});
    }
    else
    	sendResponse({
    		success: false,
    		number: 0
    	});
  });