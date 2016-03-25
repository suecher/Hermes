/**
 * Created by Administrator on 2016/3/23.
 */

"use strict";

var fs = require('fs');

if(!fs.existsSync('../public/')) {
    fs.mkdirSync('../public/');
}

if(!fs.existsSync('../public/files/')) {
    fs.mkdirSync('../public/files/');
}

if(!fs.existsSync('../public/files/clubs')) {
    fs.mkdirSync('../public/files/clubs');
}

if(!fs.existsSync('../public/files/users')) {
    fs.mkdirSync('../public/files/users');
}

console.log('initialization finish');