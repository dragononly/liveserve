import mongoose from "../../mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    branch: { type: String,index: true },                //分所
    department: { type: String,index: true },           //部门
    departmentchild: { type: String,index: true },      //子部门
    name: { type: String,index: true },                 //员工名
    eid: { type: Object },                  //员工id
    rank_id: { type: String,index: true },              //排行榜
    login_id: { type: String,index: true },              
    login_password: { type: String,index: true },              
});

export const skyuser = mongoose.model('Skyuser', UserSchema);
