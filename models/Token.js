const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userid: {type: Schema.Types.ObjectId, required: true},
    access: {type: String, required: true},
    refresh: {type: String, required: true}
},
{
    timestamps: true,
});

module.exports = mongoose.model('Token', tokenSchema);