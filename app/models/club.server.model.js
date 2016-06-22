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
    currency:{type:Number,default:0},//货币
    cphone: String,//联系电话
    phone: String,//箭馆电话
    province: Number,//省份
    city: Number,//城市
    district:Number,//城市地区
    logo:{type:String,default:""},//LOGO地址
    summary: String,//介绍信息
    arrowRoadSize: Number,//箭道数量
    houseSize: Number,//场地面积
    followSize: {type:Number,default:0},//关注人数
    memberSize: {type:Number,default:0},//会员数量
    operatorId: String,//操作人
    status: {type:Number,default:1},//状态 //0关闭 1开业 2停业
    pictureList:[],//图片列表
    wifi: {type:Boolean,default:false},//是否有WIFI
    parking: Boolean,//是否有停车场
    multipleShopId:String,//连锁店ID
    multipleBit:Boolean,//是否是连锁店
    saloon:{type:Boolean,default:false},//是否有茶座酒吧等休闲区域
    coach:{type:Boolean,default:false},//是否提供教练服务
    createdTime: {type: Date, default: Date.now()},//创建时间
    updatedTime: {type: Date, default: Date.now()}//最后更新信息的时间
});

var Clups = mongoose.model('Clups',ClupsSchema);