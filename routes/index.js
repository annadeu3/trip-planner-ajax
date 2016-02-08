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
      {number: count + 1 , hotel: '56b8ea64683a700f3d164a38'},
      {number: count + 1 , hotel: '56b8ea64683a700f3d164a36'}
      );
  })
  .then(function(data) {
    console.log('Added dummy days', data);
  });
  console.log("test add complete");
})


module.exports = router;

