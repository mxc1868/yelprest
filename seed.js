var mongoose = require("mongoose");
var RestaurantSchema = require("./models/restaurants");
var CommentSchema = require("./models/comments");

var data = [
        {
            name: "Peter Chang",
            price: "20.00",
            image: "https://pbs.twimg.com/profile_images/2410902518/Peter_Chang_Logo.jpg",
            description: "Nice Chinese Food",
        }
    ]
var com = {
    text: "This is a good restaurant!"
}
    
var seed = function() {
    CommentSchema.remove({},function(err) {
        
    });
    RestaurantSchema.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully Remove all Restaurants");
            data.forEach(function(r) {
                RestaurantSchema.create(r, function(err, restaurant) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Add a Restaurant!");
                        CommentSchema.create(com, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(comment);
                                restaurant.comments.push(comment);
                                restaurant.save();
                                console.log(restaurant);
                            }
                        });
                    }
                });
            });
        }
    })
}
module.exports = seed;