/**
 * Created by SueCh on 2016/3/6.
 */

"use strict";
var mongoose = require('mongoose');

var ClupsSchema = new mongoose.Schema({
    name: String, //俱乐部名称
    address: String, //俱乐部地址
    latlng: String,//坐标
    cperson: String,//内部联系人
    currency:Number,//货币
    cphone: String,//联系电话
    phone: String,//箭馆电话
    province: Number,//省份
    city: Number,//城市
    district:Number,//城市地区
    summary: String,//介绍信息
    arrowRoadSize: Number,//箭道数量
    houseSize: Number,//场地面积
    followSize: Number,//关注人数
    memberSize: Number,//会员数量
    operatorId: String,//操作人
    status: Number,//状态
    picture: String,//箭馆的场馆照片
    wifi: Boolean,//是否有WIFI
    parking: Boolean,//是否有停车场
    multipleShopId:String,//连锁店ID
    multipleBit:Boolean,//是否是连锁店
    createdTime: {type: Date, default: Date.now()},//创建时间
    updatedTime: {type: Date, default: Date.now()}//最后更新信息的时间
});

var Clups = mongoose.model('Clups',ClupsSchema);