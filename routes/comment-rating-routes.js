const router = require('express').Router();

const Comments = require("../models/comments");
const User     = require("../models/user-model");
const bodyParser = require("body-parser");


var bodyParserencoded = bodyParser.urlencoded({extended:false});

router.post("/commentsfordoctor/:id",isLoggedIn, bodyParserencoded ,function(req, res){
  var previousId = req.params.id;
  var newvalues = {         doctorId : req.params.id,
                            patentId : req.user._id,
                            patentThumbnil : req.user.thumbnail,
                            patentName : req.user.username,
                            comment : req.body.comment
                             };
  Comments.create( newvalues , function(err, updatedInformation){
    if(err)
    {
      throw err;
    }else {
      res.redirect("/showDoctorProfile/" + previousId);
      //res.redirect("/myprofile/" + req.user.id);
    }
  });
});


router.post("/submitRating/:id/:totalRating/:totalPerson",isLoggedIn,function(req,res){
    var previousId = req.params.id;
    var totalRating1 = parseInt(req.params.totalRating, 10) + parseInt(req.body.rate2, 10);
    var totalPerson1 = parseInt(req.params.totalPerson, 10) + 1;

    var newvalues = {
      totalRating : totalRating1 ,
      totalPerson : totalPerson1
    }
    User.findByIdAndUpdate(req.params.id, newvalues , function(err, updatedInformation){
      if(err)
      {
        throw err;
      }else {
        res.redirect("/showDoctorProfile/" + previousId);
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
