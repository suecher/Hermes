
"use strict";

let mongoose = require('mongoose');
let resultobj = require('../models/result.server.model');
let Advert = mongoose.model("Advert");

module.exports = {
    create:function(advert,callback){
        if(advert.clubId &&
            advert.city &&
            advert.url &&
            advert.type &&
            advert.picture){

            advert.createTime = Date.now();

            let advertobj = Advert(advert);
            
            advertobj.save(function(err){
                if(err){
                    callback(resultobj.createResult(false,'SaveAdvertisement','存储推广信息出错'));
                    return;
                }

                callback(resultobj.createResult(true,null,null,advertobj));
            });

        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    },
    advertQuery:function(obj,callback){
        if(obj.clubId || obj.city){

            //city true 证明活动界面获取数据。这个时候需要获取俱乐部置顶的消息
            if(obj.city){
                Advert.find({ "$or":[{"city":obj.city}, {"clubId":"000000000000000000000001"}]},function(err,docs){
                    if(err){
                        callback(resultobj.createResult(false,'SelectAdvertError','查询广告信息出错,'));
                        return;
                    };

                    callback(resultobj.createResult(true,null,null,docs));
                });
            } else {
                Advert.find(obj,function(err,docs){
                    if(err){
                        callback(resultobj.createResult(false,'SelectAdvertError','查询广告信息出错,'));
                        return;
                    };

                    callback(resultobj.createResult(true,null,null,docs));
                });
            }
        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    }
};