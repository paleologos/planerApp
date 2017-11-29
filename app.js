var express= require("express"),
 bodyParser= require("body-parser"),
 request= require("request"),
 mongoose = require("mongoose"),
 Todo= require("./models/Todo"),
 User= require("./models/user"),
 methodOverride= require("method-override"),
 passport= require("passport"),
 LocalStrategy= require("passport-local"),
 passportLocalMongoose= require("passport-local-mongoose"),
 expressSession= require("express-session"),
 expressSanitizer= require("express-sanitizer"),
 flash= require("connect-flash"),
 middlewareObj= require("./middleware/middleware"),
 taskRoutes= require("./routes/index"),
 authRoutes=require("./routes/authentication"),
 port= process.env.PORT || 3000,
 app = express();


app.use(methodOverride("_method"));

app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.set("view engine", "ejs" );


var dbUrl= process.env.DATABASEURL || "mongodb://localhost/todoTest_db";
mongoose.connect(dbUrl, {useMongoClient:true});



app.use(require("express-session")({
    secret:"Milan je car",
    resave: false,
    saveUninitialized:false
}));

mongoose.Promise=global.Promise;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());

app.use(function(req, res, next){
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    res.locals.info= req.flash("info");
    next();
});

// express router
app.use(taskRoutes);
app.use(authRoutes);



app.listen(port, process.env.IP, function(){
  console.log("SERVER STARTED AT PORT " + port);
});
