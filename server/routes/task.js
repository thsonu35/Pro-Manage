const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    createTask,
    getTasksForUser,
    updateTask,
    deleteTask,
    shareTask
} = require('../controller/task');

router.post('/tasks', auth, createTask);
router.get('/tasks', auth, getTasksForUser);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);
router.get('/share/:id', shareTask); // Assuming sharing doesn't require authentication

module.exports = router;
