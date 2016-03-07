/**
 * Created by Administrator on 2016/3/2.
 */
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    name:String,
    mobile:String,
    password_digest:String,
    email:String,
    gender:String,
    status:Number,
    birthday:{type:Date,deault:Date.now()},
    province:String,
    city:String,
    picture:String,
    mood:String,
    account_version:String,
    clups_id:String, //所属箭管
    arrow_count:String,
    avgerage_point:String,
    total_point:String,
    rank_point:String,
    visible_grade:Boolean, //是否可以看成绩
    default_arrow_count:Number,
    default_arrow_road:Number,
    last_archery_time:{type:Date,default:Date.now()},
    create_time:{type:Date,default:Date.now()},
    update_last:{type:Date,deault:Date.now()}
});