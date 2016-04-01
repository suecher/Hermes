/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";

var mongoose = require('mongoose');
var ArcheriesScore = mongoose.model("ArcheriesScore");
var UserController = require('../controllers/user.server.controller');
var resultobjs = require('../models/result.server.model');
var fs = require('fs');
var config = require('../../config/config');

module.exports = {
    create: function(_createscore, callback) {
        var clientscore =_createscore;

        if(clientscore.userId &&
            clientscore.arrowRoadStandard &&
            clientscore.arrowCount &&
            clientscore.totalPoint &&
            clientscore.avgeragePoint &&
            //clientscore.archeryList &&
            clientscore.bullseye &&
            clientscore.picture){
            var score = ArcheriesScore(clientscore);
            score.isAffirmOver = false;
            score.isAffirm = true;
            score.save(function(err){
                if(err){
                    callback(resultobjs.createResult(false,'CreateArcheriesScore',err.message));
                    return;
                }

                //UserController.updatescore_server(clientscore.userId,{totalPoint:clientscore.totalPoint,arrowCount:clientscore.arrowCount},function(scoreresult){
                callback(resultobjs.createResult(true,'','',score));

                //判断是否有图片
                if(clientscore.picture){
                    var folder_exists = fs.existsSync(config.tempfolder);
                }

                //    if(scoreresult.result){
                //        _callback(resultobjs.createResult(true,'','',score));
                //    } else {
                //        _callback(resultobjs.createResult(false,scoreresult.errorType,scoreresult.errprMessage));
                //    }
                //});
            });

        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
            return;
        }
    },
    scoreByUserAndDate:function(userId,startdate,enddate,callback){
        if(userId){
            ArcheriesScore.find({
                "userId":userId,
                "createTime":{
                    "$gte": new Date(startdate),
                    "$lt":new Date(enddate)}},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectScoreByUserInfoError',err.message));
                }

                //格式化对象 计算最终的数据
                let scorelistobj = {};

                for(let item in docs){
                    if(docs[item].createTime.getDate() in scorelistobj){
                        scorelistobj[docs[item].createTime.getDate()].push(docs[item]);
                    } else {
                        scorelistobj[docs[item].createTime.getDate()] = [docs[item]];
                    }
                };

                let scorelistarr = [];

                for(let item in scorelistobj){
                    let totalPoint = 0;
                    for(let scoreItem in scorelistobj[item]){
                        scorelistobj[item][scoreItem].archeryList.map((n) => totalPoint = totalPoint + n);
                    }

                    scorelistarr.push({groupCount:scorelistobj[item].length,totalPoint:totalPoint,list:scorelistobj[item],date:item});
                }
                //console.log(scorelistarr);
                callback(resultobjs.createResult(true,null,null,scorelistarr));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,userId'));
        }
    },
    scoreByClubRank:function(clubrank,callback){
        if(clubrank.clubId &&
            clubrank.arrowRoad &&
            clubrank.arrowCount
            ){

            //在哪个俱乐部射的。就属于哪个俱乐部的成绩
            ArcheriesScore.find({_id:clubrank.clubId,arrowCount:clubrank.arrowCount,arrowRoadStandard:clubrank.arrowRoad},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'ClubRankSelectError','查询出错'));
                    return;
                }

                //clubuser 将成绩分类到每个俱乐部的成员对象中
                let clubuser = {};
                for(let scoreItem in docs){
                    if(docs[scoreItem].userId in clubuser){
                        clubuser[docs[scoreItem].userId].push(docs[scoreItem]);
                    } else {
                        clubuser[docs[scoreItem].userId] = [docs[scoreItem]];
                    }
                };

                console.log();
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,clubId or arrowRoad or arrowCount'));
        }
    }
};
