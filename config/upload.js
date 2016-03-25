/**
 * Created by SueCh on 2016/3/22.
 */
"use strict";

var multiparty = require('multiparty');
var config = require('./config');
var resultobj = require('../app/models/result.server.model');
var fs = require('fs');
var path = require('path');

var uuid = require('node-uuid');

var userpath = config.usersPicture +"temp/";

module.exports = {
     /**
      * * @description
     * @param{String} userId
     * @param{Object.客户端请求对象} req
     * @param{Function} callback
     * */
    uploadprofile:function(userId,req,callback){

         var folder_exists = fs.existsSync(userpath);
         if(!folder_exists){
             fs.mkdirSync(userpath);
         }

        var form = new multiparty.Form({uploadDir:userpath});
        form.parse(req,function(err,filds,files){
            var filesTmp = JSON.stringify(files,null,2);

            //console.log(filesTmp);

            if(err){
                callback(resultobj.createResult(false,'UploadUserPictrueError.Uploading',err));
            } else {
                console.log('ares files:' + filesTmp);
                var inputFile = files.inputFile[0];
                var uploadedPath = inputFile.path;
                var dstPath = config.usersPicture + inputFile.originalFilename;

                fs.rename(uploadedPath,dstPath,function(err){
                    if(err){
                        console.log('rename error:' + err);
                        callback(resultobj.createResult(false,'UploadUserPictrueError.SaveFile.',err));
                    } else {
                        console.log('rename ok');
                        callback(resultobj.createResult(true,null,null,{userId:userId,userPictrue:dstPath}));
                    }
                });
            };
        });
    }
};