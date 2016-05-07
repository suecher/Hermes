/**
 * Created by Administrator on 2016/4/9.
 */
"use strict";

let moment = require('moment');



//setInterval(function(){
//    console.log(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss Z"));
//    console.log(new Date().Format('yyyy-MM-dd HH:mm:ss'));
//},1000);


//console.log(new Date().toGMTString());
//console.log(moment(new Date()).format("YYYY-MM-DD HH:mm Z").toString());
//console.log(new Date("2016-04-09T15:52:20.000Z").toLocaleString());


console.log(moment(moment.utc()).format('YYYY-MM-DD HH:mm Z'));


var a = moment([2007, 0, 28]);
var b = moment([2007, 0, 29]);


console.log(moment("2010-1-1"));

console.log(a.to(b));