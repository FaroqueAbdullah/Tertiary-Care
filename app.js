const express                  = require('express');
const cookieSession            = require('cookie-session');
const passport                 = require('passport');
const path                     = require('path');
const methodOverride           = require("method-override");
const mongoose                 = require('mongoose');


const authRoutes               = require('./routes/auth-routes');
const doctorpageRoutes        = require('./routes/doctorpage-routes')
const indexRoutes              = require('./routes/index-routes');
const patentpageRoutes         = require('./routes/patentpage-routes');
const searchRoutes             = require('./routes/search-routes');
const commentRoutes            = require('./routes/comment-rating-routes');
const addlocation              = require('./routes/addNewMapLocation-routes');



const passportSetup            = require('./config/passport-setup');

const keys                     = require('./config/keys');

const app                      = express();

const bodyParser               = require("body-parser");







app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: true}));

// set view engine
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));



// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/addNewVisitedPlace',addlocation)
app.use(doctorpageRoutes);
app.use(indexRoutes);
app.use(patentpageRoutes);
app.use(searchRoutes);
app.use(commentRoutes);

// create home route
app.get('/', (req, res) => {
    res.redirect('/home');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
