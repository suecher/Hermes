/**
 * Created by SueCh on 2016/5/5.
 */
"use strict";

/**
 * Created by Administrator on 2016/5/5.
 */

"use strict";
var moment = require('moment');
var a = moment("2015-01-26");
var b = moment([2011,0,12]);

var arr = ["2016-04-04","2016-04-04","2016-04-04","2016-04-04","2016-04-05"];

arr.forEach(function(key,value){

    //if(arr[value+1] != undefined) {
    //    if(moment(key).diff(arr[value+1],'day') == -1){
    //        if(arr[value+2] != undefined){
    //            console.log('连续两天');
    //            if(moment(key).diff(arr[value+2],'day') == -1){
    //                if(arr[value+3] != undefined){
    //                    console.log('连续3天');
    //                }
    //            }
    //        }
    //    }
    //}

    if(arr[value+1] != undefined) {
        console.log(moment(key).diff(arr[value+1],'day'));
    }
});

//console.log(a.diff(b,'day'));
//console.log(a.format('YYYY-MM-DD'));