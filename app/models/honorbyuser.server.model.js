/**
 * Created by Administrator on 2016/3/14.
 */
"use strict";

var mongoose = require('mongoose');

var HonorByUserSchema = new mongoose.Schema({
    honorType:Number,
    honorId:Number,
    describe:String,
    userId:String,
    level:{Type:Number,default:0},
    createTime:{type:Date,default:Date.now()}
});

var HonorByUser = mongoose.model('HonorByUser',HonorByUserSchema);