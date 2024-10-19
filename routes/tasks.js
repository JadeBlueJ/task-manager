const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks
} = require('../controllers/tasksController');
const { verifyToken } = require('../auth/auth');

const router = express.Router();


router.get('/', verifyToken, getTasks);
router.get('/all', verifyToken, getAllTasks)
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
