<%
'''키워드 있는지 확인해서 쿠키에 입력
keyword=request("n_keyword")

if keyword="" then
	keyword=request("DMKW")
end if

kwd=request("kwd")

if kwd="" then
	kwd=request.Cookies("okwd")
end if

if kwd="gg" or kwd="ggd" then
	keyword=request("GKWD")
	
	response.Cookies("okwd")=kwd
end if

if keyword<>"" then
	response.Cookies("keyword")=keyword
else
	keyword_1=request.Cookies("keyword")
	if keyword_1<>"" then
		keyword=request.Cookies("keyword")
	end if
end if


'''신청경로 및 바이럴 아이디 확인
search_url=request("url")

tempc = "abcdefghijklmnopqrstuvwxyz"
	
if search_url<>"" and instr(search_url,"_")>0 then
	search_url=split(search_url,"_")
	
	'''신청경로 있는지 확인
	path=search_url(0)
	response.Cookies("path")=path

	'''바이럴 아이디 있는지 확인 (첫자리가 영어면 아이디로 판단
	keyword_b=search_url(1)
	
'	if keyword_b<>"" and left(keyword_b,1)<>"?" then
'		if instr(tempc,lcase(left(keyword_b,1)))>0 then
'			keyword=keyword_d
'			response.Cookies("keyword")=keyword_b
'		end if
'	end if
else
	path_1=request.Cookies("path")
	if path_1<>"" then
		path=path_1
	end if
	
'	keyword_b=request.Cookies("keyword")
'	if keyword_b<>"" and left(keyword_b,1)<>"?" then
'		if instr(tempc,lcase(left(keyword_b,1)))>0 then
'			keyword=request.Cookies("keyword")
'		end if
'	end if
end if

'추천인
if keyword<>"" then
	if kwd="gg" or kwd="ggd"then
		path="21"
	else
		if path="2" then
			kwd="Daum"
			path="21"
		else
			kwd="Naver"
		end if
	end if
else
	kwd=request.Cookies("okwd")
	
	if kwd="" then
		kwd=request("kwd")
		
		if kwd<>"" then
			response.Cookies("okwd")=kwd
		else
			response.Cookies("okwd")=""
		end if
	end if
end if

if kwd="ggd" then
'구글 게재위치 키워드로 확인
	placement=request.Cookies("placement")
	
	if placement="" then
		placement=request("placement")
		
		if placement<>"" then
			keyword=placement
			response.Cookies("keyword")=placement
		end if
	else
		keyword=placement
		response.Cookies("keyword")=placement
	end if
end if

'경로
ref=request.Cookies("oref")
if ref="" then
	ref=request.ServerVariables("HTTP_REFERER")
	response.Cookies("oref")=ref
end if

%>
