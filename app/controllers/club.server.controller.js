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
            clientClub.createTime = Date.now();
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
    /**
     * 用于俱乐部端删除俱乐部图片
     * @param clubId
     * @param picId
     * @param callback
     */
    removeClubPic:function(clubId,picId,callback){
        let clubByUpdate = this.clubByUpdate;
        if(clubId && picId){
            this.clubById(clubId,function(result){

                let pictureList = result.body.pictureList.filter(function(item,index){

                    if(item !== picId){
                        return item;
                    }
                });

                result.body.pictureList = pictureList;
                //console.log(pictureList);
                //console.log(result.body.pictureList);


                clubByUpdate(clubId,result.body,function(result){
                    callback(resultobjs.createResult(true,null,null,result));
                });
            })
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
        }
    },
    clubUpdateMemberAndFollow:function(clubId,followSize,memberSize,callback){
        if(clubId) {
            Clups.update({_id:clubId},{$inc:{'followSize':followSize,'memberSize':memberSize}},function(err,data){
                if(err){
                    callback(resultobjs.createResult(false,'UpdateMemberAndFollow',err.message));
                    console.log(err.message);
                    return;
                }

                callback(resultobjs.createResult(true,null,null,data));
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
    clubByUpdate:function(clubId,obj,callback){
        if(clubId){
            Clups.update({_id:clubId},obj,function(err,data){
                if(err){
                    callback(resultobjs.createResult(false,'UpdateClubError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',data));

            });
        } else {
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
    },
    /***
     * 用户返回 靶心训练营 虚拟俱乐部
     */
    clubBaxin:function(callback){
        Clups.findOne({city:0,province:0},function(err,doc){
            if(err){
                console.log('获取靶心俱乐部错误');
                return;
            }
            callback(doc);
        });
    },
    clubByName:function(clubName,callback){
        if(clubName){
            Clups.find({name:{$regex:clubName}},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectClubError','按俱乐部名称模糊查询'));
                    return;
                }

                callback(resultobjs.createResult(true,null,null,docs));
            });
        } else  {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,俱乐部名称'));
        }
    },
    listByCityAll:function(cityId,callback){
        if(cityId){
            Clups.find({'city':cityId},{_id:1},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,城市ID'));
                    return;
                }

                callback(resultobjs.createResult(true,'','',docs));
            })
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,城市ID'));
        }
    },

    //按省份查找俱乐部
    listByprovince:function(provinceId,pagination,callback){

        var pagesize = 10;
        var pagestart = 1;

        // if(pagination){
        //     pagesize =  parseInt(pagination.numPerPage,10) || 10;
        //     pagestart = parseInt(pagination.pageNo,10) || 1;
        // }


        if(provinceId){
            Clups.find({'province':provinceId})
                .skip((pagestart -1 ) * pagesize)



              //  .limit(pagesize)
                .exec(function(err,docs){
                    if(err) return callback(resultobjs.createResult(false,'Select club error',err.message));

                    callback(resultobjs.createResult(true,'','',docs));
                });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,城市ID'));
        }
    }
};
