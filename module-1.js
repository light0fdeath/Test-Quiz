var currentTracking=0;
var indexVal= 0;
var leftTracking;
var conf_length;
var rightTracking = 0;
var llength=0;


$(document).ready(function(){

    loadQuestion(currentTracking);
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
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
        var llength = $(".right-col div").outerHeight();
        var y1 = llength/2;
        var x1 = llength/2;

            if(rightTracking == currentTracking){

            var id = this.id.replace("right-ele-","");
        //    loadQuestion(currentTracking);
        //    console.log("LeftTracking = " + rightTracking);
        //    console.log("Tracking Index", currentTracking);

            rightTracking ++;

            var kdata = "tile"+(leftTracking+1);
            var feedTitle = configuration[kdata]["parts"][id]["feedback"];
            var colorborder = configuration[kdata]["parts"][id]["answer"];
            var colorlen = (id)*1+1;

            $(".right-col div:nth-child(" + (colorlen) + ")").addClass(colorborder);

            y1 = y1*(currentTracking + 1) + currentTracking*(y1 + 10) ;
            var rlength = 50 + x1*colorlen + (colorlen-1)*(x1+10);

            if(colorborder == "correct"){
                drawline();
            }

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
                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    llength = 53.5;
                    rlength = 0;
                }
    		});

            function drawline(){

                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.setLineDash([10, 10]);
                ctx.moveTo(0,y1);
                ctx.lineTo(220,rlength);
                ctx.stroke();
            }
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
        LeftContentHTML += '<div id="left-ele-' + i + ' left-box">' + leftTitle + '</div>';
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
