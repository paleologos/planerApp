var mongoose = require("mongoose");

var todoSchema= new mongoose.Schema({
          category: String,
          date: Date,
          task: String
});

module.exports= mongoose.model("Todo", todoSchema);
