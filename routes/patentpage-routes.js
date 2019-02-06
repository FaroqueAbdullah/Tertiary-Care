const router = require('express').Router();

/*
var NodeGeocoder = require('node-geocoder');


const bodyParser = require("body-parser");


var bodyParserencoded = bodyParser.urlencoded({extended:false});

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);


router.post("/createBlog", bodyParserencoded ,function(req, res){
  var newvalues = {  blogTitle : req.body.blogTitle,
                            blogLocation : req.body.blogLocation,
                            blogthumbnil : req.body.blogthumbnil,
                            blogDescription : req.body.blogDescription,
                            blogAuthorId : req.user._id,
                            blogAuthorName : req.user.username,
                            blogAuthorThumbnil : req.user.thumbnail,
                             };
  Blog.create( newvalues , function(err, updatedInformation){
    if(err)
    {
      throw err;
    }else {
      res.redirect("/home");
      //res.redirect("/myprofile/" + req.user.id);
    }
  });
});




router.post("/createEvent", bodyParserencoded ,function(req, res){
  var newvalues = {  eventTitle : req.body.eventTitle,
                            eventLocation : req.body.eventLocation,
                            eventDate : req.body.eventDate,
                            eventDuration : req.body.eventDuration,
                            eventEmail : req.body.eventEmail,
                            blogAuthorId : req.user._id,
                            blogAuthorName : req.user.username,
                            blogAuthorThumbnil : req.user.thumbnail
                            };
  NewEvent.create( newvalues , function(err, updatedInformation){
    if(err)
    {
      throw err;
    }else {
      res.redirect("/home");
      //res.redirect("/myprofile/" + req.user.id);
    }
  });
});

*/



module.exports = router;
