const mongoose = require("mongoose");

//define a theme schema for the database
const ThemeSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("theme", ThemeSchema);