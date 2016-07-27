/**
 * Created by Administrator on 2016/3/8.
 */

"use strict";

var ArcheriesScoreController = require('../controllers/archeriesscore.server.controller.js');
var ClubController = require('../controllers/club.server.controller');
let config = require('../../config/config');
let moment = require('moment');

module.exports = function(app){
    app.route('/addscore')
        .post(function(req,res){
            console.log(req.body);
            ArcheriesScoreController.create(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    //app.route('/addscoreandroid')
    //    .post(function(req,res){
    //
    //        //因android端提交问题.临时解决接口.将android提交上来的archeryList 逗号分隔字符串 转数组.
    //        let archeryList = [];
    //        if(req.body.archeryList){
    //            for(let item in body.archeryList.split(',')){
    //                archeryList.push(parseInt(item));
    //            }
    //
    //            req.body.archeryList = archeryList;
    //
    //            ArcheriesScoreController.create(req.body,function(resultobjs){
    //                res.json(resultobjs);
    //            });
    //
    //        } else {
    //            res.json({result:false,errorType:'archeryList NotExist',errorMessage:'archeryList 参数不存在'});
    //        }
    //    });

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
                clubrank.bowType = req.body.bowType;
                ArcheriesScoreController.scoreByClubRank(clubrank, function (resultobjes) {
                    res.json(resultobjes);
                });
            } else {
                res.json({result:false,errorType:'',errorMessage:'缺少必要参数'});
            }
        });


    /**
     * 用来呈现用户分享是成绩
     */
    app.route('/sharescore/:id')
        .get(function(req,res){

            ArcheriesScoreController.scoreById(req.params.id,function(result){
                if(result.result){
                    if(result.body.length > 0){
                        let date = moment(result.body[0].createTime).format("YYYY-MM-DD");
                        let avgeragePoint = Math.round(result.body[0].avgeragePoint*100)/100;
                        res.redirect(config.webapp + "/sharescore?userId="+result.body[0].userId+"&&avgeragePoint="+result.body[0].avgeragePoint+"&&arrowRoadStandard="+result.body[0].arrowRoadStandard+"&&arrowCount="+result.body[0].arrowCount+"&&date="+date+"&&pic="+result.body[0].picture+"&&totalPoint="+result.body[0].totalPoint);
                    } else {
                        res.json({"error":"成绩不存在"});
                    }

                } else {
                    res.json(result);

                }
            });
        });

    /**
     * 用于统计用户数据 呈现图标
     */
    app.route('/report/statistics/:id')
        .get(function(req,res){
            res.send('statistics:' + req.params.id);
        });

    app.route('/rankingbycity')
        .post(function(req,res){
            if(req.body.cityId &&
                req.body.arrowRoad &&
                req.body.arrowCount &&
                req.body.bowType){
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
                        clubrank.bowType = req.body.bowType;
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


    /**
     * 用于统计用户的环数总数.统计部分
     */
    app.route('/pointgroup')
        .post(function(req,res){
            let userId = req.body.userId;
            ArcheriesScoreController.scoreByPoint(userId,function(resultobj){
                res.send(resultobj.body);
            });
        });

    //用户活跃度接口 用于统计部分
    app.route('/useractivity')
        .post(function(req,res){
            let begindate = req.body.begindate;
            let enddate = req.body.enddate;
            let userId = req.body.userId;

            ArcheriesScoreController.scoreByActivity(userId,"2016-01-01","2016-12-31",function(resultobj){
                res.json(resultobj);
            });


        });

    app.route('/scorebyId')     //根据成绩id获取成绩
        .post(function(req,res){
            ArcheriesScoreController.scoreById(req.body. id,function(resultobjs){
                res.send(resultobjs);
            });
        });
};