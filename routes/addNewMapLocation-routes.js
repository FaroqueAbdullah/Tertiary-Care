const router = require('express').Router();
var NodeGeocoder = require('node-geocoder');
const VisitedPlace = require('../models/location-Models');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

router.post("/", function(req, res){
  // get data from form and add to campgrounds array
var touristId = req.user._id;
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = { touristId:touristId, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    VisitedPlace.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/home")
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/home");
        }
    });
  });
});

module.exports = router;
