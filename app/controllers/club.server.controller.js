/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";

var mongoose = require('mongoose');
var Clups = mongoose.model('Clups');

var resultobjs = require('../models/result.server.model');

module.exports = {
    create:function(clientClub,callback){
        if(clientClub.name &&
        clientClub.address &&
        clientClub.cperson &&
        clientClub.cphone &&
        clientClub.phone &&
        clientClub.province &&
        clientClub.city &&
        clientClub.district &&
        clientClub.arrowRoadSize &&
        clientClub.houseSize
        ){
            var club = Clups(clientClub);

            club.save(function(err){
                if(err){
                    callback(resultobjs.createResult(false,'AddClubError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',club));

            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    },
    clubById:function(clubId,callback){
        if(clubId){
            Clups.findOne({"_id":clubId},function(err,doc){
                if(err){
                    callback(resultobjs.createResult(false,'SelectClubError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',doc));
            });
        }
        else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,俱乐部ID'));
        }
    },
    listByCity:function(cityId,pagination,callback){

        var pagesize = 10;
        var pagestart = 1;

        if(pagination){
            pagesize =  parseInt(pagination.numPerPage,10) || 10;
            pagestart = parseInt(pagination.pageNo,10) || 1;
        }

        if(cityId){

            Clups.find({'city':cityId})
                .skip((pagestart - 1) * pagesize)
                .limit(pagesize)
                .exec(function(err,docs){
                    if(err) return callback(resultobjs.createResult(false,'Select club error',err.message));

                    callback(resultobjs.createResult(true,'','',docs));
                });

        }else{
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,城市ID'));
        }
    }
};
