const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { verifyToken } = require('../auth/auth');

router.get('/', verifyToken, categoriesController.getCategories);
router.post('/', verifyToken, categoriesController.createCategory);
router.delete('/:id', verifyToken, categoriesController.deleteCategory);

module.exports = router;
