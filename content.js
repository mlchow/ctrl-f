var isRed    = false;
var isYellow = false;
var isBlue   = false;
var isGreen  = false;

var red    = "rgb(255,107,107)";
var yellow = "rgb(255,174,107)";
var blue   = "rgb(78,186,186)";
var green  = "rgb(92.221,92)";

var red_id    = "";
var yellow_id = "";
var blue_id   = "";
var green_id  = "";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	
    var tagName = request.query;
    var color = request.col;

    /* Highlight the given tab */
    if (request.task == "highlight") {
        var num = 0;

        /* Unhighlight if a color is already selected */
        if (color == "red") {
            if (isRed) {
                $(red_id).each(function() {
                    $(this).css("background-color", "");
                });
                
            }
            $(tagName).each(function() {
                $(this).css("background-color", red);
                num++;
            });

            isRed = true;
            red_id = tagName;
        }

        else if (color == "green") {
             if (isGreen)  {
                $(green_id).each(function() {
                    $(this).css("background-color", "");
                });
            }
            $(tagName).each(function() {
                $(this).css("background-color", green);
                num++;
            });

            isGreen = true;
            green_id = tagName;

        }

        else if (color == "blue") {
            if (isBlue)  {
                $(blue_id).each(function() {
                    $(this).css("background-color", "");
                });
                
            }
            $(tagName).each(function() {
                $(this).css("background-color", blue);
                num++;
            });

            isBlue = true;
            blue_id = tagName;
        }

        else if (color == "yellow") {
            if (isYellow)  {
                $(yellow_id).each(function() {
                    $(this).css("background-color", "");
                });
                
            }
            $(tagName).each(function() {
                $(this).css("background-color", yellow);
                num++;
            });

            isYellow = true;
            yellow_id = tagName;
        }


        // $(tagName).each(function() {
        // 	$(this).css("background-color", "#FFAE6B");
        // 	num++;
        // });

        sendResponse({number: num});
    }

    /* Unhighlight the given tab */
    else {
        if (tagName == red_id) {
            red_id = "";
            isRed = false;
        }
        else if (tagName == yellow_id) {
            yellow_id = "";
            isYellow = false;
        }
        else if (tagName == blue_id) {
            blue_id = "";
            isBlue = false;
        }
        else if (tagName == green_id) {
            green_id = "";
            isGreen = false;
        }

        $(tagName).each(function() {
            $(this).css("background-color", "");
        });      

        sendResponse({number: -1});
    }

    
});
