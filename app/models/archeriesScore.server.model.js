/**
 * Created by Administrator on 2016/3/7.
 */
"use strict";
var mongoose = require('mongoose');

var ArcheriesScoreSchema = new mongoose.Schema({
    userId:String,//用户ID
    arrowRoadStandard:Number,//箭道的规格
    bowType:Number,   //弓类型
    arrowCount:Number,//箭组的数量
    clubId:String,//俱乐部ID
    picture:String,//射箭结果图片
    avgeragePoint:Number,//平均环数,
    totalPoint:Number,//总环数,
    scoreType:Number,//成绩类型 1.普通射箭成绩 2.挑战成绩
    equipId:String,//我的装备ID
    bullseye:{type:Number,default:0},//射中靶心数
    createTime:{type:Date,deault:Date.now()},//记录创建时间
    archeryList:Object,//每一箭的环数
    isAffirm:{type:Boolean,default:true},//是否需要审核
    isAffirmOver:Boolean,default:false//是否已经审核
});

var ArcheriesScore = mongoose.model('ArcheriesScore',ArcheriesScoreSchema);