/**
 * Created by Administrator on 2016/3/11.
 */
"use strict";
var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
    userId:String,
    friendId:String,
    createTime:{Type:Date,default:Date.now()}
});


var Friend = mongoose.model('Friend',FriendSchema);