/**
 * Created by SueCh on 2016/4/21.
 */
"use strict";

let mongoose = require('mongoose');
let Challenge = mongoose("Challenge");
let resultobj = require('../models/result.server.model');

module.exports = {
    create:function(challenge,callback){
        if(challenge.userId &&
            challenge.rivalId &&
            challenge.arrowCount &&
            challenge.arrowRoad){
            challenge.createTime = Date.now();



            // 更新用户信息。挑战次数


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

    }

};