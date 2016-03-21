/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";

var mongoose = require('mongoose');
var ArcheriesScore = mongoose.model("ArcheriesScore");
var UserController = require('../controllers/user.server.controller');
var resultobjs = require('../models/result.server.model');

module.exports = {
    create: function(_createscore, _callback) {
        var clientscore =_createscore;

        if(clientscore.userId &&
            clientscore.arrowRoadStandard &&
            clientscore.arrowCount &&
            clientscore.totalPoint &&
            clientscore.avgeragePoint &&
            //clientscore.archeryList &&
            clientscore.bullseye){

            var score = ArcheriesScore(clientscore);

            score.isAffirmOver = false;
            score.isAffirm = true;

            score.save(function(err){
                if(err){
                    _callback(resultobjs.createResult(false,'CreateArcheriesScore',err.message));
                    return;
                }

                //UserController.updatescore_server(clientscore.userId,{totalPoint:clientscore.totalPoint,arrowCount:clientscore.arrowCount},function(scoreresult){
                _callback(resultobjs.createResult(true,'','',score));
                //    if(scoreresult.result){
                //        _callback(resultobjs.createResult(true,'','',score));
                //    } else {
                //        _callback(resultobjs.createResult(false,scoreresult.errorType,scoreresult.errprMessage));
                //    }
                //});

            });

        } else {
            _callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
            return;
        }
    },
    scoreByUser:function(userId,callback){
        if(userId){
            ArcheriesScore.find({"userId":userId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectScoreByUserInfoError',err.message));
                }

                callback(resultobjs.createResult(true,null,null,docs));
            });
        }else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
            return;
        }
    },
    scoreByClubRank:function(clubId){

    }
}
