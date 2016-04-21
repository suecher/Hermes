
"use strict";

let AdvertController = require('../controllers/advert.server.controller');

module.exports = function(app){
    app.route('/addadvert')
        .post(function(req,res){
            AdvertController.create(req.body,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/advertbycity')
        .post(function(req,res){

            AdvertController.advertQuery(req.body,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/advertbyclubId')
        .post(function(req,res){
            AdvertController.advertQuery(req.body,function(resultobj){
                res.json(resultobj);
            });
        });
};