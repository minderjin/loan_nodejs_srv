// window load
$(window).load(function(){
    //
});

// window resize
$(window).resize(function() {
    //
});

// document ready
$(document).ready(function(){

    $(".addClear").append('<div class="jayClear"></div>');
    $(".addClearSpan").append('<span class="jayClear"></span>');
    $(".addClearNext").after('<div class="jayClear"></div>');
    $(".addClearNextSpan").after('<span class="jayClear"></span>');

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


function IsPhoneChek(strNumber)
{
    var regExpr = /^[0-9]{3,4}$/;

    if ( regExpr.test( strNumber ) )
        return true;
    else
        return false;
}

function subm(frmIdx){

    var fr = document.frm;

    if (frmIdx == "2") {
        fr = document.frm2;
    }

    if (fr.uname.value == "")	{
        alert('신청자 이름을 입력해주세요.');
        fr.uname.focus();
        return;
    }

    if(IsPhoneChek(fr.phone1.value)==false) {
        alert('연락처 번호를 정확하게 입력하세요.');
        fr.phone1.focus();
        return;
    }
    if(IsPhoneChek(fr.phone2.value)==false) {
        alert('연락처 번호를 정확하게 입력하세요.');
        fr.phone2.focus();
        return;
    }
    if(IsPhoneChek(fr.phone3.value)==false) {
        alert('연락처 번호를 정확하게 입력하세요.');
        fr.phone3.focus();
        return;
    }

    if(fr.agree[0].checked==false) {
        alert("개인정보수집/이용동의하셔야 신청 가능합니다.");
        fr.agree[0].focus();
        return;
    }

    fr.submit();
}


//$(function($) {
//})(jQuery);

