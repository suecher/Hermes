/**
 * Created by Administrator on 2016/4/5.
 */
var config = require('../config/config.js');
var express = require('../config/express');
var mongodb = require('../config/mongoose');
mongodb();


//var ClubController = require('../app/controllers/club.server.controller');
//ClubController.listByCityAll(177,function(result){
//    console.log(result.body);
//});
//
var ArcheriesScoreController = require('../app/controllers/archeriesscore.server.controller.js');

ArcheriesScoreController.scoreById('0001',function(result){
    console.log(result);
});

