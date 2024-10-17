
const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const { status, category } = req.query;
  try {
    const query = { user: req.user.id }; 
    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }

    const tasks = await Task.find(query).populate('category'); 
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, dueDate, category } = req.body;

  const newTask = new Task({
    title,
    description,
    status,
    dueDate,
    category,
    user: req.user.id 
  });

  try {
    const savedTask = await newTask.save();
    return res.status(201).json({ success: true, task: savedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate, category } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { taskId: id, user: req.user.id },
      { title, description, status, dueDate, category },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ taskId: id, user: req.user.id });

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
