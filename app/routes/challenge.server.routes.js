/**
 * Created by SueCh on 2016/4/21.
 */
"use strict";

var ChallengeControllers = require('../controllers/challenge.server.controller');

module.exports = function(app){


    app.route('/addchallenge')
        .post(function(req,res,next){
            let challenge = req.body;
            ChallengeControllers.create(challenge,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/challengequery')
        .post(function(req,res){
            let challenge = req.body;
            ChallengeControllers.challengeByQuery(challenge,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/challengeupdatescore')
        .post(function(req,res){
            ChallengeControllers.challengeUpdate(req.body,function(resultobj){
                res.json(resultobj);
            });
        });
};