var express = require('express');
var router = express.Router();

router.post('/api/days', function(req, res, next){
	console.log("placeholder to get all days");
});

router.get('/api/days/:id', function(req, res, next){
	console.log("placeholder to get a specific day");
});

router.get('/api/days/:id/delete', function(req, res, next){
	console.log("placeholder to delete a day");
});

router.get('/api/days/add', function(req, res, next){
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