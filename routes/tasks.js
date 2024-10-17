const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasksController');
const { verifyToken } = require('../auth/auth');

const router = express.Router();


router.get('/tasks', verifyToken, getTasks);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;
