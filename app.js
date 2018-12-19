/**
 * Created by lenovo on 2017-10-23.
 */
// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');

var expressErrorHandler = require('express-error-handler');
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");

var mysql = require("mysql");

// 클라이언트 정보 가져오기
var useragent = require('./useragent');

// MySQL 데이터베이스
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '210.114.91.91',
    port: '25395',
    user: 'testdev',
    password: '1111',
    database: 'test',
    debug: false
});


// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 8080);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// static
app.use(static(path.join(__dirname, 'public')));

// cookie
app.use(cookieParser("key#cashloan"));

// session
app.use(expressSession({
    secret:'key#cashloan',
    resave:true,
    saveUninitialized:true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.')

// 로그
require('./morgan').init(app);

// 라우터 객체 참조
var router = express.Router();


// 라우팅 함수 등록
router.route('/').get(function(req, res) {
    console.log('/ 호출됨.');

    var uagent = useragent.getinfo(req.header('User-Agent'));
    if( uagent.device === 'Phone') {
        res.redirect('/mobile');
    } else {
        res.redirect('/main');
    }
});

router.route('/main').get(function(req, res) {
    console.log('/main 호출됨.');
    res.redirect('/main/main.html');
});


router.route('/login').get(function(req, res) {
    console.log('/login 호출됨.');
    res.redirect('/login.html');
});

router.route('/process/putOne').post(function(req, res) {
    console.log('/putOne 호출됨.');

    var uname = req.body.uname || req.query.uname;
    var phone1 = req.body.phone1 || req.query.phone1;
    var phone2 = req.body.phone2 || req.query.phone2;
    var phone3 = req.body.phone3 || req.query.phone2;
    var income = req.body.income || req.query.income;
    var etc = req.body.etc || req.query.etc;

    var fromsite = req.body.fromsite || req.query.fromsite;
    if( !fromsite ) fromsite = '1'; // PC 사이트

    var phone =  phone1+'-'+phone2+'-'+phone3;

    console.log('요청 파라미터 : ' + uname + ', ' + phone + ', '
        + income + ', ' + etc);

    // pool 객체가 초기화된 경우, putOne 함수 호출하여 사용자 추가
    if (pool) {
        putOne(uname, phone, income, etc, fromsite, function(err, addedOne) {
            // 클라이언트로 오류 전송
            if (err) {
                console.error('상담신청 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>상담신청 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if (addedOne) {
                // console.dir(addedOne);
                console.log('inserted ' + addedOne.affectedRows + ' rows');

                var insertId = addedOne.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<script type="text/javascript" charset="utf-8">');
                res.write('alert("상담이 정상적으로 접수되었습니다. 최대한 빠른 시간 안으로 연락드리겠습니다. 감사합니다.");');
                res.write('document.location.href="/";');
                res.write('</script>');
                res.end();

            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결 실패</h2>');
                res.end();
            }
        });
    }
});

router.route('/updateMember').post(function(req, res) {
    console.log('/updateMember 호출됨.');

    var seq_no = req.body.seq_no || req.query.seq_no;
    var uname = req.body.uname || req.query.uname;
    var phone = req.body.phone || req.query.phone;
    var member_id = req.body.member_id || req.query.member_id;
    var corp = req.body.corp || req.query.corp;
    var memo = req.body.memo || req.query.memo;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    // 뷰 템플릿을 사용하여 렌더링한 후 전송
    var context = {seq_no:seq_no, uname:uname, phone:phone, member_id:member_id, corp:corp, memo:memo};
    req.app.render('update_member', context, function (err, html) {
        if (err) {
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>'+ err.stack + '</p>');
            res.end();

            return;
        }

        // console.log('rendered : ' + html);
        res.end(html);
    });
});

router.route('/process/updateMember').post(function(req, res) {
    console.log('/process/updateMember 호출됨.');

    var seq_no = req.body.seq_no || req.query.seq_no;
    var member_id = req.body.member_id || req.query.member_id;
    var corp = req.body.corp || req.query.corp;
    var memo = req.body.memo || req.query.memo;

    console.log('요청 파라미터 : ' + seq_no + ', ' + member_id + ', ' + corp + ', ' + memo);

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        updateMember(seq_no, member_id, corp, memo, function(err, updatedUser) {
            // 동일한 id 로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if (updatedUser) {
                console.dir(updatedUser);
                console.log('updated ' + updatedUser.affectedRows + ' rows');

                var insertId = updatedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);

                res.redirect('/process/acceptList');

            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결 실패</h2>');
                res.end();
            }
        });
    }

});

router.route('/delAccept').post(function(req, res) {
    console.log('/delAccept 호출됨.');

    var seq_no = req.body.seq_no || req.query.seq_no;
    var uname = req.body.uname || req.query.uname;
    var phone = req.body.phone || req.query.phone;
    var member_id = req.body.member_id || req.query.member_id;
    var corp = req.body.corp || req.query.corp;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    // 뷰 템플릿을 사용하여 렌더링한 후 전송
    var context = {seq_no:seq_no, uname:uname, phone:phone, member_id:member_id, corp:corp};
    req.app.render('delete_accept', context, function (err, html) {
        if (err) {
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>'+ err.stack + '</p>');
            res.end();

            return;
        }

        // console.log('rendered : ' + html);
        res.end(html);
    });

});


router.route('/process/delAccept').post(function(req, res) {
    console.log('/process/delAccept 호출됨.');

    var seq_no = req.body.seq_no || req.query.seq_no;

    console.log('요청 파라미터 : ' + seq_no);

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        delAccept(seq_no, function(err, deletedUser) {
            // 동일한 id 로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if (deletedUser) {
                console.dir(deletedUser);
                console.log('deleted ' + deletedUser.affectedRows + ' rows');

                var insertId = deletedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);

                res.redirect('/process/acceptList');

            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결 실패</h2>');
                res.end();
            }
        });
    }

});

router.route('/insertAccept').get(function(req, res) {
    console.log('/insertAccept 호출됨.');

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    // 뷰 템플릿을 사용하여 렌더링한 후 전송
    var context = {};
    req.app.render('insert_accept', context, function (err, html) {
        if (err) {
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>'+ err.stack + '</p>');
            res.end();

            return;
        }

        // console.log('rendered : ' + html);
        res.end(html);
    });
});

router.route('/process/insertAccept').post(function(req, res) {
    console.log('/process/insertAccept 호출됨.');

    var uname = req.body.uname || req.query.uname;
    var phone = req.body.phone || req.query.phone;
    var member_id = req.body.member_id || req.query.member_id;
    var corp = req.body.corp || req.query.corp;
    var memo = req.body.memo || req.query.memo;

    console.log('요청 파라미터 : ' + uname + ', ' + phone + ', ' + member_id + ', ' + corp + ', ' + memo);

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        insertAccept(uname, phone, member_id, corp, memo, function(err, insertedUser) {
            // 동일한 id 로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if (insertedUser) {
                console.dir(insertedUser);
                console.log('inserted ' + insertedUser.affectedRows + ' rows');

                var insertId = insertedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);

                res.redirect('/process/acceptList');

            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결 실패</h2>');
                res.end();
            }
        });
    }

});

router.route('/process/acceptList').get(function (req, res) {
    console.log('/process/acceptList 호출됨.');

    var phone = req.body.phone || req.query.phone;

    if (req.session.user) {
        var memberId = req.session.user.id;
        var uname = req.session.user.name;
        var manager = req.session.user.manager;

        // pool객체가 초기화된 경우, acceptList 함수 호출하여 사용자 인증
        if (pool) {
            acceptList(memberId, phone, function(err, rows) {
                // 오류가 발생했을 때 클라이언트로 오류 전송
                if (err) {
                    console.error('목록 조회 중 오류 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>목록 조회 중 오류 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                }

                // console.dir(rows);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // 뷰 템플릿을 사용하여 렌더링한 후 전송
                var context = {rows:rows, id:memberId, uname:uname, manager:manager, phone:phone};
                req.app.render('accept_list', context, function (err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>'+ err.stack + '</p>');
                        res.end();

                        return;
                    }

                    // console.log('rendered : ' + html);
                    res.end(html);
                });

            });
        }

    } else {
        res.redirect('/logout.html');
    }

});


router.route('/process/acceptListAll').get(function (req, res) {
    console.log('/process/aacceptListAll 호출됨.');

    var phone = req.body.phone || req.query.phone;

    if (req.session.user) {
        var memberId = req.session.user.id;
        var uname = req.session.user.name;
        var manager = req.session.user.manager;

        // pool객체가 초기화된 경우, acceptList 함수 호출하여 사용자 인증
        if (pool) {
            acceptListAll(memberId, phone, function(err, rows) {
                // 오류가 발생했을 때 클라이언트로 오류 전송
                if (err) {
                    console.error('목록 조회 중 오류 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>목록 조회 중 오류 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                }

                // console.dir(rows);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // 뷰 템플릿을 사용하여 렌더링한 후 전송
                var context = {rows:rows, id:memberId, uname:uname, manager:manager, phone:phone};
                req.app.render('accept_list_all', context, function (err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>'+ err.stack + '</p>');
                        res.end();

                        return;
                    }

                    // console.log('rendered : ' + html);
                    res.end(html);
                });

            });
        }

    } else {
        res.redirect('/logout.html');
    }

});

router.route('/adduser').post(function(req, res) {
    res.redirect('/adduser.html');
});

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        addUser(paramId, paramPassword, paramName, function(err, addedUser) {
            // 동일한 id 로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if (addedUser) {
                console.dir(addedUser);
                console.log('inserted ' + addedUser.affectedRows + ' rows');

                var insertId = addedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);

                // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // res.write('<h2>사용자 추가 성공</h2>');
                // res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
                // res.write('<div><p>사용자 패스워드 : ' + paramPassword + '</p></div>');
                // res.write('<div><p>사용자 이름 : ' + paramName + '</p></div>');
                // res.write(' <br><br><a href="/login.html">로그인하기</a>');
                // res.end();

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // 뷰 템플릿을 사용하여 렌더링한 후 전송
                var context = {id:paramId, password:paramPassword, name:paramName};
                req.app.render('adduser_success', context, function (err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>'+ err.stack + '</p>');
                        res.end();

                        return;
                    }

                    // console.log('rendered : ' + html);
                    res.end(html);
                });
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결 실패</h2>');
                res.end();
            }
        });
    }
});


router.route('/updateuser').post(function (req, res) {
    console.log('/updateuser 호출됨.');

    var id = req.body.id || req.query.id;
    var name = req.body.name || req.query.name;
    var enable = req.body.enable || req.query.enable;
    var password = req.body.password || req.query.password;

    if (req.session.user) {
        var memberId = req.session.user.id;
        var uname = req.session.user.name;
        var manager = req.session.user.manager;

        if (pool) {
            // console.dir(rows);

            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            // 뷰 템플릿을 사용하여 렌더링한 후 전송
            var context = {id:id, name:name, enable:enable, password:password};
            req.app.render('update_user', context, function (err, html) {
                if (err) {
                    console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

                    res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                    res.write('<p>'+ err.stack + '</p>');
                    res.end();

                    return;
                }

                // console.log('rendered : ' + html);
                res.end(html);
            });

        }

    } else {
        res.redirect('/logout.html');
    }

});


router.route('/process/updateUser').post(function(req, res) {
    console.log('/process/updateUser 호출됨.');

    var id = req.body.id || req.query.id;
    var name = req.body.name || req.query.name;
    var enable = req.body.enable || req.query.enable;
    var password = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + id + ', ' + name + ', ' + enable  + ', ' + password );

    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (pool) {
        updateUser(id, password, name, enable, function(err, updatedUser) {
            // 동일한 id 로 추가할 때 오류 발생 - 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 수정 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 수정 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            // 결과 객체 있으면 성공 응답 전송
            if (updatedUser) {
                console.dir(updatedUser);
                console.log('updated ' + updatedUser.affectedRows + ' rows');

                var insertId = updatedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);

                res.redirect('/process/memberList');

            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결 실패</h2>');
                res.end();
            }
        });
    }

});



router.route('/process/memberList').get(function(req, res) {
    console.log('/process/memberList 호출됨.');

    if (req.session.user) {
        var memberId = req.session.user.id;
        var uname = req.session.user.name;
        var manager = req.session.user.manager;

        // pool객체가 초기화된 경우, memberList 함수 호출하여 사용자 인증
        if (pool) {
            memberList(function(err, rows) {
                // 오류가 발생했을 때 클라이언트로 오류 전송
                if (err) {
                    console.error('목록 조회 중 오류 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>목록 조회 중 오류 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                }

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                // 뷰 템플릿을 사용하여 렌더링한 후 전송
                var context = {rows:rows, id:memberId, uname:uname, manager:manager};
                req.app.render('member_list', context, function (err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>'+ err.stack + '</p>');
                        res.end();

                        return;
                    }

                    // console.log('rendered : ' + html);
                    res.end(html);
                });

            });
        }

    } else {
        res.redirect('/logout.html');
    }
});

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

    // pool객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
    if (pool) {
        authUser(paramId, paramPassword, function(err, rows) {
            // 오류가 발생했을 때 클라이언트로 오류 전송
            if (err) {
                console.error('사용자 로그인 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 로그인 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            if (rows) {
                // 로그인 성공
                console.dir(rows);

                var username = rows[0].name;
                var manager = rows[0].manager;

                // 세션 저장
                req.session.user = {
                    id: paramId,
                    name: username,
                    manager: manager,
                    authorized: true
                };

                res.redirect('/process/acceptList');
                
            } else {
                // 로그인 실패

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

                // 뷰 템플릿을 사용하여 렌더링한 후 전송
                var context = {userid:paramId, password:paramPassword};
                req.app.render('login_fail', context, function (err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>'+ err.stack + '</p>');
                        res.end();

                        return;
                    }

                    // console.log('rendered : ' + html);
                    res.end(html);
                });
            }

        });
    }

});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req, res) {
    console.log('/process/logout 호출됨.');

    if(req.session.user) {
        // 로그인된 상태
        console.log('로그아웃됩니다.');

        req.session.destroy(function(err) {
            if (err) {throw err;}

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/login.html');
        });
    } else {
        // 로그인 안된 상태
        console.log('아직 로그인되어 있지 않습니다.');
        res.redirect('/login.html');
    }
});

router.route('/layerPopup').get(function(req, res) {
    console.log('/layerPopup 호출됨.');

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

    // 뷰 템플릿을 사용하여 렌더링한 후 전송
    var context = {mfCompany:'캐쉬론대부중개', mfCompanyOwner:'한창현', mfCompanyTel:'02-2135-2715'};
    req.app.render('layerPopup', context, function (err, html) {
        if (err) {
            console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);

            res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
            res.write('<p>'+ err.stack + '</p>');
            res.end();

            return;
        }

        // console.log('rendered : ' + html);
        res.end(html);
    });
});

// router.route('/process/showCookie').get(function(req, res) {
//     console.log('/process/showCookie 호출됨.');
//
//     res.send(req.cookies);
// });
//
// router.route('/process/setUserCookie').get(function(req, res) {
//     console.log('/process/setUserCookie 호출됨.');
//
//     // 쿠키 설정
//     res.cookie('user', {
//         id: 'mike',
//         name: '걸스데이',
//         authorized: true
//     });
//
//     // redirect로 응답
//     res.redirect('/process/showCookie');
// });


// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/error/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});



////////////////////// fuction 정의 //////////////////////
// 상담 신청(등록)
var putOne =  function(uname, phone, income, etc, fromsite, callback) {
    console.log('putOne 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); //반드시 해제
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디: ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        var data = {uname:uname, phone:phone, income:income, etc:etc, fromsite:fromsite};

        // SQL문을 실행합니다.
        var exec = conn.query('insert into accepts set ?, reg_date=now()', data, function(err, result) {
            conn.release();
            console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}

// 상담 목록
var acceptList = function (memberId, phone, callback) {
    console.log('acceptList 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['seq_no', 'uname', 'phone', 'income', 'etc', 'member_id', 'corp', 'reg_date', 'mod_date', 'memo', 'fromsite'];

        if( phone ) {
            // 폰번호로 중복체크
            var queryStr = "select ?? from accepts where phone = ? and deleted = '0' and '1' in (select manager from members where id = ?) " +
                "union all " +
                "select ?? from accepts where phone = ? and deleted = '0' and '0' in (select manager from members where id = ?) and member_id = ? " +
                "order by seq_no desc";

            // SQL문을 실행합니다.
            var exec = conn.query(queryStr,
                [columns, phone, memberId, columns, phone, memberId, memberId], function(err, rows) {
                    conn.release();
                    // console.log('실행 대상 SQL : ' + exec.sql);

                    if (rows.length > 0) {
                        console.log('멤버 [%s]의 상담 목록을 찾음.', memberId);
                        callback(null, rows);
                    } else {
                        console.log('일치하는 정보를 찾지 못함.');
                        callback(null, null);
                    }
                });

        } else {
            // 기본 조회

            var queryStr = "select ?? from accepts where deleted = '0' and '1' in (select manager from members where id = ?) " +
                "union all " +
                "select ?? from accepts where deleted = '0' and '0' in (select manager from members where id = ?) and member_id = ? " +
                "order by seq_no desc limit 100";

            // SQL문을 실행합니다.
            var exec = conn.query(queryStr,
                [columns, memberId, columns, memberId, memberId], function(err, rows) {
                    conn.release();
                    // console.log('실행 대상 SQL : ' + exec.sql);

                    if (rows.length > 0) {
                        console.log('멤버 [%s]의 상담 목록을 찾음.', memberId);
                        callback(null, rows);
                    } else {
                        console.log('일치하는 정보를 찾지 못함.');
                        callback(null, null);
                    }
                });
        }
    });
}


// 상담 목록
var acceptListAll = function (memberId, phone, callback) {
    console.log('acceptListAll 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['seq_no', 'uname', 'phone', 'income', 'etc', 'member_id', 'corp', 'reg_date', 'mod_date', 'memo', 'fromsite'];

        if( phone ) {
            // 폰번호로 중복체크
            var queryStr = "select ?? from accepts where phone = ? and deleted = '0' and '1' in (select manager from members where id = ?) " +
                "union all " +
                "select ?? from accepts where phone = ? and deleted = '0' and '0' in (select manager from members where id = ?) and member_id = ? " +
                "order by seq_no desc";

            // SQL문을 실행합니다.
            var exec = conn.query(queryStr,
                [columns, phone, memberId, columns, phone, memberId, memberId], function(err, rows) {
                    conn.release();
                    // console.log('실행 대상 SQL : ' + exec.sql);

                    if (rows.length > 0) {
                        console.log('멤버 [%s]의 상담 목록을 찾음.', memberId);
                        callback(null, rows);
                    } else {
                        console.log('일치하는 정보를 찾지 못함.');
                        callback(null, null);
                    }
                });

        } else {
            // 기본 조회

            var queryStr = "select ?? from accepts where deleted = '0' and '1' in (select manager from members where id = ?) " +
                "union all " +
                "select ?? from accepts where deleted = '0' and '0' in (select manager from members where id = ?) and member_id = ? " +
                "order by seq_no desc";

            // SQL문을 실행합니다.
            var exec = conn.query(queryStr,
                [columns, memberId, columns, memberId, memberId], function(err, rows) {
                    conn.release();
                    // console.log('실행 대상 SQL : ' + exec.sql);

                    if (rows.length > 0) {
                        console.log('멤버 [%s]의 상담 목록을 찾음.', memberId);
                        callback(null, rows);
                    } else {
                        console.log('일치하는 정보를 찾지 못함.');
                        callback(null, null);
                    }
                });
        }
    });
}

// 사용자를 등록하는 함수
var addUser = function(id, password, name, callback) {
    console.log('addUser 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); //반드시 해제
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디: ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        var data = {id:id, password:password, name:name};

        // SQL문을 실행합니다.
        var exec = conn.query('insert into members set ?', data, function(err, result) {
            conn.release();
            // console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}


var memberList = function (callback) {
    console.log('memberList 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['id', 'name', 'password', 'enable'];
        var tablename = 'members';

        // SQL문을 실행합니다.
        var exec = conn.query("select ?? from ?? ",
            [columns, tablename], function(err, rows) {
                conn.release();
                // console.log('실행 대상 SQL : ' + exec.sql);

                if (rows.length > 0) {
                    console.log('사용자 목록을 찾음.');
                    callback(null, rows);
                } else {
                    console.log('일치하는 정보를 찾지 못함.');
                    callback(null, null);
                }
            });
    });
}

// 사용자를 인증하는 함수
var authUser = function (id, password, callback) {
    console.log('authUser 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다.
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

        var columns = ['id', 'name', 'manager'];
        var tablename = 'members';

        // SQL문을 실행합니다.
        var exec = conn.query("select ?? from ?? where id = ? and password = ? and enable = '1'",
            [columns, tablename, id, password], function(err, rows) {
                conn.release();
                // console.log('실행 대상 SQL : ' + exec.sql);

                if (rows.length > 0) {
                    console.log('아이디 [%s], 패스워드 [%s]가 일치하는 사용자 찾음.', id, password);
                    callback(null, rows);
                } else {
                    console.log('일치하는 사용자를 찾지 못함.');
                    callback(null, null);
                }
            });
    });
}


var updateMember = function(seq_no, member_id, corp, memo, callback) {
    console.log('updateMember 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); //반드시 해제
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디: ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        // var data = {member_id:member_id};

        // SQL문을 실행합니다.
        var exec = conn.query('update accepts set member_id = ?, corp = ?, memo = ? where seq_no = ?', [member_id, corp, memo, seq_no], function(err, result) {
            conn.release();
            // console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}

var delAccept = function(seq_no, callback) {
    console.log('delAccept 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); //반드시 해제
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디: ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        // var data = {member_id:member_id};

        // SQL문을 실행합니다.
        var exec = conn.query('update accepts set deleted = \'1\' where seq_no = ?', [seq_no], function(err, result) {
            conn.release();
            // console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}

var insertAccept = function(uname, phone, member_id, corp, memo, callback) {
    console.log('insertAccept 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); //반드시 해제
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디: ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        var data = {uname:uname, phone:phone, member_id:member_id, corp:corp, memo:memo, fromsite:'0'};

        // SQL문을 실행합니다.
        var exec = conn.query('insert into accepts set ?, reg_date=now()', data, function(err, result) {
            conn.release();
            console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}



var updateUser = function(id, password, name, enable, callback) {
    console.log('updateUser 호출됨.');

    // 커넥션 풀에서 연결 객체를 가져옵니다
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); //반드시 해제
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디: ' + conn.threadId);

        // 데이터를 객체로 만듭니다.
        // var data = {member_id:member_id};

        // SQL문을 실행합니다.
        var exec = conn.query('update members set password = ?, name = ?, enable = ? where id = ?', [password, name, enable, id], function(err, result) {
            conn.release();
            // console.log('실행 대상 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 오류 발생함.');
                console.dir(err);

                callback(err, null);

                return;
            }

            callback(null, result);
        });
    });
}
