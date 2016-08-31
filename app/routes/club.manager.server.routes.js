/**
 * Created by Administrator on 2016/5/23.
 */

"use strict";

let ClubManagerController = require('../controllers/club.manager.server.controller');

module.exports = function(app){
    app.route('/managerlogin')
        .post(function(req,res){
            let clientmanager = req.body;
            ClubManagerController.login(clientmanager,function(result){
                res.json(result);
            });
        });

    app.route('/UpdataClubPassword')
        .post(function(req,res){
            var clubId = req.body.clubId;
            var password = req.body.password;
            var newpassword = req.body.newpassword;
            ClubManagerController.updataPassword(clubId,password,newpassword,function(result){
                res.json(result);
            })
        });


};