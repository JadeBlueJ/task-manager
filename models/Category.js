const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema(
  {  
    categoryName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
