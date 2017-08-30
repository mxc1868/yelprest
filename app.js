var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var passportLocal = require("passport-local");
var expressSession = require("express-session");
var methodOverride = require("method-override");
var RestaurantSchema = require("./models/restaurants");
var CommentSchema = require("./models/comments");
var UserSchema = require("./models/users");
var seed = require("./seed");
//connect MongoDB
mongoose.connect("");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//====================
//  passport config
//====================
app.use(expressSession({
    secret: "Mia is the most beautiful girl in the world! XD",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(UserSchema.authenticate()));
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());

//====================
//  middleware config
//====================
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// seed();
//====================
//      Route
//====================
var indexRoute = require("./routes/index");
var restaurantRoute = require("./routes/restaurant");
var commentRoute = require("./routes/comment");


app.use("/", indexRoute);
app.use("/restaurants", restaurantRoute);
app.use("/restaurants/:id/comments", commentRoute);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started!");
});
