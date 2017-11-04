
var currentTracking=0;
var indexVal= 0;
var leftTracking;
var conf_length;
var rightTracking = 0;
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

        if(rightTracking == currentTracking){

        var id = this.id.replace("right-ele-","");
    //    loadQuestion(currentTracking);
    //    console.log("LeftTracking = " + rightTracking);
    //    console.log("Tracking Index", currentTracking);
        rightTracking ++;

        var kdata = "tile"+(leftTracking+1);
        var feedTitle = configuration[kdata]["parts"][id]["feedback"];
        var colorborder = configuration[kdata]["parts"][id]["answer"];

        console.log(colorborder);
        var ids  = (id) * 1 + 1 ;
        console.log(ids);

        $(".right-col div:nth-child(" + (ids) + ")").addClass(colorborder);

        var fbutton = '<div class="fbutton">' + "Close" +'</div>';
        var FeedContentHTML = '<div class="feedback" id="feedback-ele' + indexVal + '"><p>Feedback<br></p>' + feedTitle + '<p><br>Try Again</p></div>';
        FeedContentHTML += fbutton;

        $(".feedback-col").html(FeedContentHTML);
		
		$(".fbutton").click(function()
		{
			currentTracking++;
			loadQuestion(currentTracking);
			console.log("Tracking Index", currentTracking);
			$(".feedback-col").empty();

            if(currentTracking  == size){
                alert("Over");
                loadQuestion(0);
                currentTracking=0;
                indexVal= 0;
                rightTracking = 0;
            }
		});
    }

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
				my_title_data_ans[i,j] = '<p>"Hello"</p><p>' + parts[j]["feedback"] + '</p>';
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
