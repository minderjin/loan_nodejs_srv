// window load
$(window).load(function(){
	fieldResize ();
});

// window resize
$(window).resize(function() {
	fieldResize ();
});

function fieldResize () {
	var imgHeight = $(".fieldRowTitle img").height();
	$('.fieldRowContents input[type="text"], .fieldRowContents input[type="tel"]').height(imgHeight);
}

// document ready
$(document).ready(function(){

	$(".addClear").append('<div class="jayClear"></div>');
	$(".addClearSpan").append('<span class="jayClear"></span>');
	$(".addClearNext").after('<div class="jayClear"></div>');
	$(".addClearNextSpan").after('<span class="jayClear"></span>');
	
	currentTime();
	function currentTime(){
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth()+1;
		day = now.getDate();
		hours = now.getHours();
		minutes = now.getMinutes();
		seconds = now.getSeconds();

		if (hours > 12){
			hours -= 12;
			ampm = "오후 ";
		}else{
			ampm = "오전 ";
		}

		if (month < 10){
			month = "0" + month;
		}
		if (day < 10){
			day = "0" + day;
		}
		
		if (hours < 10){
			hours = "0" + hours;
		}
		if (minutes < 10){
			minutes = "0" + minutes;
		}
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		$('#rightDate').html('기사입력 <span style="font-weight:800;">' + year + '.' + month + '.' + day + '</span> (' + ampm + hours + ':' + minutes + ':' + seconds + ')');
		/*document.getElementById("currentTime").innerHTML = year + "." + month + "." + day + " (" + ampm + hours + ":" + minutes + ":" + seconds + ")";*/
	}

	$('.onlyNumber02').keyup(function () { 
		this.value = this.value.replace(/[^0-9\.]/g,'');

		var charLimit = $(this).attr("maxlength");
        if (this.value.length >= charLimit) {
            $(this).next('.onlyNumber').focus();
            return false;
        }
	});
	
	$('.onlyNumber').keyup(function () { 
		this.value = this.value.replace(/[^0-9\.]/g,'');

		var charLimit = $(this).attr("maxlength");
        if (this.value.length >= charLimit) {
            $(this).parent().parent().next().find('.onlyNumber').focus();
            return false;
        }
	});

	// image change
	$("#test a img").mouseenter(function(){
		var imgSrc = $(this).attr("src").replace(".jpg", "On.jpg");
		$(this).attr("src", imgSrc);
	}).bind("mouseleave", function(){
		var imgSrc = $(this).attr("src").replace("On.jpg", ".jpg");
		$(this).attr("src", imgSrc);
	});// end image change

	//$('a').not(this).removeClass('on');

});

// go top button
// <a href="#n" onclick="go_top();">goTop</a>
function go_top(orix,oriy,desx,desy) {
	var Timer;
	if (document.body.scrollTop == 0) {
		var winHeight = document.documentElement.scrollTop;
	} else {
		var winHeight = document.body.scrollTop;
	}
	if(Timer) clearTimeout(Timer);
	startx = 0;
	starty = winHeight;
	if(!orix || orix < 0) orix = 0;
	if(!oriy || oriy < 0) oriy = 0;
	var speed = 6;
	if(!desx) desx = 0 + startx;
	if(!desy) desy = 0 + starty;
	desx += (orix - startx) / speed;
	if (desx < 0) desx = 0;
	desy += (oriy - starty) / speed;
	if (desy < 0) desy = 0;
	var posX = Math.ceil(desx);
	var posY = Math.ceil(desy);
	window.scrollTo(posX, posY);
	if((Math.floor(Math.abs(startx - orix)) < 1) && (Math.floor(Math.abs(starty - oriy)) < 1)){
		clearTimeout(Timer);
		window.scroll(orix,oriy);
	}else if(posX != orix || posY != oriy){
		Timer = setTimeout("go_top("+orix+","+oriy+","+desx+","+desy+")",15);
	}else{
		clearTimeout(Timer);
	}
}// end go top button


//$(function($) {
//})(jQuery);

