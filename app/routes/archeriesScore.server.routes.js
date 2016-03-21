/**
 * Created by Administrator on 2016/3/8.
 */


var ArcheriesScoreController = require('../controllers/archeriesScore.server.controller');


module.exports = function(app){
    app.route('/addscore')
        .post(function(req,res,next){
            console.log(req.body);
            //ArcheriesScoreController.create(req.body,function(resultobjs){
            //    res.json(resultobjs);
            //});
            res.send('提交成功');
        });

    app.route('/scoreByUser')
        .post(function(req,res,next){
            ArcheriesScoreController.scoreByUser(req.body.userId,function(resultobjes){
                res.json(resultobjes);
            });
        });
};