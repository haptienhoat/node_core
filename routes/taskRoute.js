const express = require('express');
const router = express.Router();
const {addTask, deleteTask, updateTask, getAdllTask, getTask} = require('../controllers/taskController');

router.get('/get/:name', getTask);
router.get('/getall', getAdllTask);
router.post('/add', addTask);
router.patch('/update/:name', updateTask);
router.delete('/delete/:name', deleteTask);

module.exports = router;