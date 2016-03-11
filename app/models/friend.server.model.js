/**
 * Created by Administrator on 2016/3/11.
 */
"use strict";
var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
    userId:String,
    friendId:String
});


var Friend = mongoose.model('Friend',FriendSchema);