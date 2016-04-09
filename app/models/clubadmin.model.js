/**
 * Created by Administrator on 2016/4/7.
 */

"use strict";

let mongoose = require('mongoose');

//俱乐部管理人员
let ClubAdmin = new mongoose.Schema({
    username:String,
    password:String
});