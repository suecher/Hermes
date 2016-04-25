/**
 * Created by SueCh on 2016/4/1.
*/



var config = require('../config/config.js');
var mongodb = require('../config/mongoose');

//var db = mongodb();

var mongoose = require('mongoose');
mongoose.connect("mongodb://121.43.57.99/hermes");
require('../app/models/archeriesscore.server.model.js');
require('../app/models/user.server.model');
var ArcheriesScore = mongoose.model("ArcheriesScore");


var ArcheriesScoreController = require('../app/controllers/archeriesscore.server.controller.js');



ArcheriesScoreController.scoreByClubRank({"clubIdList":['56fe9c2b7fc2a9dc0de5f8d8'],"arrowRoad":10,"arrowCount":12},function(resultobj){
    console.log(resultobj);
});
//
//ArcheriesScoreController.scoreByClubRank({"clubIdList":['56fe9c2b7fc2a9dc0de5f8d8'],"arrowRoad":10,"arrowCount":12},function(resultobj){
//    console.log(resultobj);
//});

