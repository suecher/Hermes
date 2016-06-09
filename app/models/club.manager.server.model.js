/**
 * Created by Administrator on 2016/5/23.
 */
"use strict";

let mongoose = require('mongoose');
let ClubManagerSchema = new mongoose.Schema({
    name:String,
    password:String,
    username:String,
    clubId:String
});

let ClubManager = mongoose.model('ClubManager',ClubManagerSchema);