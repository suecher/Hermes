/**
 * Created by SueCh on 2016/3/23.
 */

var UploadFileControllers = require('../../config/upload');

module.exports = function(app){
   app.route('/uploadfile')
       .post(function(req,res){
           UploadFileControllers.uploadprofile(req,function(resultobj){
                res.json(resultobj);
           });
       });
};