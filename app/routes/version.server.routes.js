/**
 * Created by Administrator on 2016/8/2.
 */

"use strict";

let ios = require("../../config/ios.version.json");
let android =require("../../config/android.version.json");

module.exports = function(app){
    app.route('/version/android')
        .get(function(req,res){
            res.json(android);
        });

    app.route('/version/ios')
        .get(function(req,res){
            res.json(ios);
        });
};

