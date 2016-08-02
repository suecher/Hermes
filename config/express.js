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

    app.use(express.static('../public'));

    require('../app/routes/user.server.routes')(app);
    require('../app/routes/areas.server.routes')(app);
    require('../app/routes/club.server.routes')(app);
    require('../app/routes/archeriesscore.server.routes.js')(app);
    require('../app/routes/friend.server.routes')(app);
    require('../app/routes/uploadfiles.server.routes')(app);
    require('../app/routes/message.server.routes')(app);
    require('../app/routes/honor.server.routes')(app);

    require('../app/routes/level.server.routes')(app);
    require('../app/routes/clubfollow.server.routes')(app);
    require('../app/routes/security.server.routes')(app);
    require('../app/routes/test.server.routes')(app);
    require('../app/routes/bowtype.server.routes.js')(app);
    require('../app/routes/advert.server.routes')(app);
    require('../app/routes/challenge.server.routes')(app);
    require('../app/routes/club.manager.server.routes')(app);
    require('../app/routes/version.server.routes')(app);

    app.use(function(req,res,next){
        res.status(404);
        try{
            return res.json('Not Found');
        }
        catch(e){
            console.error(e);
        }
    });

    app.use(function(err,req,res,next){
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