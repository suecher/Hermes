/**
 * Created by Administrator on 2016/3/8.
 */

"use strict";

var ArcheriesScoreController = require('../controllers/archeriesScore.server.controller');


module.exports = function(app){
    app.route('/addscore')
        .post(function(req,res,next){
            console.log(req.body);
            //ArcheriesScoreController.create(req.body,function(resultobjs){
            //    res.json(resultobjs);
            //});
            res.send('提交成功');
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
                req.arrowCount) {
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
                req.arrowCount){

                let cityrank = {};
                cityrank.cityId = req.body.cityId;
                res.send('成功');

            } else {
                res.json({result:false,errorType:'',errorMessage:'缺少必要参数'});
            }
        });
};