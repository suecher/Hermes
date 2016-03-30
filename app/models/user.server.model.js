/**
 * Created by Administrator on 2016/3/2.
 */
"use strict";
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    name:String,//用户的昵称
    username:String,//用户名
    mobile:String,//手机号码
    password:String,//密码
    currency:{type:Number,default:0},//货币
    email:String,//邮件
    gender:String,//性别
    status:{type:Number,deault:1},//状态  0.停用 1正常使用 3冻结
    birthday:{type:Date,deault:Date.now()},//生日
    province:Number,//省份
    city:Number,//城市
    picture:String,//头像
    backgroundPic:Object,//背景图
    mood:String,//个人签名
    accountVersion:String,//版本
    clubId:String, //所属箭管
    arrowCount:String,//总箭数
    victory:{type:Number,default:0},//胜利次数
    defeated:{type:Number,default:0},//失败次数
    avgeragePoint:String,//平均环
    totalPoint:String,//总环
    challengeNum:Number, //挑战次数
    Refusing:Number,//拒绝挑战的次数
    rankPoint:String,//排名成绩
    visibleGrade:Boolean, //是否可以看成绩
    defaultArrowCount:Number,//默认箭数
    defaultArrowRoad:Number,//默认使用的箭道长度
    lastArcheryTime:{type:Date,default:Date.now()},//最后一次射箭的时间(记录成绩的时间)
    createTime:{type:Date,default:Date.now()},//创建用户的时间
    updateLast:{type:Date,deault:Date.now()}//最后更新资料的时间
});

var User = mongoose.model('User',UserSchema);