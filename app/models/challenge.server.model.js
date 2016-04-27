/**
 * Created by SueCh on 2016/4/21.
 */
"use strict";

let mongoose = require('mongoose');
let ChallengeSchema = mongoose.Schema({
        userId:String,
        rivalId:String,
        userScoreId:{type:String,default:""},
        rivalScoreId:{type:String,default:""},
        arrowCount:Number,
        arrowRoad:Number,
        draw:{type:Boolean,default:false},
        finish:{type:Number,default:false},
        createTime:Date
});

let Challenge = mongoose.model('Challenge',ChallengeSchema);