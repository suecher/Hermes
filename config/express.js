/**
 * Created by Administrator on 2016/3/2.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(){
    console.log('init express....');

    var app = express();

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.set('views','views');
    app.set('view engine','ejs');

    app.use(express.static('./public'));


    require('../app/routes/user.server.routes')(app);
    require('../app/routes/areas.server.routes')(app);
    require('../app/routes/club.server.routes')(app);
    require('../app/routes/archeriesScore.server.routes')(app);
    require('../app/routes/friend.server.routes')(app);


    app.use(function(req,res,next){
        res.status(404);
        try{
            return res.json('Not Found');
        }
        catch(e){
            console.error(e);
        }
    });

    app.use(function(err,res,res,next){
        if(!err) { return next()}
        res.status(500);
        try{
            return res.json(err.message || 'server error');
        } catch(e){
            console.error('500 set header after sent');
        }
    });

    return app;
};