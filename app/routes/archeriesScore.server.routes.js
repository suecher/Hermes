/**
 * Created by Administrator on 2016/3/8.
 */





var ArcheriesScoreController = require('../controllers/archeriesScore.server.controller');


module.exports = function(app){
    app.route('/addscore')
        .post(function(req,res,next){
            ArcheriesScoreController.create(req.body,function(resultobjs){
                res.json(resultobjs);
            });

        });
};