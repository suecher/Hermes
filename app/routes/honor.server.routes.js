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

    //获取用户最新得到的成就,此成就没有写入成就表,但是已达成.
    app.route('/honorbyverify')
        .post(function(req,res){

            HonorController.honorVerify(req.body.userId,function(resultobj){
                res.json(resultobj);
            });
        });

};


