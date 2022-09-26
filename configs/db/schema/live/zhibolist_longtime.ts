import mongoose from "../../mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    zhiboid: { type: String,index: true },
    eid: { type: String ,index: true },
    fullName: { type: String ,index: true },
    name: { type: String ,index: true },
    userType: { type: String,default: "0"  ,index: true },
    organizationId: { type: String ,index: true },
    departmentId: { type: String,index: true  },
    entryTime: { type: String ,index: true },
    levelTime: { type: String,index: true  },
    durationTime: { type: String ,index: true },
    terminalType: { type: String,index: true  },
    updateTime:{type: String,default: "",index: true },
    visitIp: { type: String ,default: "",index: true },
});
UserSchema.index({
    zhiboid: 1,
    eid: 1
  }, {unique: true});

export const zhibolist_longtime = mongoose.model('zhibolist_longtime', UserSchema);
