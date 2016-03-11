/**
 * Created by Administrator on 2016/3/8.
 */

var ClubControllers = require('../controllers/club.server.controller');

module.exports = function(app){
    app.route('/clublist')
        .post(function(req,res,next){

        });

    app.route('/clubbycity')
        .post(function(req,res,next){
            var cityId =req.body.cityId;

            ClubControllers.listByCity(cityId,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/addclub')
        .post(function(req,res,next){

            var clientclub = req.body;
            ClubControllers.create(clientclub,function(resultobjs){
                res.json(resultobjs);
            });
        });
};