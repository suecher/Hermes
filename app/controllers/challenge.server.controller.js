/**
 * Created by SueCh on 2016/4/21.
 */
"use strict";

let mongoose = require('mongoose');
let Challenge = mongoose.model("Challenge");
let UserController = require('../controllers/user.server.controller');
let resultobj = require('../models/result.server.model');

module.exports = {
    create:function(challenge,callback){
        if(challenge.userId &&
            challenge.rivalId &&
            challenge.arrowCount &&
            challenge.arrowRoad){
            challenge.createTime = Date.now();


            //challenge.userScoreId = null;
            //challenge.rivalScoreId= null;

            // 更新用户信息。挑战次数

            UserController.userUpdateNumType(challenge.userId,{challengeNum:1},function(resultobj){
                if(!resultobj.result){
                    console.log('更新挑战次数失败');
                }
            });
            UserController.userUpdateNumType(challenge.rivalId,{challengeNum:1},function(resultobj){
                if(!resultobj.result){
                    console.log('更新挑战次数失败');
                }
            });

            //

            let challengeobj =  Challenge(challenge);
            console.log(challenge);
            challengeobj.save(function(err){
                if(err){
                    resultobj.createResult(false,'AddChallengeError','创建对战信息时报错');
                    return;
                }

                callback(resultobj.createResult(true,null,null,challengeobj));
            });


        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    },
    challengeByQuery:function(obj,callback){
        if(obj.userId || obj.rivalId){
            Challenge.find(obj,function(err,docs){
                if(err){
                    resultobj.createResult(false,'SelectChallengeError','查询对战信息报错');
                    return;
                }

                callback(resultobj.createResult(true,null,null,docs));
            });
        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    },
    challengeUpdate:function(obj,callback){
        if( obj._id &&
            obj.userScoreId &&
            obj.rivalScoreId &&
            obj.finish){

            //判断是否完结,完结更新信息
            if(obj.finish){

                if(!(obj.winnerId &&　obj.loserId)){
                    callback(resultobj.createResult(false,'UpdateChallengeError','缺少获胜者(winnerId)失败者信息(loserId) '));
                    return;
                };

                //更新胜利者信息
                UserController.userUpdateNumType(obj.winnerId,{victory:1},function(resultobj){
                    if(!resultobj.result){
                        console.log('更新挑战次数失败');
                    }
                });

                //更新失败者信息
                UserController.userUpdateNumType(obj.loserId,{defeated:1},function(resultobj){
                    if(!resultobj.result){
                        console.log('更新挑战次数失败');
                    }
                });
            };

            Challenge.update({_id:obj._id},{$set:{obj}},function(err,data){
                if(err){
                    callback(resultobj.createResult(false,'UpdateChallengeError','更新对战信息时报错'));
                    return;
                }

                callback(resultobj.createResult(true,null,null,data));
            });
        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    }
};