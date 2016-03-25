/**
 * Created by SueCh on 2016/3/23.
 */

var UploadFileControllers = require('../../config/upload');

module.exports = function(app){
   app.route('/uploaduserprofile')
       .get(function(req,res){
           res.send({"username":'scan'});
           //res.sendfile('../public/index.html');
       })
       .post(function(req,res){
           console.log(req);
           //UploadFileControllers.uploadprofile('0001',req,function(resultobj){
           //     res.json(resultobj);
           //});
           res.send('1');
       });
};