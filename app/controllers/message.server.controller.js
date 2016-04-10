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
            clientMessage.createTime = Date.now();
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
    messageByreceiveIdAndsendId:function(receiveId,sendId,messageType,callback){
        if(receiveId && sendId && messageType){
            Message.find({"receiveId":receiveId,"sendId":sendId,"messageType":messageType},function(err,docs){
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
    messageListByReceiveId:function(receiveId,startdate,enddate,callback){
        if(receiveId){
            Message.find({receiveId:receiveId,
            "createTime":{
                "$gte":new Date(startdate),
                "$lt":new Date(enddate)
            }})
                .sort('createTime')
                .exec(function(err,docs){
                    if(err){
                        callback(resultobjs.createResult(false,'Select.Message.Database.Error',err.message));
                        return;
                    }



                    let messageusertypelist = {}; // 临时存储用户消息,用于分类,方便之后删选最大日期的单条数据.返回到客户端.
                    let messagelist = []; // 存储

                    for(let messageItem in docs){
                        //如果等于1 为普通用户消息,需要筛选归类
                        if(docs[messageItem].messageType == 1){
                            //按发送者ID,将信息归类;
                            if(docs[messageItem].sendId in messageusertypelist){
                                messageusertypelist[docs[messageItem].sendId].push(docs[messageItem]);
                            } else {
                                messageusertypelist[docs[messageItem].sendId] = [docs[messageItem]];
                            }

                        } else { //如果不为1就是其他类型消息.
                            messagelist.push(docs[messageItem]);
                        }
                    };

                    //将归类的用户消息 筛选出日期最大的消息 合并到 messagelist中去

                    for(let usermsgItem in messageusertypelist){
                        //for(let msgItem in messageusertypelist[usermsgItem]){
                        //
                        //}
                        let mindate = new Date('2000-1-1');
                        let maxindex;
                        messageusertypelist[usermsgItem].filter(function(item,index){
                            if(item.createTime > mindate){
                                mindate = item.createTime;
                                maxindex = index;
                            }
                        });
                        console.log(maxindex);
                        messagelist.push(messageusertypelist[usermsgItem][maxindex]);
                    }

                    callback(resultobjs.createResult(true,null,null,messagelist));

                });
        }else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要的信息'));
        }
    },
    messageListBySendId:function(sendId,callback){
        if(sendId){
            Message.find({receiveId:sendId})
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
    },
    messageRemove:function(messageId,callback){
        if(messageId){
            Message.remove({"_id":messageId},function(err){
                if(err){
                    callback(resultobjs.createResult(false,'RemoveMessageError','缺少必要的信息,MessageID'));
                    return;
                }

                callback(resultobjs.createResult(true,null,null));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要的信息,MessageID'));
        }
    }
}