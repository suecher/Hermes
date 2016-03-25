/**
 * Created by Administrator on 2016/3/8.
 */

var mongodb = require('../config/mongoose');

var fs = require('fs');
var path =require('path');
var uuid = require('node-uuid');

var str = "../public/users/0001";
var pathtmp="";

for(d in str.split('/')){
    //console.log(typeof );
    pathtmp += str.split('/')[d]+"/";
    console.log(pathtmp);
    //fs.mkdirSync(pathtmp);
    //console.log(fs.existsSync(str.split('/')[d]));

}

console.log(fs.existsSync('.'));