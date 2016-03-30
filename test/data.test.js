/**
 * Created by Administrator on 2016/3/30.
 */

"use strict";

var config = require('../config/config.js');
var mongodb = require('../config/mongoose');
var db = mongodb();

var mongoose = require('mongoose');
var ArcheriesScore = mongoose.model("ArcheriesScore");


var ArcheriesScoreController = require('../app/controllers/archeriesScore.server.controller');


ArcheriesScoreController.scoreByUser('0002','2016-1-1','2016-3-27',function(objresult){

    //for(item in objresult.body){
    //
    //}
    //console.log(objresult.body);
});

//var myDate = new Date("2016-03-6T10:19:18.892Z");
//
//console.log(myDate.getDate());