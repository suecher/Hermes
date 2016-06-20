/**
 * Created by Administrator on 2016/5/23.
 */

"use strict";

let mongoose = require('mongoose');
let ClubManager = mongoose.model('ClubManager');

let resultobj = require('../models/result.server.model');

module.exports = {
    create:function(clientmanager,callback){
        if(clientmanager.name &&
        clientmanager.username &&
        clientmanager.password)
        {
            let clubmanager = ClubManager(clientmanager);
            clubmanager.save(function(err){
                if(err){
                    callback(resultobj.createResult(false,'AddClubManager','增加俱乐部管理人员的时候报错'));
                    return;
                }

                callback(resultobj.createResult(true,null,null,clubmanager));
            })
        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要参数,俱乐部的联系方式与密码和姓名'));
        }
    },
    /**
     * 俱乐部端的登录
     * @param clientuser
     * @param callback
     */
    login:function(clientuser,callback){
        if(clientuser.username || clientuser.password){
            ClubManager.findOne({username:clientuser.username,password:clientuser.password},function(err,doc){
                if(err){
                    callback(resultobj.createResult(false,'LoginSystemError','增加俱乐部管理人员的时候报错'));
                    return;
                }

                if(doc){
                    callback(resultobj.createResult(true,null,null,doc));
                } else {
                    callback(resultobj.createResult(false,"DataNotExist","查询的数据不存在,登陆失败"));
                }
            });

        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要参数,俱乐部管理者的用户名以及密码'));
        }
    }
};