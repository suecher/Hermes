/**
 * Created by SueCh on 2016/4/1.
 */



var config = require('../config/config.js');
var mongodb = require('../config/mongoose');
var db = mongodb();

var mongoose = require('mongoose');
var ArcheriesScore = mongoose.model("ArcheriesScore");


var ArcheriesScoreController = require('../app/controllers/archeriesScore.server.controller');


ArcheriesScoreController.scoreByClubRank();