const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { verifyToken } = require('../auth/auth'); 

router.get('/categories', verifyToken, categoriesController.getCategories);
router.post('/categories', verifyToken, categoriesController.createCategory);
router.delete('/categories/:id', verifyToken, categoriesController.deleteCategory);

module.exports = router;
