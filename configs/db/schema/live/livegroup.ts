import mongoose from "../../../../configs/db/mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    branch: { type: Array },
    department: { type: Array },
    departmentchild: { type: Array },
    name: { type: Array },
    groupname: { type: String },
});

export const livegroup = mongoose.model('livegroup', UserSchema);
