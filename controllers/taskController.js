const Task = require('../models/Task');

exports.addTask = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Please provide name of task" });
    }
    try {
        const newTask = await Task.create(req.body);
        res.status(200).json({ success: true, message: "Add task successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.deleteOne({ name: req.params.name });
        res.json({ success: true, message: "Delete task successfully" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.update({ name: req.params.name }, {$set: req.body});
        res.json({ success: true, message: "Update task successfully" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.find({ name: req.params.name });
        if (!task.length) {
            return res.json({ success: false, message: "No task found" });
        }
        res.json({ success: true, task: task });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

exports.getAdllTask = async (req, res) => {
    try {
        const task = await Task.find();
        if (!task.length) {
            return res.json({ success: false, message: "No task found" });
        }
        res.json({ success: true, task: task });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

