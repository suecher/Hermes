/**
 * Created by Administrator on 2016/3/14.
 */

"use strict";

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
let moment = require('moment');
let push = require('../../config/push.config');

var resultobjs = require('../models/result.server.model');

module.exports = {
    create:function(clientMessage,callback){
        console.log(clientMessage);
        if(clientMessage.sendId &&
        clientMessage.receiveId &&
        clientMessage.content &&
        clientMessage.messageType){
            clientMessage.createTime = Date.now();
            let message = Message(clientMessage);

            //判断是否为好友请求消息或对战消息 如果是这两种消息。判断是否存在。。如果已存在。不重复添加
            if(clientMessage.messageType == 4 || clientMessage.messageType == 6){
                this.messageExist({sendId:clientMessage.sendId,receiveId:clientMessage.receiveId,messageType:clientMessage.messageType},function(resultobj){
                    if(!resultobj.result){
                        message.save(function(err){
                            if(err){
                                callback(resultobjs.createResult(false,'AddMessageError',err.message));
                                return;
                            }

                            if(clientMessage.messageType == 6){
                                push(clientMessage.receiveId,'您收到一个好友请求.');
                            }

                            if(clientMessage.messageType == 4){
                                push(clientMessage.receiveId,'您收到一封挑战书.');
                            }

                            callback(resultobjs.createResult(true,'','',message));

                        });

                    } else {
                        callback(resultobjs.createResult(false,'MsgExist',"请求信息已存在"));
                    }
                });
            } else {
                message.save(function(err){
                    if(err){
                        callback(resultobjs.createResult(false,'AddMessageError',err.message));
                        return;
                    }
                    console.log('触发1')

                    if(clientMessage.messageType == 1){
                        push(clientMessage.receiveId,'您收到一条新的留言信息.');
                    }

                    if(clientMessage.messageType == 2 || clientMessage.messageType == 3){
                        push(clientMessage.receiveId,'您收到一条新的活动信息.');
                    }
                    console.log('触发2')

                    callback(resultobjs.createResult(true,'','',message));
                });
            }


            //判断如果不是重复消息再保存信息
            //
            //message.save(function(err){
            //    if(err){
            //        callback(resultobjs.createResult(false,'AddMessageError',err.message));
            //        return;
            //    }
            //
            //    callback(resultobjs.createResult(true,'','',message));
            //});

        } else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,发送人ID,接收人ID,主题,内容,消息类型'));
            return;
        }
    },
    messageExist:function(obj,callback){
        Message.findOne(obj,function(err,doc){
            if(err){
                callback(resultobjs.createResult(false,'SelectMessageError','判断信息数据是否存在时候出错'));
                return;
            }

            if(doc){
                callback(resultobjs.createResult(true,null,null,doc));
            } else {
                callback(resultobjs.createResult(false,"NotExist",null));
            };
        });
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
    },
    messageRemoveByFriend:function(currentuser,targetuser,callback){
        if(currentuser && targetuser){

            //目标用户删除当前用户的聊天记录
            Message.remove({sendId:currentuser,receiveId:targetuser},function(err){
                if(err){
                    callback(resultobjs.createResult(false,'DeleteMsgError','删除当前用户发送给目标用户出错'));
                    return;
                }
            });

            //目标用户删除当前用户的聊天记录
            Message.remove({sendId:targetuser,receiveId:currentuser},function(err){
                if(err){
                    callback(resultobjs.createResult(false,'DeleteMsgError','删除当前用户发送给目标用户出错'));
                    return;
                }
            });

            callback(resultobjs.createResult(true,null,null));

        } else  {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要的信息,currentuser targetuser'));
        }

    }
};