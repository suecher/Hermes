/**
 * Created by Administrator on 2016/6/8.
 */
"use strict";

let mongoose = require('mongoose');
let ClubInManagerSchema = new mongoose.Schema({
    managerId:String,
    clubId:String
});

let ClubInManager = mongoose.model('ClubInManager',ClubInManagerSchema);