/**
 * Created by Administrator on 2016/3/14.
 */
"use strict";

var mongoose = reqire('mongoose');

var HonorByUserSchema = new mongoose.Schema({
    honorType:Number,
    honorId:Number,
    userId:String,
    level:{Type:Number,default:0},
    createTime:{Type:Date,default:Date.now()}
});

var HonorByUser = mongoose.model('HonorByUser',HonorByUserSchema);