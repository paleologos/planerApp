var middlewareObj={};


middlewareObj.isLoggedIn= function(req, res, next){
  if(req.isAuthenticated()){
    return next();

  }
  req.flash.error= "Морате бити улоговани";
  res.redirect("/");
}


module.exports=middlewareObj;
