/**
 * Created by Administrator on 2016/3/11.
 */
"use strict";


var mongoose = require('mongoose');

var Friend = mongoose.model('Friend');
var resultobjs = require('../models/result.server.model');

module.exports = {
    create:function(client,callback){
        if(client.userId && client.friendId){
            var friend = Friend();
            friend.userId = client.userId;
            friend.friendId = client.friendId;
            friend.createTime = Date.now();
            friend.save(function(err){
                callback(resultobjs.createResult(true,'','',friend));
                return;
            });

        } else {

            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息用户ID或者好友ID'));
            return;
        }
    },
    getfriend:function(userId,callback){
        if(userId){
            Friend.find({"userId":userId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectFrientError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',docs));
            });
        }else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少用户的ID'));
            return;
        }
    }
}