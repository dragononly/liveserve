import mongoose from "../../mongo";

var Schema = mongoose.Schema;

var TestSchema = new Schema({
    name: { type: String },
    test: { type: String },

});

export const test = mongoose.model('test', TestSchema);
