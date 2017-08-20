
var middleware={};
middleware.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error","You need to be logged in to continue");
        res.redirect("/login");
    }
};

module.exports = middleware;