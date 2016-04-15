
"use strict";
let mongoose = require('mongoose');

let ClubFollow = mongoose.model('ClubFollow');
let resultobjs = require('../models/result.server.model');
let Club = require('../controllers/club.server.controller');

module.exports = {
    create:function(clientClubfollow,callback){
        if(clientClubfollow.clubId && clientClubfollow.userId){
            clientClubfollow.createTime = Date.now();
            let clubfollow = ClubFollow(clientClubfollow);

            clubfollow.save(function(err){
                if(err){
                    callback(resultobjs.createResult(false,'SaveClubFollowError','插入数据出错'));
                    return;
                }

                //更新俱乐部的关注数
                Club.clubUpdateMemberAndFollow(clientClubfollow.clubId,1,0,function(clubfollowresult){
                    if(!clubfollowresult.result){
                        console.log('修改俱乐部关注数错误');
                    }
                });

                callback(resultobjs.createResult(true,null,null,clubfollow));
            });

        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要参数,俱乐部ID或者用户ID'));
        }
    },
    clubfollowbyuser:function(userId,callback){
        if(userId){
            ClubFollow.find({userId:userId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectClubFollowError','查询数据出错'));
                    return;
                }

                callback(resultobjs.createResult(true,null,null,docs));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要参数,用户ID'));
        }
    },
    remove:function(clientClubFollow,callback){
        if(clientClubFollow.userId &&
        clientClubFollow.clubId){
            ClubFollow.remove({userId:clientClubFollow.userId,clubId:clientClubFollow.clubId},function(err){
                if(err){
                    callback(resultobjs.createResult(false,'RemoveClubFollowError','删除关注关系出错'));
                    return;
                }

                //减去俱乐部关注数
                Club.clubUpdateMemberAndFollow(clientClubfollow.clubId,-1,0,function(clubfollowresult){
                    if(!clubfollowresult.result){
                        console.log('修改俱乐部关注数错误');
                    }
                });


                callback(resultobjs.createResult(true,null,null));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要参数,用户ID或者俱乐部ID'));
        }
    }
};