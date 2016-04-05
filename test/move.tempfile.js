/**
 * Created by Administrator on 2016/4/5.
 */
"use strict";


var config = require('../config/config');
var fs = require('fs');
var path = require('path');

//var folder_exists = fs.existsSync();


var temppath = config.tempfolder;

var folder_exists = fs.existsSync("../" + temppath + "5179faca-5d0a-4190-a22d-4266dfb756cd.png");

if(!fs.existsSync("../" + config.usersPicture + "0001")){
    fs.mkdirSync("../" + config.usersPicture + "0001");
}

fs.rename("../" + temppath + "5179faca-5d0a-4190-a22d-4266dfb756cd.png","../" + config.usersPicture + "0001"+"/5179faca-5d0a-4190-a22d-4266dfb756cd.png",function(err){
    if(err){
        console.log(err);
        return;
    }
});


console.log(folder_exists);
console.log(temppath + "5179faca-5d0a-4190-a22d-4266dfb756cd.png");
