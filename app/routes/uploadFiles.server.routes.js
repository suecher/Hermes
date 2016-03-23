/**
 * Created by SueCh on 2016/3/23.
 */

var UploadFileControllers = require('../../config/upload');

module.exports = function(app){
   app.route('/uploaduserprofile')
       .post(function(req,res){
           UploadFileControllers.uploadprofile(req.body.userId,req,function(rusultobj){
                res.json(resultobj);
           });
       });
}