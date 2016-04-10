/**
 * Created by SueCh on 2016/4/9.
 */
"use strict";

var mongoose = require('mongoose');
var config = require('../config/config.js');
var mongodb = require('../config/mongoose');
var db = mongodb();
var mon

var MessageController = require('../app/controllers/message.server.controller');



MessageController.create({sendId:'S01',receiveId:'S02',content:'测试时间',messageType:1},function(result){
    console.log(result);
});





