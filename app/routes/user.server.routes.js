/**
 * Created by Administrator on 2016/3/2.
 */
"use strict";
var UserController = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/usersignin')
        .post(function(req,res){

            UserController.create(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/userlogin')
        .post(function(req,res,next){
            UserController.login(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/userofclub')
        .post(function(req,res){
            let clientuserofclub = req.body;
            UserController.userofclub(clientuserofclub,function(resultobj){
                res.json(resultobj);
            });
        });
    
    app.route('/userupdate')
        .post(function(req,res){
            var clientuser = req.body;
            UserController.update(clientuser,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/userbyid')
        .post(function(req,res,next){
            UserController.userById(req.body.userId,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/friendbyuserId')
        .post(function(req,res){
            UserController.userById(req.body.userId,function(resultobjs){
                res.send(resultobjs);
            });
        });

    app.route('/userfriends')
        .post(UserController.list);


};