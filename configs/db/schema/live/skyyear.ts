import mongoose from "../../mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    departmentchild: { type: String },      //子部门
    name: { type: String,index: true },                 //员工名
    eid: { type: String ,unique: true,dropDups:true,index: true},                  //员工id
});

export const skyyear = mongoose.model('Skyyear', UserSchema);
