<!--#include virtual ="/include/common.asp" -->
<style>
body {overflow:visible;}
#layerPopupArea {display:block; position:fixed; _position:absolute; top:0; left:0; width:100%; height:100%; z-index:10000;} 
	#grayBg {position:absolute; top:0; left:0; width:100%; height:100%; background:#000 url("../images/popupLayerBg.png") 0 0; opacity:.7; filter:alpha(opacity=70);} 
	#layerPopupAreaContents {display:block; position:absolute; top:50%; left:50%; height:auto; z-index:10;}
	/* 
	#layerPopupAreaContents {display:block; position:absolute; top:50%; left:50%; height:auto; z-index:10;} width 설정시 (브라우져 줄이면 동적)
	#layerPopupAreaContents {display:inline-block; zoom:1; *display:inline; position:relative; top:50%; left:50%; height:auto; z-index:10;} width 설정 안할시 (브라우져 줄이면 정적)
	*/
		#layerPopupCloseBtn {position:absolute; top:2px; right:-40px; display:block;}
		#detailContents {position:relative;}
</style>

<div id="layerPopupArea">
	<div id="grayBg"></div>
	<div id="layerPopupAreaContents">
		<div id="layerPopupCloseBtn"><a href="#n" ><img src="../images/close.png"/></a></div>
		<div id="detailContents">
			<!-- popup contents -->


			
			<style>
				.lContents {display:none; background:#fff; border:2px solid #696969; padding:6px;}
					.lContentsWrap {line-height:22px; font-size:13px; padding:20px; border:5px solid #A8A8A8;}
					.lContentsWrap .h1Font {display:block; font-size:19px; font-weight:700; margin:0 0 7px 0;}
					.lContentsWrap .h2Font {display:block; font-size:15px; font-weight:700; margin:20px 0 7px 0;}
					.lContentsWrap .yTable {margin: 10px 0; width:100%; border:1px solid #C8C8C8; text-align:center;}
					.lContentsWrap .yTable tr th, 
					.lContentsWrap .yTable tr td {padding:7px 5px; border-left:1px solid #C8C8C8;}
					.lContentsWrap .yTable tr td:first-child {border-left:none;}
					.lContentsWrap .yTable tr th {background:#E1E1E1;}
					.lContentsWrap .yTable tr td {vertical-align:middle;}
			</style>




			<!-- 개인정보 취급방침 -->
			<style>
				.l01 {}
					.l01Wrap {width:630px; height:500px; overflow-y:auto;}
			</style>
			<div class="lContents l01">
				<div class="lContentsWrap l01Wrap">
					<!-- contents -->
					<span class="h1Font">[<%= mfCompany %> 개인정보 취급방침]</span>
					<%= mfCompany %> (이하 “회사”라고 함)는 「개인정보 보호법」, 「신용정보의 이용 및 보호에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「통신비밀 보호법」등 관련 법령에 따라 고객의 개인정보 및 권익을 보호하고 개인정보와 관련한 고객의 고충을 원활하게 처리할 수 있도록 다음과 같은 취급방침을 두고 있습니다.

					<span class="h2Font">제1조(개인정보의 처리 목적)</span>
					회사는 개인정보를 다음 각 호의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.<br>
					가. 대부중개에 관한 목적<br>
					개인 대출 계약과 관련하여 금융거래 관계의 설정 여부의 판단, 대출 계약의 체결, 분쟁 해결, 민원 처리 및 법령상 의무이행 등의 목적으로 개인정보를 처리합니다. <br>
					나. 마케팅 및 광고에 활용 <br>
					신규 대출상품 소개 및 맞춤 서비스 제공, 이벤트, 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고의 게재, 서비스의 유효성 확인, 경품지급, 사은행사 등 고객의 편의 및 참여기회 제공, 접속빈도 파악, 회원의 서비스이용에 대한 통계 등의 목적으로 개인정보를 처리합니다.

					<span class="h2Font">제2조(처리하는 개인정보의 항목)</span>
					회사는 대출 계약의 체결ㆍ유지ㆍ이행ㆍ관리 및 상품서비스의 제공을 위한 필수정보 및 선택정보를 다음 각 호와 같이 수집하고 있습니다.<br>
					가. 개인정보의 항목<br>
					(1) 개인식별정보: 성명, 주소, 성별, 국적, 직업, 연락처 등 대출에 필요한 정보<br>
					(2) 신용거래정보: 대출, 보증, 담보, 현금서비스, 신용카드 등 사용 내역<br>
					나. 수집방법<br>
					(1) 서면양식, 홈페이지, 이메일, 전화/팩스, 경품행사, 제휴사로부터의 제공<br>
					(2) 고객센터를 통한 수집

					<span class="h2Font">제3조(개인정보의 처리 및 보유 기간)</span>
					- 고객의 개인정보는 수집ㆍ이용에 관한 동의일로부터 해지가 처리된 시점까지 위 처리 목적을 위하여 보유ㆍ이용 됩니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다. <br>
					가. 대출 신청에 따른 개인 식별정보<br>
					(1) 보존 이유 : 대출 상품안내 및 접수, 민원처리, 사후관리, 수수료 정산에 의한 목적<br>
					(2) 보존 기간 : 1개월 

					<span class="h2Font">제4조(개인정보의 제3자 제공)</span>
					회사는 원칙적으로 고객의 개인정보를 제1조에서 명시한 목적 범위 내에서 처리하며, 고객의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 단, 법률의 규정에 의한 정보 제공과 기타 법령이 허용한 하부 위탁이 가능한 범위 내에서는 고객 또는 제3자의 이익을 부당하게 침해할 우려가 있을 때를 제외하고는 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공할 수 있습니다.<br>
					가. 제휴회사에 개인신용정보 제공<br>
					(1) 제공 업체 : ㈜더원대부중개<br>
					(2) 대부중개를 위하여 대부중개업자를 거친 경우 그 대부중개업자<br>
					나. 제공받는 신용정보의 내용<br>
					(1) 대출 접수시 필요한 개인식별정보 및 대출 신청정보<br>
					다. 제공받는 자의 이용 목적 및 정보 보유, 이용기간<br>
					(1) 목적 : 대출을 위한 심사 및 대출 진행<br>
					(2) 보유기간 : 정보 보유, 이용기간 : 제공된 날로부터 동의 철회 시 또는 제공된 목적을 달성할 때까지 보유,이용

					<span class="h2Font">제5조(개인정보처리 위탁)</span>
					- 회사는 보다 나은 서비스 제공, 고객편의 제공 등 원활한 업무 수행을 위하여 다음과 같이 개인정보 취급 업무를 외부 전문업체에 위탁하여 운영하고 있습니다.<br>
					- 회사는 위탁업무계약서, 보안서약서 등을 통하여 개인정보보호 관련 법규의 준수, 개인정보에 관한 비밀유지, 제 3자 제공에 대한 금지, 사고 시 책임부담, 위탁기간, 처리종료 후 개인정보 반환 또는 파기 의무를 규정하고, 이를 준수하도록 관리하고 있습니다. <br>
					<table class="yTable">
						<tr>
							<th>수탁업체</th>
							<th>위탁업무 목적 및 내용</th>
							<th>개인정보의 보유 및 이용기간</th>
						</tr>
						<tr>
							<td>㈜씨에스</td>
							<td>웹사이트, 모바일웹사이트, 관리자 전산사이트유지보수 관리</td>
							<td>위탁계약 종료 시 까지</td>
						</tr>
					</table>

					<span class="h2Font">제6조 (개인정보 자동 수집 장치의 설치, 운영 및 거부 관련사항)</span>
					회사는 고객께서 홈페이지에 접속하신 상태에서 '쿠키'를 이용하고 있습니다. 쿠키는 이용자 사이트에 대한 기본 설정정보를 보관하기 위해 해당 웹사이트가 사용자의 컴퓨터 브라우저에 전송하는 소량의 정보입니다. 쿠키 이용에 대한 선택권은 고객이 가지고 있습니다. 고객님의 웹 브라우저에서 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부하는 등의 옵션을 선택하실 수 있습니다. 단, 고객이 쿠키의 저장을 거부하는 옵션을 선택하시는 경우에는 서비스 이용에 불편이 야기될 수 있습니다.

					<span class="h2Font">제7조(개인정보의 파기)</span>
					가. 파기 절차 <br>
					이용자가 입력한 정보는 목절 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타관련 법령에 따라 일정기간 저장 후 혹은 즉시 파기됩니다. 이 때, 옮겨진 개인정보는 법령의 규정에 의한 경우를 제외하고는 다른목적으로 이용되지 않습니다.<br>
					나. 파기 기한 <br>
					이용자의 개인정보는 보유기간일로부터 즉시파기, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 즉시 개인정보를 파기합니다.<br>
					다. 파기 방법 <br>
					전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.

					<span class="h2Font">제8조(개인정보의 안전성 확보 조치)</span>
					회사는 개인정보보호법 제29조에 따라 다음 각 호와 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.<br>
					가. 개인정보의 암호화<br>
					고객의 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다. <br>
					나. 해킹 등에 대비한 기술적 대책<br>
					회사는 외부로부터 접근이 통제된 구역에 시스템을 설치하는 등 기술적ㆍ물리적으로 감시 및 차단하고 있습니다.<br> 
					다. 개인정보처리시스템 접근 제한 <br>
					개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다. <br>
					라. 개인정보 취급 직원의 최소화 및 교육 <br>
					개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다. 

					<span class="h2Font">제9조(개인정보 처리방침의 변경)</span>
					회사가 법령 및 방침에 따라 개인정보 처리방침을 변경하는 경우에는 변경 및 시행의 시기, 변경된 내용을 공지사항을 통하여 공개합니다.

					<span class="h2Font">제10조 (권익침해 구제방법)</span>
					고객께서 개인정보침해로 인한 신고나 상담이 필요하신 경우 회사의 민원센터 또는 아래 기관에 문의하시기 바랍니다.<br>
					개인정보분쟁조정위원회 (www.1336.or.kr / 1336)<br>
					한국인터넷진흥원 개인정보침해신고센터 (www.kopico.or.kr / 02-1336)<br>
					정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)<br>
					대검찰청 첨단범죄수사과 (www.spo.go.kr / 02-3480-2000)<br>
					경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330

					<span class="h2Font">제11조 (개인정보 관리책임자)</span>
					개인정보 보호법 제31조 제1항에 따른 회사의 개인정보 보호책임자는 다음과 같습니다.<br>
					가. 개인정보관리책임자<br>
					직책 : 대표이사<br>
					성명 : <%=mfCompanyOwner%><br>
					전화 : <%=mfCompanyTel%><br>
					<!-- 메일 : 90859156@hanmail.net -->

					<span class="h2Font">제12조 (고지)</span>
					현 개인정보 처리방침 내용의 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페이지의 '공지사항'을 통해 고지할 것입니다. <br>
					○ 본 방침은 2015년 06월 10일 부터 시행됩니다.
					<!-- end contents -->
				</div>
			</div>





			<!-- 책임한계와 법적고지 -->
			<style>
				.l02 {}
					.l02Wrap {width:630px; height:500px; overflow-y:auto;}
			</style>
			<div class="lContents l02">
				<div class="lContentsWrap l02Wrap">
					<!-- contents -->
					<span class="h1Font"><%= mfCompany %> 책임한계와 법적고지</span>

					<span class="h2Font">적용대상</span>
					본 책임의 한계와 법적 고지는 본 웹사이트를 이용한 모든 정보 및 거래 (일반적 정보, 대출정보, 재화와 용역의 취득 및 이용에 관한 정보를 포함하여 이에 한정되지 않습니다)를 함에 있어서 유의하여야 할 일반적인 사항들을 규정하고 있으며, <%= mfCompany %> (이하 "회사")의 고객에게 적용되는 일반적인 사항 뿐만 아니라 모든 서비스 이용자에게 적용됩니다. 

					<span class="h2Font">법적고지</span>
					회사는 서비스 이용자의 권리와 의무에 관한 사항을 서비스 이용약관 등에서 규정하고 있으며, 본 법적 고지 등에서 다시 확인하고 있으며,이러한 사항들은 중복적으로 적용됩니다. 본 법적 고지 및 서비스 이용약관에 동의하는 경우에는 서비스 이용자는 이에 동의하는 것으로 간주됩니다. 따라서 본 고지 내용과 서비스이용약관 등 회사가 제공하는 자료들을 반드시 상세히 확인하시고 회사가 제공하는 서비스를 이용하여 주시기 바랍니다.<br><br>

					회사가 제공하는 서비스에 대한 지적재산권은 회사에 있고 서비스 이용자의 편의를 위하여 제공되는 것이므로, 서비스 이용자는 서비스 되는 정보와 자료를 회사의 동의 없이 무단으로 전재하거나 복제, 전송, 배포할 수 없습니다.<br><br>

					회사가 모든 서비스 이용자들을 대상으로 제공하는 정보는 일반적으로 사실적 확인을 거쳐 제공하기 위하여 노력하고 있습니다. 그러나 회사는 제공되는 서비스에 대하여 정확성과 신뢰성에 대하여 어떠한 보장을 하는 것은 아닙니다. <br><br>

					회사에 링크된 웹사이트, 고객게시판 등 회사가 통제하고 있지 아니한 정보들에 대하여 보장하고 있지 아니하므로, 서비스 이용자는 각자의 판단과 책임하에 관련 정보를 이용하시기 바랍니다.<br><br>

					서비스 이용자는 회사의 서비스를 통하여 욕설, 비방 등을 포함하여 법적으로 허용되지 아니하는 행위를 하여서는 안됩니다. 이러한 내용을 담고 있는 게시물 또는 파일은 수정 및 삭제 조치되며 될 수도 있습니다. 회사는 위와 같은 자료들에 대하여 일체의 책임을 지지 아니합니다.<br><br>

					직책 : 대표이사<br>
					성명 : <%=mfCompanyOwner%><br>
					전화 : <%=mfCompanyTel%><br>
					<!-- 메일 : 90859156@hanmail.net -->
					<!-- end contents -->
				</div>
			</div>





			<!-- 이메일 수집동의 -->
			<style>
				.l03 {}
					.l03Wrap {width:630px; height:500px; overflow-y:auto;}
			</style>
			<div class="lContents l03">
				<div class="lContentsWrap l03Wrap">
					<!-- contents -->
					<span class="h1Font"><%= mfCompany %> 이메일 수집동의</span>

					<span class="h2Font">제1조 </span>
					본 약관은 <%= mfCompany %> (이하 "회사"라 함)가 대출 고객(이하"고객"이라 함)에게 제공하는 휴대폰 알림서비스(이하 "SMS"라 함)에 관한 내용을 명확하게 정함을 목적으로 합니다. 

					<span class="h2Font">제2조 </span>
					① "고객"이 본 약관을 승인함과 동시에 "회사"는 대출조건, 이자 또는 원금의 납부일시, 방법 등 대출과 관련된 일체의 정보를 "고객"이 기재한 휴대폰번호에 "SMS"를 보낼 수 있습니다. <br>
					② "고객"은 전항의 휴대폰번호가 변경될 경우 즉시 "회사"에 통지하여야 하며, 이를 게을리 하여 발생한 문제에 대한 일체의 책임은 "고객"에게 있습니다. <br>
					③"고객"은 회사가 발송한 "SMS"의 내용이 타인에게 유출되지 않도록 하여야 하며, 이를 소홀히 함으로 인한 일체의 책임은 "고객"에게 있습니다.<br> 
					④"고객"은 "SMS"의 일환으로 발송되는 "회사"의 설문조사, 이벤트, 상품설명 및 기타 광고관련 정보 등을 수령하는 것에 동의합니다 

					<span class="h2Font">제3조 </span>
					①본 약관은 "고객"이 승인함과 동시에 효력을 발생합니다. 
					②"회사"는 사정 변경의 경우와 서비스 제공상 중요사유가 있을 때 약관을 변경할 수 있으며, 변경된 약관은 "회사"가 홈페이지 게재 또는 기타 방법으로 공지할 수 있습니다. 

					<span class="h2Font">제4조 </span>
					① 개인정보의 보유 및 이용기간 수집ㆍ이용 동의일로부터 (금융)거래 해지 후 5년, (금융)거래 거절 후 3년까지 위 목적으로 보유ㆍ이용됩니다. 
					단, 동의 철회 후에는 위의 목적과 관련된 사고 조사, 분쟁해결, 민원처리, 법령상 의무이행을 위해서만 보유ㆍ이용됩니다.<br><br>


					직책 : 대표이사<br>
					성명 : <%=mfCompanyOwner%><br>
					전화 : <%=mfCompanyTel%><br>
					<!-- 메일 : 90859156@hanmail.net -->
					<!-- end contents -->
				</div>
			</div>





			<!-- 개인정보수집동의 (약식) -->
			<style>
				.l04 {}
					.l04Wrap {width:630px; height:500px; overflow-y:auto;}
			</style>
			<div class="lContents l04">
				<div class="lContentsWrap l04Wrap">
					<!-- contents -->
					<span class="h1Font">[<%= mfCompany %> 귀하]</span>
					이 대출상담신청과 관련하여 귀사가 본인으로부터 취득한 개인정보를 수집•이용하고자 하는 경우에는 『개인정보보호법』 제15조 및 제22조, 정보통신망이용촉진 및 정보보호등에 관한 법률』제 22조에 따라 본인의 동의를 얻어야 합니다. 이에 본인은 귀사가 본인의 개인정보를 아래와 같이 수집•이용하는 것에 동의합니다.<br> 
					
					<span class="h2Font">1. 개인정보의 필수적 수집•이용에 관한 사항</span>
					① 개인정보의 수집•이용 목적•대출상담신청 등<br> 
					② 수집•이용할 개인정보의 내용•개인식별정보(성명, 연락처, 소득구분 등)<br> 
					③ 개인정보의 보유 및 이용기간•수집•이용 동의일로부터 개인정보의 수집•이용 목적을 달성할 때까지<br> 
					
					※ 귀하는 동의를 거부할 권리가 있으나, 이에 대한 동의가 없을 경우 대출상담신청 등이 불가능할 수 있음을 알려 드립니다.<br> 
					<!-- end contents -->
				</div>
			</div>
			




			<!-- end popup contents -->
		</div>
	</div> 
</div>

<script>
$('#layerPopupCloseBtn a').click(function(e){
	$('.lContents').fadeOut();
	$('#layerPopupArea').fadeOut();
	e.preventDefault();
});
</script>