/**
 * Created by SueCh on 2016/4/6.
 */

"use strict";

let mongoose = require('mongoose');

let ClubFollowSchema = new mongoose.Schema({
    clubId:String,
    userId:String,
    createTime:{type:Date,default:Date.now()}
});

let ClubFollow = mongoose.model('ClubFollow',ClubFollowSchema);

