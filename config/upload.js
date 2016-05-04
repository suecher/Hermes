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

var userpath = __dirname +"/../"+ config.tempfolder;

module.exports = {
     /**
      * * @description
     * @param{String} userId
     * @param{Object.客户端请求对象} req
     * @param{Function} callback
     * */
    uploadprofile:function(req,callback){

         var folder_exists = fs.existsSync(userpath);
         if(!folder_exists){
             fs.mkdirSync(userpath);
         };

        var form = new multiparty.Form({uploadDir:userpath});
            form.maxFilesSize = 2 * 1024 * 1024;
            form.uploadDir = userpath;
            form.parse(req,function(err,filds,files){

            var filesTmp = JSON.stringify(files,null,2);

            if(err){
                console.log(err);
                callback(resultobj.createResult(false,'UploadUserPictrueError.Uploading',err));
                return;
            } else {
                //console.log('ares files:' + filesTmp);
                //确认 Content-Disposition: form-data; name="fieldNameHere"; filename="filename" 文件名
                if(files.inputFile){
                    var inputFile = files.inputFile[0];
                    var extname = path.extname(inputFile.originalFilename).toLowerCase();

                    if( extname != '.png' && extname != '.jpg' && extname != '.jpeg'){
                        callback(resultobj.createResult(false,'UploadfileNotPictrue'));
                        return;
                    }

                    let uploadedPath = inputFile.path;
                    let filename = uuid.v4() + extname;
                    let dstPath = userpath + filename;

                    fs.rename(uploadedPath,dstPath,function(err){
                        if(err){
                            console.log('rename error:' + err);
                            callback(resultobj.createResult(false,'UploadUserPictrueError.SaveFile.',err));
                        } else {
                            console.log('rename ok');
                            callback(resultobj.createResult(true,null,null,{filename:filename}));
                        }
                    });
                } else {
                    callback(resultobj.createResult(false,'Content-Disposition.SetError.','Content-Disposition设置错误name=inputFile'));
                }
            };
        });
    }
};
