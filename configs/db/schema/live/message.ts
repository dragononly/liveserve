import mongoose from "../../../../configs/db/mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: { type: String,index: true },          //用户
    eid: { type: String,index: true },           //员工号
    message: { type: String,index: true },       //消息
    type: { type: String,index: true },          //类型
    zhiboid: { type: Object },       //直播id
});

export const message = mongoose.model('Message', UserSchema);
