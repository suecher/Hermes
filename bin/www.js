/**
 * Created by Administrator on 2016/3/2.
*/
"use strict";
var app = require('../app');
var config = require('../config/config.js');
var securityManage = require('../config/securityCodeManage');


process.on('uncaughtException',function (err){
    console.log(err);
    console.log(err.stack);
});

app.listen(config.port,'192.168.31.131',function(){
    console.log('app started, listening on port:',config.port);
    securityManage.timer();
});