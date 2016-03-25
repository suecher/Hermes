/**
 * Created by Administrator on 2016/3/14.
 */

"use strict";

var mongoose = require('mongoose');
var Message = mongoose.model('Message');

var resultobjs = require('../models/result.server.model');

module.exports = {

    create:function(clientMessage,callback){
        if(clientMessage.sendId &&
        clientMessage.receiveId &&
        clientMessage.content &&
        clientMessage.messageType){
            var message = Message(clientMessage);

            message.save(function(err){
                if(err){
                    callback(resultobjs.createResult(false,'AddMessageError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',message));
            });

        } else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,发送人ID,接收人ID,主题,内容,消息类型'));
            return;
        }
    },
    messageByreceiveIdAndsendId:function(receiveId,sendId,callback){
        if(receiveId && sendId){
            Message.find({"receiveId":receiveId,"sendId":sendId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectMessageError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',docs));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,发送人ID,接收人ID'));
        }
    },
    messageByreceiveIdAndMessageType:function(receiveId,messageType,callback){
        if(receiveId && messageType){

            Message.find({"receiveId":receiveId,messageType:messageType},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectMessageError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',docs));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,发送人ID,消息类型'));
        }
    },
    messageListByUserId:function(sendId,callback){
        if(sendId){
            Message.find({sendId:sendId})
                .sort('createTime')
                .exec(function(err,docs){
                    if(err){
                        callback(resultobjs.createResult(false,'Select.Message.Database.Error',err.message));
                        return;
                    }

                    callback(resultobjs.createResult(true,null,null,docs));
                });
        }else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要的信息'));
        }
    }
}