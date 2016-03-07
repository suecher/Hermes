/**
 * Created by SueCh on 2016/3/6.
 */

var mongoose = require('mongoose');

var ClupsSchema = new mongoose.Schema({
    name: String,
    address: String,
    latlng: String,
    cperson: String,
    cphone: String,
    phone: String,
    province: String,
    city: String,
    summary: String,
    arrow_road_size: Number,
    house_size: Number,
    follow_size: Number,
    member_size: Number,
    operator_id: String,
    status: Number,
    picture: String,
    wifi: Boolean,
    parking: Boolean,
    created_time: {type: Date, default: Date.now()},
    updated_time: {type: Date, default: Date.now()}
});