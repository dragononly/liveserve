import mongoose from "../../mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    branch: { type: String},                //分所
    department: { type: String},           //部门
    departmentchild: { type: String },      //子部门
    name: { type: String,index: true },                 //员工名
    eid: { type: Object,index: true },                  //员工id
    rank_id: { type: String },              //排行榜
    login_id: { type: String,index: true },              
    login_password: { type: String },              
});

export const skyuser = mongoose.model('Skyuser', UserSchema);
