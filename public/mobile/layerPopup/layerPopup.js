


/* ������ -
	��� ���̾��˾��� pc������ ����Ͽ��� �������� �������� js �Դϴ�.
	�� js �� ����ϰ� pc ���ʿ��� �ε��մϴ�. 
	���̾��˾����� ���̴� �̹������� pc������ �ִ� images ������ �������� �˴ϴ�.
*/
// window load
$(window).load(function(){
	/* $('body').prepend('<div id="siteMap"></div>'); */
	$('body').prepend('<div id="layerPopup"></div>');
	$('#layerPopup').load("/layerPopup/layerPopup.asp", function(){
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

// pc or mobile ���� �з� ���̾��˾�
// a ��ũ�� ��� : layerPopup('l01','mobile','750','500');
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
// ������ ũ�⿡ ���� ���������� ���ϴ� ���̾��˾�
// a ��ũ�� ��� : layerPopup('l01','630','500');
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
