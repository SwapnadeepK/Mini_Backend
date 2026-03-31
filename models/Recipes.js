const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String },
  ingredients: [{ type: String }],
  directions: [{ type: String }],
  link: { type: String },
  source: { type: String },
  NER: [{ type: String }]
});

module.exports = mongoose.model('Recipe', recipeSchema);
// This schema defines the structure of a recipe document in MongoDB.
// It includes fields for title, ingredients, directions, link, source, and NER (Named Entity Recognition).
// Each field is defined with its type, and the model is exported for use in other parts of the application.