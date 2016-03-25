/**
 * Created by Administrator on 2016/3/25.
 */

var HonorController = require('../controllers/honorbyuser.server.controller');

module.exports = function(app){
    app.route('/createhonor')
        .post(function(req,res){
            var clienthonor = req.body;
            HonorController.create(clienthonor,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/honorbyuserid')
        .post(function(req,res){
            HonorController.honorByUser(req.body.userId,function(resultobj){
                res.json(resultobj);
            });
        });

};


