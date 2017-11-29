var express= require("express"),
    passport= require("passport"),
    User= require("../models/user"),
    middlewareObj=require("../middleware/middleware"),
    router=express.Router();




    // signup new user
    router.post("/newuser", function(req, res){
      var firstname= req.body.firstname;
      var lastname= req.body.lastname;
      var email= req.body.email;
      var username= req.body.username;
      var password= req.body.password;

      User.register(new User({username:username, firstname:firstname, lastname:lastname, email:email}), password, function(err, userCreated){
        if(err){
              req.flash("error", err);
              return res.render("index");
        }
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Успешно креирање налога");
              res.redirect("/tasks");
        });
      });
    });

    router.get("/tasks/:id",  middlewareObj.isLoggedIn, function(req, res){
      var user= req.user;
              res.render("profile", {user:user});
    });

    // login existing user
    router.post("/", passport.authenticate("local", {
      successRedirect: "/tasks",
      failureRedirect: "/"
    }), function(req, res){

    });

    //logout

    router.get("/logout", function(req, res){
      req.logout();
      req.flash("error", "Успешно сте излоговани");
      res.redirect("/");
    });






    module.exports= router;
