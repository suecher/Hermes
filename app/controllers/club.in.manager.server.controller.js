/**
 * Created by Administrator on 2016/6/8.
 */
"use strict";

let mongoose = require('mongoose');
let ClubInManager = mongoose.model('ClubInManager');

let resultobj = require('../models/result.server.model');

module.exports = {
    getClub:function(managerId,callback){
        if(managerId){

        } else {
            callback(resultobj.createResult(false,'Required parameter missing','缺少必要参数,缺少管理者的ID信息'));
        }
    }
};