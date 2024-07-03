const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    moveTask,
    createTask,
    getTasksForUser,
    updateTask,
    deleteTask,
    shareTask,
    updateChecklistItem
} = require('../controller/task');

router.post('/tasks', auth, createTask);
router.post('/tasks/movetask',auth,moveTask);
router.get('/tasks', auth, getTasksForUser);
router.put('/tasks/:taskId/checklist/:index', auth, updateChecklistItem);

router.put('/update/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);
router.get('/share/:id', shareTask); // Assuming sharing doesn't require authentication

module.exports = router;
