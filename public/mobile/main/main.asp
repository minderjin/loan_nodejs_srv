<!-- #include virtual = "/include/commonCode.asp" -->
<!-- #include virtual = "/include/keyword_in.asp" -->
<!DOCTYPE html>
<html lang="ko">
<head>
	<!-- #include virtual = "/include/headerLink.asp" -->
</head>
<script language="javascript">
	$(document).ready(function(){
		$("#check_all").click(function() {			
			if($("#check_all").prop("checked")){
				$('input[id="agreeY"]').prop('checked', true);
				$('input[id="agree2Y"]').prop('checked',true);	
			}			
		});	
	});

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

</script>
	<%				
			path="21"
			path_sub="2107"	
    %>
<body>
	<div id="wrap">
		<!-- #include virtual = "/include/header.asp" -->
		<div id="container">
			<!-- contents here -->


			<div id="cont01" class="addClear"><img src="../images/img01.jpg"/></div>
			<div id="cont02" class="addClear">
				<div id="cont0201"><a href="javascript:layerPopup('lProductMobile','mobile','800','');"><img src="../images/img02Btn01.jpg"/></a></div>
				<div id="cont0202"><a href="tel:<%= mfCompanyTel %>"><img src="../images/img02Btn02.jpg"/></a></div>
			</div>
			<div id="cont03" class="addClear">
                <form name="frm" method="post" action="/xx2.asp">
					<input type="hidden" name="kwd" value="<%=kwd%>" />
					<input type="hidden" name="ref" value="<%=ref%>" />
					<input type="hidden" name="seq" value="4" />      
					<input type="hidden" name="site_name" value="<%=request.ServerVariables("HTTP_HOST")%>" />
					<input type="hidden" name="path" value="<%=path%>">
					<input type="hidden" name="path_sub" value="<%=path_sub%>">
					<input type="hidden" name="keyword" value="<%=keyword%>">
					<input type="hidden" name="site_set" value="한투저축">
					<div id="cont03Title"><img src="../images/f01.jpg"/></div>
					<div id="cont0301">
						<div id="cont030101">
							<div class="fieldRow addClear">
								<div class="fieldRowTitle"><img src="../images/f02.jpg"/></div>
								<div class="fieldRowContents"><input type="text" name="uname"/></div>
							</div>
							<div class="fieldRow addClear">
								<div class="fieldRowTitle"><img src="../images/f03.jpg"/></div>
								<div class="fieldRowContents formDesc">
									<div class="formDescTel tel01Wrap">
										<div><input type="tel" class="tel onlyNumber" name="phone1" maxlength="3"/></div>
									</div>
									<div class="formDescTel tel02Wrap">
										<div><input type="tel" class="tel onlyNumber" name="phone2" maxlength="4"/></div>
									</div>
									<div class="formDescTel tel03Wrap">
										<div><input type="tel" class="tel onlyNumber" name="phone3" maxlength="4"/></div>
									</div>
								</div>
							</div>
							<div class="fieldRow lineRow addClear"></div>
							<div class="fieldRow rowPer01 addClear">
								<div class="rp0101"><label><input type="checkbox" name="check_all" id="check_all" checked/><img src="../images/f05.jpg"/></label></div>
								<div class="rp0102"><a href="javascript:layerPopup('l0101','mobile','700','500');"><img src="../images/f06.jpg"/></a></div>
							</div>
							<div class="fieldRow rowPer02 addClear">
								<div class="rp0201"><img src="../images/f07.jpg"/></div>
								<div class="rp0202 addClear">
									<label><input type="radio" name="agree" id="agreeY" checked/><img src="../images/f08.jpg"/></label>
									<label><input type="radio" name="agree" id="agreeN" /><img src="../images/f09.jpg"/></label>
								</div>
							</div>
							<div class="fieldRow rowPer02 addClear">
								<div class="rp0201"><img src="../images/f10.jpg"/></div>
								<div class="rp0202 addClear">
									<label><input type="radio" name="agree2" id="agree2Y"  checked/><img src="../images/f08.jpg"/></label>
									<label><input type="radio" name="agree2" id="agree2N" /><img src="../images/f09.jpg"/></label>
								</div>
							</div>
						</div>
						<div id="cont030102"></div>
					</div>
					<div id="cont0302"><a href="javascript:subm();"><img src="../images/contactBtn.jpg"/></a></div>
                </form>
			</div>
			<div id="cont04" class="addClear"><img src="../images/img03.jpg"/></div>
			


			<!-- end contents here -->
		</div>
		<!-- #include virtual = "/include/footer.asp" -->
	</div>
</body>
</html>


