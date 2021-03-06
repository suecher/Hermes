/**
 * Created by Administrator on 2016/5/18.
 */
"use strict";
let JPush = require('../node_modules/jpush-sdk/lib/JPush/JPush');
let client = JPush.buildClient('0873b8d1c7c5ae16a8d7f842','a74443366ae89412d77a57d0');

/**
 *
* @param (发送者姓名)sendname
* @param (接收者ID)receiverId
* @param (内容)content
* @param (客户端类型android or ios)type
*/
module.exports = function(receiverId,content){

    client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.alias(receiverId))
        .setNotification('Hi, JPush', JPush.ios(content, 'happy.caf', 5))
        .send(function(err, res) {

            if (err) {
                console.log(err.message);
            } else {
                console.log('Sendno: ' + res.sendno);
                console.log('Msg_id: ' + res.msg_id);
            }
        });
};