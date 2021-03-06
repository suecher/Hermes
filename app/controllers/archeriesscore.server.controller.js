/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";

var mongoose = require('mongoose');
var ArcheriesScore = mongoose.model("ArcheriesScore");
var UserController = require('../controllers/user.server.controller');
var resultobjs = require('../models/result.server.model');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');

var config = require('../../config/config');

//用户根路径
var userrootfolder = "../" + config.usersPicture;
//临时文件夹路径
var tempfilefloder = "../" + config.tempfolder;

module.exports = {
    create: function(_createscore, callback) {
        console.log('M3');
        var clientscore =_createscore;
        if(clientscore.userId &&
            clientscore.arrowRoadStandard &&
            clientscore.arrowCount &&
            clientscore.avgeragePoint &&
            clientscore.archeryList &&
            clientscore.clubId &&
            clientscore.bowType){


            //如果是数组的值是字符串。转为数字存储
            clientscore.totalPoint = parseInt(clientscore.totalPoint);
            clientscore.arrowCount = parseInt(clientscore.arrowCount);
            var score = ArcheriesScore(clientscore);
            score.isAffirmOver = false;
            score.isAffirm = true;
            score.createTime = Date.now();

            //判断用户是否存在,获取出用户
            UserController.userById(clientscore.userId,function(userresult){
                if(userresult.result){
                    //用户存在

                    //更新用户的总环均环总箭数等数据
                    let user = userresult.body;
                    user.userId = clientscore.userId;
                    user.arrowCount += clientscore.arrowCount;
                    user.totalPoint += clientscore.totalPoint;

                    user.avgeragePoint = user.totalPoint/user.arrowCount;

                    //执行更新用户数据
                    UserController.update(user,function(updatescoreresult){
                        //console.log(updatescoreresult);
                    });

                    score.save(function(err){
                        if(err){
                            callback(resultobjs.createResult(false,'CreateArcheriesScore',err.message));
                            return;
                        }

                        //判断是否有图片
                        if(clientscore.picture){

                            if(!fs.existsSync(userrootfolder + clientscore.userId)){
                                fs.mkdirSync(userrootfolder + clientscore.userId);
                                fs.mkdirSync(userrootfolder + clientscore.userId + "/score/");
                            }

                            if(!fs.existsSync(userrootfolder + clientscore.userId + "/score/")){
                                fs.mkdirSync(userrootfolder + clientscore.userId + "/score/");
                            };

                            fs.rename(tempfilefloder + clientscore.picture,userrootfolder + clientscore.userId + "/score/" + clientscore.picture,function(err){
                                if(err){
                                    //可能存在错误
                                    console.log(err);
                                    return;
                                }
                            });
                        }

                        callback(resultobjs.createResult(true,'','',score));

                    });


                } else {
                    callback(resultobjs.createResult(false,'UserNotExist','用户不存在'));
                    return;
                }
            });

        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,'));
            return;
        }
    },
    scoreById:function(id,callback){
        if(id){
            ArcheriesScore.find({
                "_id":id
            },function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectScoreByIdinforError',err.message));
                    return;
                }
                callback(resultobjs.createResult(true,'','',docs));
            });
        }else {
            callback(resultobjs.createResult(false,'UserNotExist','成绩不存在'));
        }
    },
    /**
     *
     * @param userId
     * @param sorting
     * @param callback
     */
    scoreByUserId:function(userId,sorting,callback){
        if(userId){
            ArcheriesScore.find({userId:userId}).sort({createTime:sorting}).exec(function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectScoreError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,'','',docs));

            });
        } else {
            callback(resultobjs.createResult(false,'UserIdNotExist','缺少参数.,用户ID不存在'));
        }
    },
    /***
     * 用于统计用户所有箭的环数统计
     * @param userId
     * @param callback
     */
    scoreByPoint:function(userId,callback){
        if(userId){
            ArcheriesScore.find({userId:userId},function(err,docs){
                if(err){
                    callback(resultobjs.createResult(false,'SelectScoreError',err.message));
                    return;
                }

                let pointlist = [];

                for(let value of docs){
                    for(let point of value.archeryList){
                        pointlist.push(point);
                    }

                }


                let pointobj = _.groupBy(pointlist, function(n) {
                    return n;
                });

                callback(resultobjs.createResult(true,null,null,pointobj));

            })
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息'));
        }
    },
    /**
     * 成绩活跃度
     * @param userId
     * @param callback
     */
    scoreByActivity:function(userId,startdate,enddate,callback){
        ArcheriesScore.find({
                "userId":userId,
                "createTime":{
                    "$gte": new Date(startdate),
                    "$lt":new Date(enddate)}},function(err,scorelist) {
            if (err) {
                callback(resultobjs.createResult(false, 'SelectScoreByUserInfoError', err.message));
            }


            console.log(scorelist);

            let scoremonth = _.groupBy(scorelist,function(n){
                return moment(n.createTime).month();
            });

            callback(scoremonth);
        });



    },
    scoreByUserAndDate:function(userId,startdate,enddate,callback){
        if(userId && startdate && enddate){


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
                        scorelistobj[item][scoreItem].archeryList.map((n) => totalPoint = totalPoint + parseInt(n));
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
    //统计用户的所有箭的环数
    scoreByuserIdPoint:function(userId,callback){

    },
    scoreByClubRank:function(clubrank,callback){
        if(clubrank.clubIdList &&
            clubrank.arrowRoad &&
            clubrank.arrowCount
            ){

            //在哪个俱乐部射的。就属于哪个俱乐部的成绩
            ArcheriesScore.find({clubId:{"$in":clubrank.clubIdList},arrowCount:clubrank.arrowCount,arrowRoadStandard:clubrank.arrowRoad,bowType:clubrank.bowType},function(err,docs){
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

                var clubscoreList = [];

                for(let useritem in clubuser){
                    var totalpoint = 0;
                    var arrowcount = 0;

                    for(let scoreItem in clubuser[useritem]){
                        totalpoint = totalpoint + parseInt(clubuser[useritem][scoreItem].totalPoint);
                        arrowcount = arrowcount + parseInt(clubuser[useritem][scoreItem].arrowCount);
                    }
                    console.log(totalpoint);

                    let avgerage = totalpoint/clubuser[useritem].length+(arrowcount * config.coefficient); //计算积分
                    let avgeragePoint = totalpoint/(clubuser[useritem].length * clubrank.arrowCount); //计算平均环数

                    clubscoreList.push({userId:useritem,point:avgerage,arrowCount:avgeragePoint});
                }

                //console.log(clubscoreList);
                callback(resultobjs.createResult(true,null,null,clubscoreList));
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,clubId or arrowRoad or arrowCount'));
        }
    }

};
