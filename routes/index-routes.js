const router = require('express').Router();
const User = require("../models/user-model");
const Appointment = require("../models/appointment-model");
const Prescrption = require("../models/prescription-model")
const async = require('async');
const bodyParser = require("body-parser");
const VisitedPlace = require('../models/location-Models');


var bodyParserencoded = bodyParser.urlencoded({extended:false});




router.get('/home', function(req, res, next) {
        var locals = {};
        var tasks = [
            // Load users
            function(callback) {
                User.find( { category :'doctor' } ,function(err, doctors) {
                    if (err) return callback(err);
                    locals.doctors = doctors;
                    callback();
                });
            },


          function(callback) {
            VisitedPlace.find({ }, function(err, locations){
                if (err) return callback(err);
                locals.locations = locations;
                callback();
            });
        }
        ];

        async.parallel(tasks, function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err); //If an error occurred, let express handle it by calling the `next` function
            // Here `locals` will be an object with `users` and `colors` keys
            // Example: `locals = {users: [...], colors: [...]}`
            res.render('home', {locals ,user: req.user} );
        });
    });

router.get('/createDoctorProfile',isLoggedIn, (req, res) => {
         res.render("doctorRegistration",{user:req.user});
});

router.get('/createNewPlace',isLoggedIn, (req, res) => {
         res.render("addNewVisitingPlace",{user:req.user});
});

router.get('/createNewMapArea/:id',isLoggedIn, (req, res) => {
         res.render("addLocation",{user:req.user});
});

router.get('/appointment/:id///:name',isLoggedIn, (req, res) => {
  var newvalues = {
    doctorID : req.params.id,
    doctorName : req.params.name
  }
  res.render("appoinment",{user: req.user, newvalues : newvalues})
});


router.post("/createAppointment",isLoggedIn, bodyParserencoded ,function(req, res){
  var newvalues = {         doctorId : req.body.doctorID,
                            doctorName : req.body.doctorName,
                            patentName : req.body.patentName,
                            patentImg : req.user.thumbnail,
                            patentId : req.user._id,
                            location : req.body.location,
                            PhoneNumber : req.body.PhoneNumber,
                            Problem : req.body.Problem
                             };
  Appointment.create( newvalues , function(err, updatedInformation){
    if(err)
    {
      throw err;
    }else {
      res.redirect("/home");
      //res.redirect("/myprofile/" + req.user.id);
    }
  });
});




router.get("/mySchedule/:id", function(req, res) {
       Appointment.find({ patentId :req.params.id }, function(err, appoinment) {
           if(err) {
               console.log(err);
           } else {
              res.render("mySchedule",{user:req.user ,appoinment:appoinment});
           }
       });
});

router.get('/showMyPrescription/:id',isLoggedIn, (req, res) => {
  Prescrption.find({ patentID :req.params.id }, function(err, prescription) {
      if(err) {
          console.log(err);
      } else {
         res.render("myprescription",{user:req.user ,prescription:prescription});
      }
  });
});


router.get('/writePrescriptionPage/:id',isLoggedIn, (req, res) => {
  var newvalues = {
    patientID : req.params.id
  }
         res.render("writePrescription",{newvalues,user:req.user});
});



function isLoggedIn(req,res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/auth/login");
}

module.exports = router;
