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
        if(userlogin.mobile && userlogin.password){
            User.findOne({'username':userlogin.username,'password':userlogin.password},function(err,doc){

                if(err){
                    _callback(resultobjs.createResult(false,'SelectUserError',err.message,err));
                }

                if(doc){
                    _callback(resultobjs.createResult(true,'','',doc));
                } else {
                    _callback(resultobjs.createResult(false,'UserNotExist','用户不存在',doc));
                }
            });
        }
        else
        {
            _callback(resultobjs.createResult(false,'Required parameter missing','缺少用户名或者密码'));

        }
    },
    list:function(req,res,next){
        console.log(req.body);
        res.send('success');
    }
};