import mongoose from "../../../../configs/db/mongo";

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, default: "默认直播名" ,index: true },
    starttime: { type: Object, default: ["2008-09-01 17:28", ["2008-09-01 17:28"]] },
    realStartTime:{ type: String, default: "" ,index: true },
    realEndTime:{ type: String, default: "",index: true  },
    group: { type: Object, default: ["所有人"] },
    power: { type: Object, default: [true, true] },
    signtime: { type: Object, default: [] },
    usersign: { type: Object, default: [] },
    like: { type: Object, default: [] },
    url: { type: String, default: "https://wowza.peer5.com/live/smil:bbb_abr.smil/playlist.m3u8",index: true  },
    ask: { type: Array, default: [] ,index: true },
    a: { type: Number, default: 0 ,index: true },
    b: { type: Number, default: 0 ,index: true },
    c: { type: Number, default: 0 ,index: true },
    d: { type: Number, default: 0 ,index: true },
    signContinueTime: { type: String, default: "60" ,index: true },
    status: { type: String, default: "直播等待" ,index: true },
    backurl: { type: String, default: "等待回传" ,index: true },
    videolongtime: { type: String, default: "0" ,index: true },
    onlinePeople: { type: Number, default: 0 ,index: true },
});


export const zhibolist = mongoose.model('zhibolist', UserSchema);
