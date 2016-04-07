/**
 * Created by SueCh on 2016/4/6.
 */
"use strict";

let ClubFollowController = require('../controllers/clubfollow.server.controller');

module.exports = function(app){
    app.route('/addclubfollow')
        .post(function(req,res){
            ClubFollowController.create({clubId:req.body.clubId,userId:req.body.userId},function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/getclubfollow')
        .post(function(req,res){
            ClubFollowController.clubfollowbyuser(req.body.userId,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/cancelfollow')
        .post(function(req,res){
            ClubFollowController.remove({userId:req.body.userId,clubId:req.body.clubId},function(resultobj){
                res.json(resultobj);
            });
        });
};