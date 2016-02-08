var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;
var Promise = require('bluebird');


router.get('/', function(req, res) {
  Promise.all([
    Hotel.find(),
    Restaurant.find(),
    Activity.find()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  });
})

router.get('/test', function(req, res) {
  Day.count({})
  .then(function(count){
    Day.create(
      {number: count + 1 , hotel: "56b8b8534b71fbd20e6d5d73", restaurants: ["56b8b8534b71fbd20e6d5d8c"], activities: ["56b8b8534b71fbd20e6d5d96"] },
      {number: count + 1 , hotel: "56b8b8534b71fbd20e6d5d70", restaurants: ["56b8b8534b71fbd20e6d5d87"] , activities: ["56b8b8534b71fbd20e6d5d9b"]}
      );
  })
  .then(function(data) {
    console.log('Added dummy days', data);
  });
  console.log("test add complete");
})


module.exports = router;

