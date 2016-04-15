/**
 * Created by SueCh on 2016/4/14.
 */
"use strict";

module.exports = function(app){

    let securityManage = require('../../config/securityCodeManage');

    app.route('/createsecurity')
        .post(function(req,res){
            let mobile = req.body.mobile;
            securityManage.createUserCode(mobile);
            res.json();
        });


    app.route('/verification')
        .post(function(req,res){
            res.json(securityManage.verificationCode(req.body.mobile,req.body.code));
        });


    app.route('/securitylist')
        .get(function(req,res){
            res.json(securityManage.securityList);
        });
};