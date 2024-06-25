const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priority: { type: String, required: true, enum: ['HIGH', 'MODERATE', 'LOW'] },
    checklist: { type: [String], required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
