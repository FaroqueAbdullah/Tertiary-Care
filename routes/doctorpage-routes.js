const router = require('express').Router();
const User = require("../models/user-model");
const DoctorLocation = require("../models/doctor-location-model");
const Comments = require("../models/comments");
const Appoinment = require("../models/appointment-model");
const Prescrption = require("../models/prescription-model");
const async = require('async');

const bodyParser = require("body-parser");


var bodyParserencoded = bodyParser.urlencoded({extended:false});


router.post("/editmyprofile/:id", bodyParserencoded ,function(req, res){
  var previousId = req.params.id;
  var newvalues = { $set: { category:'doctor',
                            name: req.body.name,
                            dateOfBirth: req.body.dateOfBirth,
                            Gender: req.body.Gender,
                          docLocation: req.body.docLocation,
                          qualification : req.body.qualification,
                          specialization : req.body.specialization,
                          mailId : req.body.mailId,
                          phoneNumber : req.body.phoneNumber,
                          experience : req.body.experience,
                        description: req.body.description} };
  User.findByIdAndUpdate(req.params.id, newvalues , function(err, updatedInformation){
    if(err)
    {
      throw err;
    }else {
      res.redirect("/showDoctorProfile/" + previousId);
      //res.redirect("/myprofile/" + req.user.id);
    }
  });
})

router.post("/createNewVisitingPlace/:id", bodyParserencoded ,function(req, res){
  var previousId = req.params.id;
  var newvalues = {         doctorId : req.params.id,
                            location : req.body.location,
                            time : req.body.time,
                            day : req.body.day,
                            fee : req.body.fee
                             };
  DoctorLocation.create( newvalues , function(err, updatedInformation){
    if(err)
    {
      throw err;
    }else {
      res.redirect("/showDoctorProfile/" + previousId);
      //res.redirect("/myprofile/" + req.user.id);
    }
  });
});


router.get('/showDoctorProfile/:id', function(req, res, next) {
        var locals = {};
        var tasks = [
            // Load users
            function(callback) {
                User.findById( req.params.id ,function(err, users) {
                    if (err) return callback(err);
                    locals.users = users;
                    callback();
                });
            },
            // Load colors
            function(callback) {
              DoctorLocation.find({ doctorId:req.params.id }, function(err, locations){
                if (err) return callback(err);
                locals.locations = locations;
                callback();
            })
          },

          function(callback) {
            Comments.find({ doctorId:req.params.id }, function(err, comments){
              if (err) return callback(err);
              locals.comments = comments;
              callback();
          })
        }
        ];

        async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
            // Here `locals` will be an object with `users` and `colors` keys
            // Example: `locals = {users: [...], colors: [...]}`
            res.render('doctorProfile', {locals ,user: req.user} );
        });
    });


    router.post("/appointmentSubmit/:id",isLoggedIn, bodyParserencoded ,function(req, res){
      var newvalues = {         doctorId : req.params.id,
                                location : req.body.location,
                                patentId : req.user._id,
                                patentThumbnil : req.user.thumbnail,
                                patentName : req.body.patentName,
                                PhoneNumber : req.body.PhoneNumber,
                                Problem : req.body.Problem
                                 };
      Appoinment.create( newvalues , function(err, updatedInformation){
        if(err)
        {
          throw err;
        }else {
          res.redirect("/home");
          //res.redirect("/myprofile/" + req.user.id);
        }
      });
    });




    router.get("/mypatientList/:id", function(req, res) {
           Appoinment.find({ doctorId :req.params.id }, function(err, appoinment) {
               if(err) {
                   console.log(err);
               } else {
                  res.render("mypatientlist",{user:req.user ,appoinment:appoinment});
               }
           });
    })



    router.post("/writePrescription/:id", bodyParserencoded ,function(req, res){
      var previousId = req.params.id;
      var newvalues = {         doctorId : req.user._id,
                                doctorThumbnil : req.user.thumbnail,
                                doctorName : req.user.name,
                                patentID : req.params.id,
                                medicineName : req.body.medicineName,
                                medicineTime : req.body.medicineTime
                                 };
      Prescrption.create( newvalues , function(err, updatedInformation){
        if(err)
        {
          throw err;
        }else {
          res.redirect("/writePrescriptionPage/" + previousId);
          //res.redirect("/myprofile/" + req.user.id);
        }
      });
    });

    function isLoggedIn(req,res, next){
      if(req.isAuthenticated()){
        return next();
      }
      res.redirect("/auth/login");
    }


module.exports = router;
