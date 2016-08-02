/**
 * Created by Administrator on 2016/3/8.
 */
"use strict";
let ClubControllers = require('../controllers/club.server.controller');

module.exports = function(app){
    app.route('/clublist')
        .post(function(req,res,next){

        });

    app.route('/clubbycity')
        .post(function(req,res,next){
            var cityId =req.body.cityId;
            var pagination = req.body.pagination;
            ClubControllers.listByCity(cityId,pagination,function(resultobjs){

                ClubControllers.clubBaxin(function(baxin){

                    if(pagination.pageNo == 1){
                        resultobjs.body.push(baxin);

                    }

                    res.json(resultobjs);

                });

                //console.log(req.body.pagination);
                //if(pagination.pageNo == 1){
                //    resultobjs.body.push({
                //        "_id" : "000000000000000000000001",
                //        "name" : "靶心训练营",
                //        "logo" : "",
                //        "pictureList" : [],
                //        "address" : "湖南靶心科技",
                //        "province" : 0,
                //        "city" : 0,
                //        "district" : 0,
                //        "summary" : "",
                //        "phone" : "",
                //        "cphone" : "",
                //        "cperson" : "",
                //        "houseSize" : 120,
                //        "arrowRoadSize" : 7,
                //        "wifi" : 1,
                //        "parking" : 1,
                //        "followSize" : 0,
                //        "memberSize" : 0
                //    });
                //}


            });
        });


    app.route('/clubupdate')
        .post(function(req,res){
            let clubId = req.body.clubId;
            let updateObj = req.body.obj;

            ClubControllers.clubByUpdate(clubId,updateObj,function(result){
                res.json(result);
            });

        });

    /**
     * 用于管理端根据ID获取俱乐部信息
     */
    app.route('/clubbyid')
        .post(function(req,res){
            let clubId = req.body.clubId;
            ClubControllers.clubById(clubId,function(resultobjs){
                res.json(resultobjs);
            });
        });


    /**
     * 用于删除俱乐部的的展示图片
     */
    app.route('/removeclubpic')
        .post(function(req,res){
            let clubId = req.body.clubId;
            let picId = req.body.picId;

            ClubControllers.removeClubPic(clubId,picId,function(result){
                res.json(result);
            });
        });

    /**
     * 添加俱乐部
     */
    app.route('/addclub')
        .post(function(req,res,next){
            var clientclub = req.body;
            ClubControllers.create(clientclub,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/clubbyname')
        .post(function(req,res){
            ClubControllers.clubByName(req.body.clubName,function(resultobjs){
                res.json(resultobjs);
            });
        });

    //按省份查找俱乐部
    app.route('/clubbyprovince')
        .post(function(req,res,next){
            var provinceId=req.body.province;
            ClubControllers.listByprovince(provinceId,function(resultobjs){
                res.json(resultobjs);
            });
        });
};