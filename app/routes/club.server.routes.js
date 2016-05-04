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
            var pagination = req.body.pagination;
            ClubControllers.listByCity(cityId,pagination,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/clubbyid')
        .post(function(req,res){
            var clubId = req.body.clubId;
            ClubControllers.clubById(clubId,function(resultobjs){
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

    app.route('/clubbyname')
        .post(function(req,res){



            ClubControllers.clubByName(req.body.clubName,function(resultobjs){
                res.json(resultobjs);
            });
        });
};