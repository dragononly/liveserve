import mongoose from "../../../../configs/db/mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: { type: String},          //用户
    eid: { type: String },           //员工号
    message: { type: String },       //消息
    type: { type: String },          //类型
    zhiboid: { type: String,index: true  },       //直播id
});

export const message = mongoose.model('Message', UserSchema);
