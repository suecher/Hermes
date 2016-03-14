/**
 * Created by Administrator on 2016/3/14.
 */

var mongoose = require('mongoose');

var FriendRequestSchema = new mongoose.Schema({
    userId:String,
    friendId:String,
    createTime:{Type:Date,default:Date.now()},
    content:String
});