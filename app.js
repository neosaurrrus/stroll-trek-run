//minor bug list:

//1. Missing "hi User" message
//2 Footer wont stay down   
//3 Alerts push backgrounds down;


const express         = require('express'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      app             = express(),
      seedDB          = require("./seeds"),
      methodOverride  = require("method-override"),
      flash           = require('connect-flash');
      passport        = require("passport"),
      LocalStrategy   = require("passport-local"),
      User            = require("./models/user"),
      indexRoutes     = require("./routes/index"),
      commentRoutes   = require("./routes/comment"),
      trailRoutes     = require("./routes/trail"),
      authRoutes      = require("./routes/auth");

mongoose.connect('mongodb://guest:regularSeal1@ds115353.mlab.com:15353/strolltrekrun');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(flash());

//Passport Config!
app.use(require("express-session")({
    secret: "We are all robots. The government lies to us about our metalliic origins",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => { //Pushes Req.User to all routes as currentUser
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//seedDB(); // Seed the DB

//routes
app.use(authRoutes);
app.use("/trails/:id/comments", commentRoutes);
app.use("/trails", trailRoutes);
app.use("/", indexRoutes);
app.use("*", indexRoutes);

//Server Listener
app.listen(process.env.PORT || '3000', () => {
    console.log("STR is running")
})
