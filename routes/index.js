var express= require("express"),
    User=require("../models/user"),
    Todo= require("../models/Todo"),
    middlewareObj= require("../middleware/middleware"),
    router= express.Router();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var searchedCategory=[];
    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = dd + '.' + mm + '.' + yyyy;

    var searchLen=0;
    var dateSearch=[] ;
    var startDate;
    var endDate;
    var Qtys=[];
    var QtysLength=0;
    var startDateG;
    var categorySearch= "";

    // landing page
    router.get("/", function(req, res){
      res.render("index");
    });

    //show all tasks
    router.get("/tasks", middlewareObj.isLoggedIn, function(req, res){

      var currentUser= req.user;

      var catTotal=0;
      var catNetwork=0;
      var catHardware=0;
      var catSoftware=0;
      var catPrinters=0;
      var catEmail=0;
      var searchTotal=0;
      var startGraphDate=new Date();
      var startDateArray=[];
      var parsedDateArray=[];


      // console.log(startGraphDate)

      User.findById(currentUser._id).populate("todos").exec(function(err, todo){
        var countTodo= todo.todos;
        if(err){
          console.log(err);
        }
        else{



          countTodo.forEach(function(category){
            if(category.category=="Network"){
              catNetwork ++;
            }else if(category.category =="Hardware"){
              catHardware ++;
            } else if(category.category == "Software"){
              catSoftware ++;
            } else if(category.category =="Printers"){
              catPrinters ++;
            }else if(category.category == "Email"){
              catEmail ++;
            }
            catTotal= catNetwork + catHardware + catSoftware + catPrinters + catEmail;

          });







          //Kreira pocetni datum
          // console.log(startDate);
          var startGrapficDate= new Date(startDateG);
          // console.log(startGrapficDate);



          var parsedStartDate= Date.parse(startGrapficDate);
          parsedStartDate;

          // console.log(startGrapficDate);





    res.render("tasks", { todo:todo,  today:today, user:currentUser, catTotal:catTotal,
                          catNetwork:catNetwork, catHardware:catHardware ,
                          catSoftware:catSoftware , catPrinters:catPrinters , catEmail:catEmail,
                          searchedCategory: searchedCategory, searchLen: searchLen, dateSearch:dateSearch, parsedStartDate:parsedStartDate, Qtys:Qtys });

          }
          });
    });

    // search by category
    router.post("/search",  middlewareObj.isLoggedIn, function(req, res){
      var currentUser= req.user;

      var categorySearch = req.body.categorySearch;

      var catTotal=0;
      var catNetwork=0;
      var catHardware=0;
      var catSoftware=0;
      var catPrinters=0;
      var catEmail=0;
      var searchTotal=0;
      var catObj={};


      User.findById(currentUser._id).populate("todos").exec(function(err, todo){
        var searchTodos= todo.todos;

        if(err){
          console.log(err);
        }
        else{




          searchTodos.forEach(function(category){
            if(category.category==categorySearch){

              catObj={category: category.category,
                      task: category.task
                    };
                    searchedCategory.push(catObj);




            }



          });

           searchLen= searchedCategory.length;
            res.redirect("/tasks");
          }


          });
              searchedCategory=[];




    });



    //Search By Date
    router.post("/date", middlewareObj.isLoggedIn, function(req, res){
      var currentUser= req.user;
     startDate= req.body.startDate;
     endDate= req.body.endDate;
     var q1=[];
     var q2=[];
     var q3=[];
     var q4=[];
     var q5=[];
     var q1L=0;
     var q2L=0;
     var q3L=0;
     var q4L=0;
     var q5L=0;


     // FORMATIRA DATUM //DAN PRVI
     var  startDateInsert= new Date(startDate);
     var  endDateInsert= new Date(endDate);



    //POVECAVA DATUM ZA JEDAN DAN UNAPRED
    startDateInsert.setDate(startDateInsert.getDate());

     endDateInsert.setDate(endDateInsert.getDate()+1);



     // console.log(endDateInsert2);


          // PRETRAGA PO datumu
            Todo.find({
              date: {
                  $gte: startDateInsert,
                  $lt:  endDateInsert
              }

          }, function(err, foundTodo){
            if(err){
              console.log(err);
            }else{
                dateSearch= foundTodo;


            }

          });





      res.redirect("/tasks");

    });

    router.post("/graph", middlewareObj.isLoggedIn, function(req, res){
      var currentUser= req.user;
      startDateG= req.body.startGD;

     var q1=[];
     var q2=[];
     var q3=[];
     var q4=[];
     var q5=[];
     var q1L=0;
     var q2L=0;
     var q3L=0;
     var q4L=0;
     var q5L=0;


     // FORMATIRA DATUM //DAN PRVI
     var  startDateInsert= new Date(startDateG);


    //

  

    var startDateInsert1=new Date(startDateG);
    var startDateInsert2=new Date(startDateG);
    var startDateInsert3=new Date(startDateG);
    var startDateInsert4=new Date(startDateG);
    var startDateInsert5=new Date(startDateG);


     var  endDateInsert1=new Date(startDateG);
     var  endDateInsert2=new Date(startDateG);
     var  endDateInsert3=new Date(startDateG);
     var  endDateInsert4=new Date(startDateG);
     var  endDateInsert5=new Date(startDateG);





    //POVECAVA DATUM ZA JEDAN DAN UNAPRED


    startDateInsert1.setDate(startDateInsert.getDate());
    startDateInsert2.setDate(startDateInsert.getDate()+1);
    startDateInsert3.setDate(startDateInsert.getDate()+2);
    startDateInsert4.setDate(startDateInsert.getDate()+3);
    startDateInsert5.setDate(startDateInsert.getDate()+4);



     endDateInsert1.setDate(startDateInsert.getDate()+1);
     endDateInsert2.setDate(startDateInsert.getDate()+2);
     endDateInsert3.setDate(startDateInsert.getDate()+3);
     endDateInsert4.setDate(startDateInsert.getDate()+4);
     endDateInsert5.setDate(startDateInsert.getDate()+5);

     // console.log(endDateInsert2);



          // GENERISANJE PODATAKA ZA LINIJSKI GRAFIK

          // DAN 1

          Todo.find({
            date: {
                $gte: startDateInsert1,
                $lt:  endDateInsert1
            }

        }, function(err, foundTodo){
          if(err){
            console.log(err);
          }else{
            var controlFlag=foundTodo;
            // console.log(controlFlag);
            q1L=controlFlag.length;
            // console.log(q1L);
            Qtys.push(q1L);
            // DAN 2

            Todo.find({
              date: {
                  $gte: startDateInsert2,
                  $lt:  endDateInsert2
              }

          }, function(err, foundTodo){
            if(err){
              console.log(err);
            }else{
              // var controlFlag=foundTodo;
              // console.log(controlFlag);
                q2L=foundTodo.length;
                  // console.log(q2L);
                  Qtys.push(q2L);

                  // DAN 3

                  Todo.find({
                    date: {
                        $gte: startDateInsert3,
                        $lt:  endDateInsert3
                    }

                }, function(err, foundTodo){
                  if(err){
                    console.log(err);
                  }else{

                    q3L=foundTodo.length;
                      // console.log(q3L);
                    Qtys.push(q3L);

                    // DAN 4

                    Todo.find({
                      date: {
                          $gte: startDateInsert4,
                          $lt:  endDateInsert4
                      }

                    }, function(err, foundTodo){
                    if(err){
                      console.log(err);
                    }else{

                        q4L=foundTodo.length;
                          // console.log(q4L);
                        Qtys.push(q4L);

                        // DAN 5

                        Todo.find({
                          date: {
                              $gte: startDateInsert5,
                              $lt:  endDateInsert5
                          }

                        }, function(err, foundTodo){
                        if(err){
                          console.log(err);
                        }else{

                          // console.log(foundTodo);
                          q5L=foundTodo.length;
                          // console.log(q5L);
                          Qtys.push(q5L);

                        }
                        // console.log(Qtys.length );
                        // Qtys.forEach(function(flag){
                        //   console.log(flag);
                        // });

                        });




                    }

                    });


                  }

                });



            }

          });



          }

        });



    Qtys=[];




      res.redirect("/tasks");

    });


    //end SEARCH BY DATE

    //add new task
    router.post("/tasks",  middlewareObj.isLoggedIn, function(req, res){
    var category= req.body.category;

    req.body.task= req.sanitize(req.body.task);
    var task = req.body.task;
    var date=req.body.date;

    // console.log(date);
    var currentUser= req.user;



    Todo.create({
                  category:category,
                  date:date,
                  task:task
                }, function(err, todo){


          User.findById(currentUser._id, function(err, foundUser){
            if(err){
              console.log(err);
            }else{
              foundUser.todos.push(todo);
              foundUser.save(function(err, data){
                if(err){
                  console.log(err);
                }else{
                req.flash("success", "Успешно додата интервенција");
                res.redirect("/tasks");
                }

              });
            }

          });
        });

    });


    //delete task

    router.delete("/:id", function(req, res){
      Todo.findByIdAndRemove(req.params.id, function(err){
          if(err){
            console.log(err);
          }else{
            req.flash("error", "Обрисали сте интервенцију");
            res.redirect("/tasks");
          }
      });
    });


    module.exports= router;
