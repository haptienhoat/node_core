const express = require('express');
const router = express.Router();
const {addTask, deleteTask, updateTask, getAdllTask, getTask} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/verifyToken')

router.get('/get/:name', verifyToken, getTask);
router.get('/getall', verifyToken, getAdllTask);
router.post('/add', verifyToken, addTask);
router.patch('/update/:name', verifyToken, updateTask);
router.delete('/delete/:name', verifyToken, deleteTask);

module.exports = router;