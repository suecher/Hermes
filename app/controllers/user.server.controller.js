/**
 * Created by Administrator on 2016/3/2.
 */
"use strict";
var mongoose = require('mongoose');
var User = mongoose.model('User');

var resultobjs = require('../models/result.server.model');

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

                var user = User(createuser);
                user.save(function(err){

                    if(err){
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
            User.findOne({'_id':userId},function(err,doc){
                if(err){
                    callback(resultobjs.createResult(false,'SelectUserError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',doc));
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
    update:function(clientuser,callback){
        //需要测试
        if(clientuser.password &&
            clientuser.province &&
            clientuser.city &&
            clientuser.email &&
            clientuser.picture &&
            clientuser.clubId &&
            clientuser.arrowCount &&
            clientuser.defaultArrowCount &&
            clientuser.defaultArrowRoad
        ) {
            User.update({_id: clientuser.userId}, {
                $set: {
                    'totalPoint': clientuser.password,
                    'province': clientuser.province,
                    'city': clientuser.city,
                    'email': clientuser.email,
                    'picture': clientuser.picture,
                    'clubId': clientuser.clubId,
                    'arrowCount': clientuser.arrowCount,
                    'defaultArrowCount': clientuser.defaultArrowCount,
                    'defaultArrowRoad': clientuser.defaultArrowRoad
                }
            }, function (err, data) {
                if (err) {
                    callback(resultobjs.createResult(false, 'UpdateUserScore', err.message));
                    return;
                }

                callback(resultobjs.createResult(true, '', '', data));
            });
        } else {
            _callback(resultobjs.createResult(false,'Required parameter missing','缺少用户名或者密码'));
        }
    },
    list:function(req,res,next){
        console.log(req.body);
        res.send('success');
    }
};