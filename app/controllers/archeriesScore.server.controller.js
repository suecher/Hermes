/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";

var mongoose = require('mongoose');
var ArcheriesScore = mongoose.model("ArcheriesScore");

var resultobjs = require('../models/result.server.model');

module.exports = {
    create: function(_createscore, _callback) {

        var clientscore =_createscore;

        console.log(clientscore);

        if(clientscore.userId &&
            clientscore.arrowRoadStandard &&
            clientscore.arrowCount &&
            clientscore.clubId &&
            clientscore.totalPoint &&
            clientscore.avgeragePoint &&
            clientscore.archeryList){

            var score = ArcheriesScore(clientscore);

            score.isAffirmOver = false;
            score.isAffirm = true;

            score.save(function(err){
                if(err){
                    _callback(resultobjs.createResult(false,'CreateArcheriesScore',err.message));
                    return;
                }

                _callback(resultobjs.createResult(true,'','',score));
            });

        } else {
            _callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
            return;
        }
    }
}
