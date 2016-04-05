/**
 * Created by Administrator on 2016/4/5.
 */


var config = require('../config/config.js');
varmongodb = require('../config/mongoose');
var db = mongodb();

var mongoose = require('mongoose');

var ClubController = require('../app/controllers/club.server.controller');
ClubController.listByCityAll(177,function(result){
    console.log(result.body);
});

var ArcheriesScoreController = require('../app/controllers/archeriesScore.server.controller');

