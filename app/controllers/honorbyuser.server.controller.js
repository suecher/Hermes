/**
 * Created by Administrator on 2016/3/14.
 */
"use strict";

var mongoose = require('mongoose');
var HonorByUser = mongoose.model('HonorByUser');
var resultobjs = require('../models/result.server.model');

module.exports = {
    create:function(clicentUserHonor,callback){
        if(clicentUserHonor.honorType &&
            clicentUserHonor.honorId &&
            clientUserHonor.userId
          ){
            var honor = HonorByUser.model(clicentUserHonor);

            honor.save(function(err){
                if(err){
                    callback(resultobjs.createResult(false,'AddHonorError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',honor));
            });

        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,荣誉类型,荣誉ID,用户ID'));
            return;
        }
    },
    honorByUser:function(userId,callback){
        if(userId){
            HonorByUser.find({"userId":userId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectHonorError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',docs));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,用户ID'));
        }
    }
}

