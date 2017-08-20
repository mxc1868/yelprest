var express = require("express");
var router = express.Router();
var middleware = require("../middleware/middleware");
var RestaurantSchema = require("../models/restaurants");

router.get("/", function(req, res) {
    RestaurantSchema.find({}, function(err, result) {
       if (err) {
           console.log(err);
        } else {
           res.render("restaurants/index", {restaurants: result});
        }
    })
});
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("restaurants/new");
});
router.get("/:id", function(req, res) {
    RestaurantSchema.findById(req.params.id).populate('comments').exec(function(err, populatedResult) {
        if (err) {
            console.log(err);
        } else {
            console.log(populatedResult);
            res.render("restaurants/details", {restaurant :populatedResult});
        }
    });
});
router.get("/:id/update", function(req, res) {
    RestaurantSchema.findById(req.params.id, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("restaurants/update", {restaurant: result});
        }
    });
});
router.put("/:id", function(req, res) {
    RestaurantSchema.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/restaurants/"+req.params.id);
        }
    });
});
router.post("/", middleware.isLoggedIn , function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRestaurant = {name: name, price: price, image: image, description: desc, author: author};
    RestaurantSchema.create(newRestaurant, function(err, result) {
      if (err) {
          console.log(err);
      } else {
          console.log(result);
          res.redirect("/restaurants");
      }
    });
});
router.delete("/:id", function(req, res) {
    RestaurantSchema.findByIdAndRemove(req.params.id, function(err, result) {
        res.redirect("/restaurants");
    })
})

module.exports = router;