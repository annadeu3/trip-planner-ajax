var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');
var Day = models.Day;



router.get('/api/days', function(req, res, next){
	Day.find()
	.then(function(data){
		 res.json(data);
		//test.hello(data);
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
		Day.create({number: count + 1 
		});
	})
	.then(function(data) {
		console.log('Success!', data);
	}).then(null, next);
	console.log("placeholder to add a day");
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