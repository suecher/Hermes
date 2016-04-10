/**
 * Created by Administrator on 2016/3/2.
 */
"use strict";
var mongoose = require('mongoose');
var User = mongoose.model('User');

var fs = require('fs');
var resultobjs = require('../models/result.server.model');
var config = require('../../config/config');

//用户根路径
var userrootfolder = "../" + config.usersPicture;
//临时文件夹路径
var tempfilefloder = "../" + config.tempfolder;

module.exports = {
    create:function(_createuser,_callback){
        var createuser = _createuser;
        if(createuser.name &&
                createuser.password &&
                createuser.username &&
                createuser.mobile &&
                createuser.province &&
                createuser.city &&
                createuser.defaultArrowRoad &&
                createuser.defaultArrowCount
                ){
                createuser.createTime = Date.now();
                var user = User(createuser);

                user.save(function(err){

                    if(err){
                        if(err.code == 11000){
                            _callback(resultobjs.createResult(false,'UserOrMobileExist',err.message));
                            return;
                        }
                        _callback(resultobjs.createResult(false,'CreateUserError',err.message));
                        return;
                    }

                _callback(resultobjs.createResult(true,'','',user));
            });

        } else {
            _callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,用户名,密码,手机或者省份,城市'));
        }
    },
    //更新用户的成绩部分
    updatescore_server:function(userId,scoreObj,callback){
        if(userId &&
        scoreObj.totalPoint &&
        scoreObj.arrowCount){

            User.update({_id:userId},{$inc:{'totalPoint':scoreObj.totalPoint,'arrowCount':scoreObj.arrowCount}},function(err,data){
                if(err){
                    callback(resultobjs.createResult(false,'UpdateUserScore',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',data));
            });

        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少成绩对象或是用户ID'));
            return;
        }
    },
    userById:function(userId,callback){
        if(userId){
            User.findOne({'_id':userId},{password:0},function(err,doc){
                if(err){
                    callback(resultobjs.createResult(false,'SelectUserError',err.message));
                    return;
                }

                if(doc){
                    callback(resultobjs.createResult(true,'','',doc));
                } else {
                    callback(resultobjs.createResult(false,'UserNotExist','用户不存在'));
                }

            })

        }
        else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少用户ID'));
            return;
        }
    },
    userByMobile:function(userMobile,callback){
        if(userMobile){
            User.findOne({'mobile':userMobile},{password:0},function(err,doc){
                if(err){
                    callback(resultobjs.createResult(false,'SelectUserError',err.message));
                    return;
                }

                if(doc){
                    callback(resultobjs.createResult(true,'','',doc));
                } else {
                    callback(resultobjs.createResult(false,'UserNotExist','用户不存在'));
                }

            })

        }
        else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少用户ID'));
            return;
        }
    },
    login:function(_userlogin,_callback){
        var userlogin = _userlogin;
        console.log(userlogin);
        if(userlogin.username && userlogin.password){
            User.findOne({'username':userlogin.username,'password':userlogin.password},function(err,doc){

                if(err){
                    _callback(resultobjs.createResult(false,'SelectUserError',err.message,err));
                }

                if(doc){
                    _callback(resultobjs.createResult(true,'','',doc));
                } else {
                    _callback(resultobjs.createResult(false,'UserNotExist','用户不存在或者密码错误!',doc));
                }
            });
        }
        else
        {
            _callback(resultobjs.createResult(false,'Required parameter missing','缺少用户名或者密码'));

        }
    },
    userofclub:function(userofclubInfo,callback){
        if(userofclubInfo.userId && userofclubInfo.clubId && userofclubInfo.clubName){
            User.update({_id:userofclubInfo.userId},{
                $set:{clubId:userofclubInfo.clubId,
                clubName:userofclubInfo.clubName}
            },function(err,data){
                if(err){
                    callback(resultobjs.createResult(false, 'UpdateUserOfClub', err.message));
                    return;
                }

                callback(resultobjs.createResult(true, '', '', data));
            })
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要参数 用户ID 俱乐部ID 俱乐部名称'));
        }
    },
    update:function(clientuser,callback){
        if(clientuser.userId) {
            User.update({_id: clientuser.userId}, {
                $set: clientuser
            }, function (err, data) {
                if (err) {
                    callback(resultobjs.createResult(false, 'UpdateUserScore', err.message));
                    return;
                }


                //判断是否修改了头像文件
                if(clientuser.IsEditedPic){
                    //判断路径是否存在
                    if(!fs.existsSync(userrootfolder + clientuser.userId)){
                        fs.mkdirSync(userrootfolder + clientuser.userId);
                    }

                    fs.rename(tempfilefloder + clientuser.picture,userrootfolder + clientuser.userId +"/"+ clientuser.picture,function(err){
                        if(err){
                            //可能存在错误
                            console.log(err);
                            return;
                        }
                    });
                }

                callback(resultobjs.createResult(true, '', '', data));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少用户ID'));
        }
    },
    list:function(req,res,next){
        console.log(req.body);
        res.send('success');
    }
};