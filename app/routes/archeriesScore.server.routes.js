/**
 * Created by Administrator on 2016/3/8.
 */

"use strict";

var ArcheriesScoreController = require('../controllers/archeriesScore.server.controller');
var ClubController = require('../controllers/club.server.controller');


module.exports = function(app){
    app.route('/addscore')
        .post(function(req,res){
            ArcheriesScoreController.create(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/addscoreandroid')
        .post(function(req,res){

            //因android端提交问题.临时解决接口.将android提交上来的archeryList 逗号分隔字符串 转数组.
            let archeryList = [];
            if(req.body.archeryList){
                for(let item in body.archeryList.split(',')){
                    archeryList.push(parseInt(item));
                }

                req.body.archeryList = archeryList;

                ArcheriesScoreController.create(req.body,function(resultobjs){
                    res.json(resultobjs);
                });

            } else {
                res.json({result:false,errorType:'archeryList NotExist',errorMessage:'archeryList 参数不存在'});
            }
        });

    app.route('/scorebyuser')
        .post(function(req,res){
            let scorerequest = req.body;
            ArcheriesScoreController.scoreByUserAndDate(scorerequest.userId,scorerequest.startDate,scorerequest.endDate,function(resultobjes){
                res.json(resultobjes);
            });
        });


    app.route('/rankingbyclub')
        .post(function(req,res){

            if(req.body.clubId &&
                req.body.arrowRoad &&
                req.body.arrowCount) {
                let clubrank = {};
                clubrank.clubIdList = [req.body.clubId];
                clubrank.arrowRoad = req.body.arrowRoad;
                clubrank.arrowCount = req.body.arrowCount;
                ArcheriesScoreController.scoreByClubRank(clubrank, function (resultobjes) {
                    res.json(resultobjes);
                });
            } else {
                res.json({result:false,errorType:'',errorMessage:'缺少必要参数'});
            }
        });


    app.route('/rankingbycity')
        .post(function(req,res){
            if(req.body.cityId &&
                req.body.arrowRoad &&
                req.body.arrowCount){
                let cityrank = {};
                cityrank.cityId = req.body.cityId;
                let clublist = [];
                ClubController.listByCityAll(req.body.cityId,function(resultobj){
                    if(resultobj.result){

                        for(let item in resultobj.body){
                            clublist.push(resultobj.body[item]._id);
                        }

                        var clubrank = {};
                        clubrank.clubIdList = clublist;
                        clubrank.arrowRoad = req.body.arrowRoad;
                        clubrank.arrowCount = req.body.arrowCount;

                        ArcheriesScoreController.scoreByClubRank(clubrank, function (scoreResult) {
                            res.json(scoreResult);
                        });

                    } else {
                        res.json(resultobj);
                    }
                });

            } else {
                res.json({result:false,errorType:'SubmitParameterError',errorMessage:'缺少必要参数'});
            }
        });
};