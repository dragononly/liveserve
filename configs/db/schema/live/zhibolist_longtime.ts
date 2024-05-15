import mongoose from 'mongoose';


var Schema = mongoose.Schema;

var UserSchema = new Schema({
    zhiboid: { type: String },
    eid: { type: String  },
    fullName: { type: String  },
    name: { type: String },
    userType: { type: String,default: "0" },
    organizationId: { type: String },
    departmentId: { type: String},
    entryTime: { type: String  },
    levelTime: { type: String},
    durationTime: { type: String },
    terminalType: { type: String},
    updateTime:{type: String,default: ""},
    visitIp: { type: String ,default: ""},
});
UserSchema.index({
    zhiboid: 1,
    eid: 1
  }, {unique: true});

export const zhibolist_longtime = mongoose.model('zhibolist_longtime', UserSchema);
