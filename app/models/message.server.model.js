/**
 * Created by Administrator on 2016/3/14.
 */

"use strict";
let moment = require('moment');
let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    sendId:String, //发送者ID
    receiveId:String, //接收者ID
    subject:String, // 主题
    content:String, // 内容
    messageType:Number, //消息类型 //1.用户消息 2.是平台消息 3.俱乐部消息 4.挑战消息 5.投票消息 6.//好友请求信息
    messageUrl:String, // 消息URL
    messagePic:[], // 消息图片序列
    body:Object, // 消息结构体 比如挑战,投票等.
    read:Boolean,//是否阅读
    createTime:Date
});

let Message = mongoose.model('Message',MessageSchema);