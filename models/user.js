var mongoose= require("mongoose");
var Todo= require("./Todo");
var passportLocalMongoose= require("passport-local-mongoose");



// Scnema initializing

var userSchema= new mongoose.Schema({
         firstname:String,
         lastname: String,
         email: String,
         username: String,
         password: String,
//Data referencing
         todos: [
           {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Todo"
           }
         ]
});

//konfiguracija Scheme
userSchema.plugin(passportLocalMongoose);

//eksportovanje
module.exports= mongoose.model("User", userSchema);
