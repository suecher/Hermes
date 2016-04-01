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
            let clubrank = req.body;
            ArcheriesScoreController.scoreByClubRank(clubrank,function(resultobjes){
                res.json(resultobjes);
            });
        });

    app.route('/')

};