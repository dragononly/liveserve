import mongoose from "../../mongo";

var Schema = mongoose.Schema;

var AutoSchema = new Schema({
    name: { type: Number },
    test: { type: Number },
    arr: { type: Array },
    arr2: { type: Array }

});

export const auto = mongoose.model('Auto', AutoSchema);
