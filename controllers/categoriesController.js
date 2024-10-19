const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id });
        return res.status(200).json({ success: true, categories });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching categories', error });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ success: false, message: 'Category name is required' });
        }

        const newCategory = new Category({
            categoryName,
            userId: req.user.id,
        });

        await newCategory.save();
        return res.status(201).json({ success: true, message: 'Category created successfully', category: newCategory });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating category', error });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findOneAndDelete({ categoryId, userId: req.user.id });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found or unauthorized' });
        }

        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error deleting category', error });
    }
};
