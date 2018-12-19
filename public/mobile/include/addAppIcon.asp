


<!--
<script src="../js/addshortcut.js"></script>
-->





<script>
	var aaiValue = "welcome_cs01";
	function addAppCookie () {
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + 1 ); // + 1은 하루
		document.cookie = "aaiCheck=" + escape(aaiValue) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}

	function addAppIcon () {
		$("#addAppIconWrap").fadeOut();
		clearInterval(aaiTimer);
		addAppCookie();
		
		// 이부분 변경해서 재활용 하면 됨 (추가설명 : jquery가 먼저 include 되어야 함)
		var shortcutUrl = "http://ad-manage.com/welcome_cs/mobile/main/main.asp?reconn=y";  // 아이콘 클릭 했을 때 이동할 url - http:// 포함
		var shortcutIcon = "http://ad-manage.com/welcome_cs/images/apple-touch-icon.png"; // 바탕화면에 등록될 아이콘의 url - http:// 포함
		var shortcutTitle = "대출한도테스트"; // 바로가기 제목 (영문추천)
		var shortcutService = "welcome_cs"; // 서비스명(영문)
		// 이부분 변경해서 재활용 하면 됨
		if(shortcutUrl != "" && shortcutIcon != "" && shortcutTitle != "" && shortcutService != "") {
			var shortcutSrc = "naversearchapp://addshortcut?url="+encodeURI(shortcutUrl)+"&icon="+encodeURI(shortcutIcon)+"&title="+encodeURI(shortcutTitle)+"&serviceCode="+encodeURI(shortcutService)+"&version=7";
			var $iFrm = $('<IFRAME id="iFrmShortcut" width="0" height="0" frameborder="0" style="display:none" src="'+shortcutSrc+'"></IFRAME>');
			$iFrm.appendTo('body');
		}
        
		//설치카운팅을 위해 서버 접속
		
		 $.ajax({
            type: "POST",
            //data: { name: "Donald Duck", city: "Duckburg" },
			data: { chkSet: "y" },
            url: "http://ad-manage.com/welcome_cs/mobile/include/setCount.asp",
            async: false, //동기방식으로 사용
            success: function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
				//alert("this post was successful");
            }
        });


	}

	function aaiCloseBtn () {
		$("#addAppIconWrap").fadeOut();
		clearInterval(aaiTimer);
		//addAppCookie();
	}

	var sm_UserAgent02 = navigator.userAgent.toLowerCase();
	var sm_BlockDevice02_1 = sm_UserAgent02.indexOf("iphone");
	var sm_BlockDevice02_2 = sm_UserAgent02.indexOf("ipad");
	var sm_BlockDevice02 = sm_BlockDevice02_1 + sm_BlockDevice02_2;
	if(sm_BlockDevice02 == -2){
		var aaiTimer = setInterval("aaiCurrentTime()",1000); // START
	}

	var tIdx = 5;
	function aaiCurrentTime(){
		cookiedata = document.cookie;
		if (cookiedata.indexOf("aaiCheck="+aaiValue) > -1) { // 쿠키가 저장된 경우임, 설치가 한번 되면 무조건 쿠키를 저장하는데, 쿠키가 저장됬다는건 설치가 완료된상태라는 뜻
			clearInterval(aaiTimer); //설치안함
		}else{ // 쿠키 저장 안된경우 계속 카운트 시작
			$("#addAppIconWrap").fadeIn();
			tIdx = tIdx - 1;
			if(tIdx == 0){
				addAppIcon();
			}
		}
	}
</script>
<style>
	#addAppIconWrap {display:none; position:fixed; _position:absolute; top:0; left:0; width:100%; height:100%; z-index:99999!important;}
		#addAppIconContents {display:block; position:absolute; top:5px; right:5px; width:50%; height:auto; z-index:10;}
			#aaiText {display:block; opacity:0.8; font-size:11px; font-weight:700; color:#fff; text-align:center; padding:10px 10px 10px 10px; letter-spacing:-1px; cursor:pointer; background:#31a1c9; line-height:16px;}
			#aaiText:hover {opacity:1;}
</style>
<div id="addAppIconWrap">
	<div id="addAppIconContents">
		<a id="aaiText" href="javascript:aaiCloseBtn();">
			바탕화면에 웰컴론<br>아이콘을 자동생성합니다.<br>원치 않으시면 클릭해주세요.
		</a>
	</div>
</div>




