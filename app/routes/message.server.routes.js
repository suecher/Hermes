/**
 * Created by Administrator on 2016/3/23.
 */

var MessageController = require('../controllers/message.server.controller');

module.exports = function(app){
    app.route('/createmessage')
        .post(function(req,res){
            var clientmessage = req.body;
            MessageController.create(clientmessage,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/getmessage')
        .post(function(req,res){
            var clientmessage = req.body;
            MessageController.messageByreceiveIdAndsendId(clientmessage.receiveId,clientmessage.sendId,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/messagelistbysendId')
        .post(function(req,res){
            MessageController.messageListBySendId(req.body.sendId,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/messagelistbyreceiveid')
        .post(function(req,res){
            MessageController.messageListByReceiveId(req.body.receiveId,function(resultobjs){
                res.json(resultobjs);
            });
        });
};


