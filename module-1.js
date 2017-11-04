
var currentTracking=0;
var indexVal= 0;
var leftTracking;
var conf_length;
$(document).ready(function(){

    loadQuestion(currentTracking);

});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
var size = Object.size(configuration);



function addMouseEvent() {

    $(".right-col div").click(function(e) {
        var id = this.id.replace("right-ele-","");
    // loadQuestion(currentTracking);

        var kdata = "tile"+(leftTracking+1);
        var feedTitle = configuration[kdata]["parts"][id]["feedback"]
        var fbutton = '<button class="fbutton">' + "Close" +'</button>';
        var FeedContentHTML = '<div class="feedback" id="feedback-ele' + indexVal + '">' + feedTitle + '</div>';
        FeedContentHTML += fbutton;

        $(".feedback-col").html(FeedContentHTML);

        console.log("LeftTracking = " + leftTracking);
		
		$(".fbutton").click(function()
		{
			currentTracking++;
			loadQuestion(currentTracking);
			console.log("Tracking Index", currentTracking);
			$(".feedback-col").empty();

            if(currentTracking  == size){
                alert("Over");
            }
		});

    });
}


function loadQuestion(indexVal) {
	console.log('question loaded ' + indexVal);
	
    var i = 0;
    var j = 0;

    var LeftContentHTML = "";
    var RightContentHTML = "";

    var my_title_data = [];
    var my_title_data_ans = [];
	
    for(var key in configuration) {

        var keyz = "tile"+(indexVal+1);
		console.log(keyz);
        var leftTitle='<h2>' + configuration[key]["title"] + '</h2>';
        LeftContentHTML += '<div id="left-ele-' + i + '">' + leftTitle + '</div>';
        var parts = configuration[key]["parts"];

        if(keyz==key){
			for(j=0;j<parts.length;j++){
				my_title_data_ans[i,j] = '<p>' + parts[j]["feedback"] + '</p>';
				var rightTitle = '<h2>' + parts[j]["title"] + '</h2>';
				RightContentHTML += '<div id="right-ele-' + j +'">' + rightTitle + '</div>';
				//console.log(my_title[i]);
				//console.log(my_title_data[i,j]);
				//console.log(my_title_data_ans[i,j]);
			}
        }
        i++;

	}
	leftTracking = indexVal;
	
    $(".left-col").html(LeftContentHTML);
    $(".left-col div:nth-child(" + (indexVal+1) + ")").addClass('shake');
    $(".right-col").html(RightContentHTML);
	
	addMouseEvent();



}