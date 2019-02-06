var express = require("express"),
    router    = express.Router(),
    mongoose = require("mongoose");
const async = require('async');
const User = require("../models/user-model");
const VisitedPlace = require('../models/location-Models');




function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/searchDoctor', function(req, res, next) {
        var locals = {};
        var tasks = [
            // Load users

            function(callback) {
              if (req.query.search) {
              const regex = new RegExp(escapeRegex(req.query.search), 'gi');
                User.find( { name: regex } ,function(err, doctors) {
                    if (err) return callback(err);
                    locals.doctors = doctors;
                    callback();
                });
              }
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

/*router.get("/searchDoctor", function(req, res) {
    if (req.query.search) {
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
       User.find({ name: regex }, function(err, doctors) {
           if(err) {
               console.log(err);
           } else {
              res.render("home",{user:req.user ,doctors:doctors});
           }
       });
    }
})

*/

module.exports = router;
