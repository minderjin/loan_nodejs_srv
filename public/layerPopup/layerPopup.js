


/* 이진영 -
 약관 레이어팝업을 pc버젼과 모바일에서 공통으로 쓰기위한 js 입니다.
 이 js 는 모바일과 pc 양쪽에서 로드합니다.
 레이어팝업에서 쓰이는 이미지들은 pc버젼에 있는 images 폴더에 들어가있으면 됩니다.
 */
// window load
$(window).load(function(){
    /* $('body').prepend('<div id="siteMap"></div>'); */
    $('body').prepend('<div id="layerPopup"></div>');
    // $('#layerPopup').load("/layerPopup/layerPopup.html", function(){
    $('#layerPopup').load("/layerPopup", function(){
        $('#layerPopupArea').css({"display":"none"});
    });
});

function layerPopupCenter (layerPopupParam) { // layer center
    var layerPopup = $(layerPopupParam);
    if (layerPopup.outerHeight() < $(document).height() ) {
        layerPopup.css('margin-top', '-'+layerPopup.outerHeight()/2+'px');
    } else { layerPopup.css('top', '0px'); }
    if (layerPopup.outerWidth() < $(document).width() ) {
        layerPopup.css('margin-left', '-'+layerPopup.outerWidth()/2+'px');
    } else { layerPopup.css('left', '0px'); }
}

// pc or mobile 버젼 분류 레이어팝업
// a 링크시 경로 : layerPopup('l01','mobile','750','500');
function layerPopup (popIndex, verIdx, widthValue, heightValue) {
    if(verIdx == "mobile"){
        $('#layerPopupArea').fadeIn();
        $('.'+popIndex).fadeIn();
        $('.'+popIndex+'Wrap').css({"width":"auto", "height":heightValue});
        $('#layerPopupAreaContents').css({"left":0, "top":55, "width":"100%"});
        $('#layerPopupCloseBtn').css({"right":15, "top":-40});
    }else{
        $('#layerPopupArea').fadeIn();
        $('.'+popIndex).fadeIn();
        $('.'+popIndex+'Wrap').css({"width":widthValue, "height":heightValue});
        layerPopupCenter("#layerPopupAreaContents");
    }
}

/* 
 // 브라우져 크기에 따라 유동적으로 변하는 레이어팝업
 // a 링크시 경로 : layerPopup('l01','630','500');
 function layerPopup (popIndex, widthValue, heightValue) {
 var bodyScrollWidth = $('body').prop("scrollWidth");
 if(widthValue >= bodyScrollWidth){
 $('#layerPopupArea').fadeIn();
 $('.'+popIndex).fadeIn();
 $('.'+popIndex+'Wrap').css({"width":"auto", "height":heightValue});
 $('#layerPopupAreaContents').css({"left":0, "top":55, "width":"100%"});
 $('#layerPopupCloseBtn').css({"right":15, "top":-40});
 }else{
 $('#layerPopupArea').fadeIn();
 $('.'+popIndex).fadeIn();
 layerPopupCenter("#layerPopupAreaContents");
 }
 }
 */

//alert("test");