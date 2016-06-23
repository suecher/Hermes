/**
 * Created by SueCh on 2016/4/14.
 */
"use strict";
let sms = require('../../config/sms');

let UserController = require('../controllers/user.server.controller');

module.exports = function(app){

    let securityManage = require('../../config/securityCodeManage');
    app.route('/createsecurity')
        .post(function(req,res){
            let mobile = req.body.mobile;
            UserController.userByMobile(mobile,function(result){
                if(result.errorType == 'UserNotExist'){
                    securityManage.createUserCode(mobile);
                    res.json({result:true,body:'UserNotExist'});
                } else {
                    res.json({result:false,body:'UserExist'});
                }
            });
        });

    app.route('/verification')
        .post(function(req,res){
            res.json(securityManage.verificationCode(req.body.mobile,req.body.code));
        });

    app.route('/forgotpassword')
        .post(function(req,res){
            let mobile = req.body.mobile;
            securityManage.createUserCode(mobile);
            res.end();
        });

    app.route('/securitylist')
        .get(function(req,res){
            console.log(securityManage.securityList);
            res.json(securityManage.securityList);
        });
};