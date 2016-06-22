
"use strict";

let JPush = require('../node_modules/jpush-sdk/lib/JPush/JPush');
let client = JPush.buildClient('0873b8d1c7c5ae16a8d7f842','a74443366ae89412d77a57d0');

client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.alias("575cd404c3ec825d1ed467d4"))
    .setNotification('Hi, JPush', JPush.ios('哈哈哈哈 Sender Scan', 'happy.caf', 5))
    .send(function(err, res) {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
        }
    });
