/**
 * Created by SueCh on 2016/4/14.
 */
"use strict";
let sms = require('../../config/sms');

module.exports = function(app){

    let securityManage = require('../../config/securityCodeManage');
    app.route('/createsecurity')
        .post(function(req,res){
            let mobile = req.body.mobile;
            securityManage.createUserCode(mobile);
            res.end();
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