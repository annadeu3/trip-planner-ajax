var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');
var Day = models.Day;

/*
  day.populate('hotel restaurants activities').execPopulate().then(function(popDay) {
      // popDay now has objects in place of _id s!
      console.log(popDay);
  });
*/		 

/*
Model.find().populate('pathA').exec().then(function (document) {
    // document.pathA is populated
});
*/


router.get('/api/days', function(req, res, next){
	Day.find().populate('hotel restaurants activities').exec()
	// Day.find().populate('hotel').exec()
	.then(function(data){
		 res.json(data);
		 // console.log("received data in routes/api/days.js",data)
	})
	.then(null, next);
	console.log("placeholder to get all days");
});

router.get('/api/days/:id', function(req, res, next){
	Day.findById(req.params.id)
	.then(function(data){
		console.log('Success!!!', data.hotel);
	})
	.then(null, next);
	console.log("placeholder to get a specific day");
});

router.delete('/api/days/:id/delete', function(req, res, next){
	console.log("placeholder to delete a day");
});

router.post('/api/days', function(req, res, next){
	Day.count({})
	.then(function(count){
		console.log("** count is ",count)
		if(!count) { var count = 0 }
	// 	Day.create({number: count + 1 });
	// })
		Day.create({number: count + 1 })
		.then(function(data) {
			console.log('Success!', data);
		}).then(null, next);
		// console.log("placeholder to add a day");
	})
	.then(null,next)
	});

router.post('/api/days/:id/hotels', function(req, res, next) {
	console.log("placeholder for add/remove hotel");
});

router.post('/api/days/:id/restaurants', function(req, res, next) {
	console.log("placeholder for add/remove restaurant");
});

router.post('/api/days/:id/activities', function(req, res, next) {
	console.log("placeholder for add/remove activity");
});

module.exports = router;