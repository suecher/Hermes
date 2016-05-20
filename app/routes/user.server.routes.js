/**
 * Created by Administrator on 2016/3/2.
 */
"use strict";
var UserController = require('../controllers/user.server.controller');
var securityManage = require('../../config/securityCodeManage');

module.exports = function(app){
    app.route('/usersignin')
        .post(function(req,res){
            UserController.create(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/userlogin')
        .post(function(req,res){
            UserController.login(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/userofclub')
        .post(function(req,res){
            let clientuserofclub = req.body;
            UserController.userofclub(clientuserofclub,function(resultobj){
                res.json(resultobj);
            });
        });
    
    app.route('/userupdate')
        .post(function(req,res){
            var clientuser = req.body;
            UserController.update(clientuser,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/useruppassword')
        .post(function(req,res){
            let code = req.body.code;
            let clientuser = req.body;
            if(!securityManage.verificationCode(clientuser.mobile,code).result){
                res.json({result:false,errorType:'CodeError',errorMessage:"验证码错误"});
            } else {
                delete clientuser.code;
                UserController.updateBymobile(clientuser,function(resultobj){
                    res.json(resultobj);
                });
            };
        });

    app.route('/userbyid')
        .post(function(req,res,next){
            UserController.userById(req.body.userId,function(resultobjs){
                res.json(resultobjs);
            });
        });


    app.route('/userbymobile')
        .post(function(req,res){
            UserController.userByMobile(req.body.userMobile,function(resultobjs){
                res.send(resultobjs);
            });
        });

    app.route('/usershare')
        .post(function(req,res){
            UserController.userUpdateNumType(req.body.userId,{share:1},function(resultobj){
                res.send(resultobj);
            });
        });

    app.route('/userfriends')
        .post(UserController.list);


};