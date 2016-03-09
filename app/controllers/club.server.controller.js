/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";

var mongoose = require('mongoose');
var Club = require('../models/club.server.controller');

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
            var club = Club(clientClub);
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
    listByCity:function(cityId,callback){
        if(cityId){

            Club.find({'city':cityId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(resultobjs.createResult(false,'Select club error',err.message)));
                    return;
                }

                callback(resultobjs.createResult(resultobjs.createResult(true,'','',docs)));
            });

        }else{
            callback(resultobjs.createResult(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,城市ID')));
        }
    }

};
