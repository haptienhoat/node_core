const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String, required: true},
    is_done: {type: Boolean, default: false}
},
{
    timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);