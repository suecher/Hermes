"use strict";

let mongoose = require('mongoose');

let AdvertSchema = new mongoose.Schema({
    clubId:String,
    city:Number,
    url:String,
    type:Number,//1为俱乐部通知 2为平台通知
    picture:String,
    createTime:Date
});

let Advert = mongoose.model('Advert',AdvertSchema);