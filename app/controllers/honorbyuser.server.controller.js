/**
 * Created by Administrator on 2016/3/14.
 */
"use strict";

var mongoose = require('mongoose');
var HonorByUser = mongoose.model('HonorByUser');
var resultobjs = require('../models/result.server.model');
let UserController = require('../controllers/user.server.controller');
let FriendController = require('../controllers/friend.server.controller');
let ScoreController = require('../controllers/archeriesscore.server.controller');
let moment = require('moment');
var async = require('async');

module.exports = {
    create:function(clicentUserHonor,callback){
        if(clicentUserHonor.honorType &&
            clicentUserHonor.honorId &&
            clicentUserHonor.userId
          ){
            clicentUserHonor.createTime = Date.now();
            var honor = HonorByUser(clicentUserHonor);
            honor.save(function(err){
                if(err){
                    callback(resultobjs.createResult(false,'AddHonorError',err.message));
                    return;
                }

                callback(resultobjs.createResult(true,null,null,honor));
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
    },
    honorByNew:function(userId,callback){
        if(userId){

        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,用户ID'));
        }
    },
    //验证总环数是否达到成就标准
    honorVerify:function(userId,callback){

        if(userId){

            let honorByUser = this.honorByUser;
            let createHonor = this.create;
            //根据ID获取用户
            UserController.userById(userId,function(resultUser){
                if(resultUser.result){
                    let currentUser = resultUser.body;
                    //通过用户ID获取现有成就

                    honorByUser(userId,function(resultHonor){
                        if(resultHonor.result){

                            //成功获取用户的现有荣誉
                            let currentHonor = resultHonor.body.map((n) => n.honorId);

                            //返回客户端的新获取的荣誉数组
                            let clientHonor = [];

                            //执行完成数组.
                            //let execresult = {"A1":"false","B1":"false","B2":"false","B3":"false","C1":"false","C2":"false","C3":"false","D1":"false","D2":"false","D3":"false","E1":"false","E2":"false","E3":"false","F1":"false","G1":"false","G2":"false","G3":"false","H1":"false","H2":"false","H3":"false","J1":"false","J2":"false","J3":"false"}
                            let execresult = {"2":"false","3":"false","4":"false","5":"false","6":"false","7":"false","8":"false","12":"false","13":"false","14":"false","16":"false","17":"false","18":"false","23":"false","24":"false","25":"false"};

                            //遍历当前用户的获取的成就,如果没有当前成就就进行验证

                            //判断是否拥有A1荣誉,如果拥有不做处理,如果没有判断是否已满足条件.满足了的话.进行更新操作
                            //if(currentHonor.indexOf('A1') == -1){
                            //
                            //}

                            if(currentHonor.indexOf(2) == -1){
                                FriendController.getfriend(userId,function(resultFriend){
                                    if(resultFriend.result){
                                        if(resultFriend.body.length >= 3){
                                            //获得此B1成就 关注3名好友
                                            createHonor({honorId:2,honorType:1,sort:2,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["2"] = true;
                                                    clientHonor.push({honorId:2,honorType:1,sort:2});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    } else {
                                        console.log('验证成就时获取好友数量失败');
                                    }
                                });
                            }

                            if(currentHonor.indexOf(3) == -1){
                                FriendController.getfriend(userId,function(resultFriend){
                                    if(resultFriend.result){
                                        if(resultFriend.body.length >= 10){
                                            //获得此B2成就 关注10名好友
                                            createHonor({honorId:3,honorType:2,sort:2,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["3"] = true;
                                                    clientHonor.push({honorId:3,honorType:2,sort:2});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    } else {
                                        console.log('验证成就时获取好友数量失败');
                                    }
                                });
                            }

                            if(currentHonor.indexOf(4) == -1){
                                FriendController.getfriend(userId,function(resultFriend){
                                    if(resultFriend.result){
                                        if(resultFriend.body.length >= 30){
                                            //获得此B3成就 关注10名好友
                                            createHonor({honorId:4,honorType:2,sort:3,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["4"] = true;
                                                    clientHonor.push({honorId:4,honorType:2,sort:3});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    } else {
                                        console.log('验证成就时获取好友数量失败');
                                    }
                                });
                            }


                            if(currentHonor.indexOf(5) == -1){
                                ScoreController.scoreByUserId(userId,1,function(resultUserScore){
                                    if(resultUserScore.result){

                                        let continuous = "";
                                        let arr = resultUserScore.body;

                                        arr.forEach(function(value,key){
                                            if(arr[key+1] != undefined) {
                                                continuous += moment(value.createTime).diff(arr[key+1].createTime,'day').toString();

                                            }
                                        });

                                        //判断是否存在两个-1 存在的话就是连续两天射箭了.
                                        if(continuous.indexOf("-1-1-") != -1){
                                            createHonor({honorId:5,honorType:1,sort:3,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["5"] = true;
                                                    clientHonor.push({honorId:5,honorType:1,sort:3});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    }
                                });
                            }


                            if(currentHonor.indexOf(6) == -1){
                                ScoreController.scoreByUserId(userId,1,function(resultUserScore){
                                    if(resultUserScore.result){

                                        let continuous = "";
                                        let arr = resultUserScore.body;

                                        arr.forEach(function(value,key){
                                            if(arr[key+1] != undefined) {
                                                continuous += moment(value.createTime).diff(arr[key+1].createTime,'day').toString();

                                            }
                                        });

                                        //判断是否存在6个-1 存在的话就是连续七天射箭了.
                                        if(continuous.indexOf("-1-1-1-1-1-1-") != -1){
                                            createHonor({honorId:6,honorType:2,sort:3,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["6"] = true;
                                                    clientHonor.push({honorId:6,honorType:2,sort:3});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                            if(currentHonor.indexOf(7) == -1){
                                ScoreController.scoreByUserId(userId,1,function(resultUserScore){
                                    if(resultUserScore.result){

                                        let continuous = "";
                                        let arr = resultUserScore.body;

                                        arr.forEach(function(value,key){
                                            if(arr[key+1] != undefined) {
                                                continuous += moment(value.createTime).diff(arr[key+1].createTime,'day').toString();

                                            }
                                        });


                                        //判断是否存在6个-1 存在的话就是连续七天射箭了.
                                        if(continuous.indexOf("-1-1-1-1-1-1-1-1-1-1-1-1-1-1-") != -1){
                                            createHonor({honorId:7,honorType:3,sort:3,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["7"] = true;
                                                    clientHonor.push({honorId:7,honorType:3,sort:3});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                            if(currentHonor.indexOf(8) == -1){
                                ScoreController.scoreByUserId(userId,1,function(resultUserScore){
                                    if(resultUserScore.result){

                                        let continuous = "";
                                        let arr = resultUserScore.body;

                                        arr.forEach(function(value,key){
                                            if(arr[key+1] != undefined) {
                                                continuous += moment(value.createTime).diff(arr[key+1].createTime,'day').toString();

                                            }
                                        });

                                        //判断是否存在6个-1 存在的话就是连续七天射箭了.
                                        console.log(continuous);
                                        if(continuous.indexOf("-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-") != -1){
                                            createHonor({honorId:8,honorType:3,sort:4,userId:userId},function(addHonorResult){
                                                if(addHonorResult.result){
                                                    //成功插入成就
                                                    execresult["8"] = true;
                                                    clientHonor.push({honorId:8,honorType:3,sort:4});
                                                } else {
                                                    console.log('验证完好友成就,插入成就时报错');
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                            //小喇叭
                            if(currentHonor.indexOf(12) == -1){
                                if(currentUser.share >= 2){

                                    createHonor({honorId:12,honorType:1,sort:5,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["12"] = true;
                                            clientHonor.push({honorId:12,honorType:1,sort:5});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });



                                }
                            }

                            if(currentHonor.indexOf(13) == -1){
                                if(currentUser.share >= 5){

                                    createHonor({honorId:13,honorType:2,sort:5,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["13"] = true;
                                            clientHonor.push({honorId:13,honorType:2,sort:5});

                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });



                                }
                            }

                            if(currentHonor.indexOf(14) == -1){
                                if(currentUser.share >= 10){

                                    createHonor({honorId:14,honorType:3,sort:5,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["14"] = true;
                                            clientHonor.push({honorId:14,honorType:3,sort:5});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });
                                }
                            }

                            //百矢及的
                            if(currentHonor.indexOf(16) == -1){
                                if(currentUser.arrowCount >= 100){

                                    createHonor({honorId:16,honorType:1,sort:7,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["16"] = true;
                                            clientHonor.push({honorId:16,honorType:1,sort:7});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });



                                }
                            }

                            if(currentHonor.indexOf(17) == -1){
                                if(currentUser.arrowCount >= 1000){

                                    createHonor({honorId:17,honorType:2,sort:7,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["17"] = true;
                                            clientHonor.push({honorId:17,honorType:2,sort:7});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });
                                }
                            }

                            if(currentHonor.indexOf(18) == -1){
                                if(currentUser.arrowCount >= 10000){


                                    createHonor({honorId:18,honorType:3,sort:7,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["18"] = true;
                                            clientHonor.push({honorId:18,honorType:3,sort:7});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });


                                }
                            }

                            //环数
                            if(currentHonor.indexOf(23) == -1){
                                if(currentUser.totalPoint >= 5000){

                                    createHonor({honorId:23,honorType:1,sort:10,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["23"] = true;
                                            clientHonor.push({honorId:23,honorType:1,sort:10});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });


                                }
                            }

                            if(currentHonor.indexOf(24) == -1){
                                if(currentUser.totalPoint >= 10000){

                                    createHonor({honorId:24,honorType:2,sort:10,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["24"] = true;
                                            clientHonor.push({honorId:24,honorType:2,sort:10});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });


                                }
                            }

                            if(currentHonor.indexOf(25) == -1){
                                if(currentUser.totalPoint >= 20000){

                                    createHonor({honorId:25,honorType:3,sort:10,userId:userId},function(addHonorResult){
                                        if(addHonorResult.result){
                                            //成功插入成就
                                            execresult["25"] = true;
                                            clientHonor.push({honorId:25,honorType:3,sort:10});
                                        } else {
                                            console.log('验证完好友成就,插入成就时报错');
                                        }
                                    });


                                }
                            }


                            let finish = false;
                            let interval = setInterval(function() {
                                console.log(execresult);
                                console.log(clientHonor);

                                for(let item in execresult){
                                    if(item){
                                        finish = true;
                                    } else {
                                        finish = false;
                                        break;
                                    }
                                }

                                if(finish){
                                    clearInterval(interval);
                                    callback(resultobjs.createResult(true,null,null,clientHonor));
                                }

                            }, 300);


                            ////B1
                            //if(currentHonor.indexOf('B1') == -1){
                            //    FriendController.getfriend(userId,function(resultFriend){
                            //        if(resultFriend.result){
                            //            if(resultFriend.body.length >= 3){
                            //                //获得此B1成就 关注3名好友
                            //                createHonor({honorType:1,honorId:"B1",userId:userId},function(addHonorResult){
                            //                    if(addHonorResult.result){
                            //                        //成功插入成就
                            //                        clientHonor.push["B1"];
                            //                    } else {
                            //                        console.log('验证完好友成就,插入成就时报错');
                            //                    }
                            //                });
                            //            }
                            //        } else {
                            //            console.log('验证成就时获取好友数量失败');
                            //        }
                            //    });
                            //}
                            //
                            ////B2
                            //if(currentHonor.indexOf('B2') == -1){
                            //    FriendController.getfriend(userId,function(resultFriend){
                            //        if(resultFriend.result){
                            //            if(resultFriend.body.length >= 10){
                            //                //获得此B1成就 关注3名好友
                            //            }
                            //        } else {
                            //            console.log('验证成就时获取好友数量失败');
                            //        }
                            //    });
                            //}
                            //
                            //
                            ////B3
                            //if(currentHonor.indexOf('A3') == -1){
                            //    FriendController.getfriend(userId,function(resultFriend){
                            //        if(resultFriend.result){
                            //            if(resultFriend.body.length >= 30){
                            //                //获得此B1成就 关注3名好友
                            //            }
                            //        } else {
                            //            console.log('验证成就时获取好友数量失败');
                            //        }
                            //    });
                            //}

                            //callback(resultobjs.createResult(true,null,null,clientHonor));

                            //["A1","B1","B2","B3","C1","C2","C3","D1","D2","D3","E1","E2","E3","F1","G1","G2","G3","H1","H2","H3","J1","J2","J3"].forEach(function(honroItem){
                            //
                            //});


                        } else {
                            callback(resultobjs.createResult(false,'SelectUserHonorError',resultHonor.errorMessage));
                        }
                    });

                } else {

                    callback(resultobjs.createResult(false,'SelectUserError',resultUser.errorMessage));
                }
            });
        } else {
            callback(resultobjs.createResult(false,'Required parameter missing','缺少必要信息,用户ID'));
        }
    }
};

