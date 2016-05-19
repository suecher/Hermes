
"use strict";

let JPush = require('../node_modules/jpush-sdk/lib/JPush/JPush');
let client = JPush.buildClient('4e574e461ac7fa090024c3da','b98272efe233b07b07690df5');

client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.ALL)
    .setNotification('Hi, JPush', JPush.ios('哈哈哈哈 Sender Scan', 'happy.caf', 5))
    .send(function(err, res) {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
        }
    });
