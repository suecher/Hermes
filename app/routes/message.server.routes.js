/**
 * Created by Administrator on 2016/3/23.
 */
"use strict";



    "use strict";
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
            MessageController.messageByreceiveIdAndsendId(clientmessage.receiveId,clientmessage.sendId,clientmessage.messageType,function(resultobjs){
                res.json(resultobjs);
            });
        });

    //根据发送者获取ID
    app.route('/messagelistbysendId')
        .post(function(req,res){
            MessageController.messageListBySendId(req.body.sendId,function(resultobjs){
                res.json(resultobjs);
            });
        });

    //根据接收者获取信息
    app.route('/messagelistbyreceiveid')
        .post(function(req,res){

            let receive = {};
            receive.receiveId = req.body.receiveId;
            receive.startDate = req.body.startDate;
            receive.endDate = req.body.endDate;
            MessageController.messageListByReceiveId(req.body.receiveId,receive.startDate,receive.endDate,function(resultobjs){
                res.json(resultobjs);
            });
        });

    //删除消息
    app.route('/removemessage')
        .post(function(req,res){
            let messageId = req.body.messageId;
            console.log(req.body);
            MessageController.messageRemove(messageId,function(resultobjs){
                res.json(resultobjs);
            });
        });
};


