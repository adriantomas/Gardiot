var express = require('express');
var router = express.Router();
var passport = require('passport');
var validator = require('validator');
var routeRequirements = require('../functions/routeRequirements');

var taskModel = require('../models/task');

router.get('/todayTask/:number/:page', passport.authenticate('jwt', {session: false}), routeRequirements, function (request, response) {
	if (!validator.isInt(request.params.number, {gt: 0}) || !validator.isInt(request.params.page, {gt: 0})) 
		response.status(400).json({"Mensaje":"Petición incorrecta"});
	else {
		taskModel.getMyTasksForToday (request.params.number, request.params.page, request.user.id, function (error, data) {
			if (error)
				response.status(500).json({"Mensaje":error.message});
			else
				response.status(200).json(data);
		})
	}
});

router.get('/dayTask/:number/:page/:date', passport.authenticate('jwt', {session: false}), routeRequirements, function (request, response) {
	if (!validator.isInt(request.params.number, {gt: 0}) || !validator.isInt(request.params.page, {gt: 0}) || !validator.isISO8601(request.params.date)) 
		response.status(400).json({"Mensaje":"Petición incorrecta"});
	else {
		taskModel.getMyTasksByDate (request.params.number, request.params.page, request.user.id, request.params.date, function (error, data) {
			if (error)
				response.status(500).json({"Mensaje":error.message});
			else
				response.status(200).json(data);
		})
	}
});

router.get('/monthTask/:date', passport.authenticate('jwt', {session: false}), routeRequirements, function (request, response) {
	if (!validator.isISO8601(request.params.date)) 
		response.status(400).json({"Mensaje":"Petición incorrecta"});
	else {
		taskModel.getMyTasksByMonth (request.user.id, request.params.date, function (error, data) {
			if (error)
				response.status(500).json({"Mensaje":error.message});
			else
				response.status(200).json(data);
		})
	}
});

router.get('/plantTask/:number/:page/:myPlant', passport.authenticate('jwt', {session: false}), routeRequirements, function (request, response) {
	if (!validator.isInt(request.params.number, {gt: 0}) || !validator.isInt(request.params.page, {gt: 0}) || !validator.isInt(request.params.myPlant, {gt: 0})) 
		response.status(400).json({"Mensaje":"Petición incorrecta"});
	else {
		taskModel.getTasksByMyPlant (request.params.number, request.params.page, request.user.id, request.params.myPlant, function (error, data) {
			if (error)
				response.status(500).json({"Mensaje":error.message});
			else
				response.status(200).json(data);
		})
	}
});

router.patch('/taskDone/:myPlant/:plant/:treatment/:date', passport.authenticate('jwt', {session: false}), routeRequirements, function (request, response) {
	if (!validator.isInt(request.params.myPlant, {gt: 0}) || !validator.isInt(request.params.plant, {gt: 0}) || !validator.isInt(request.params.treatment, {gt: 0}) || !validator.isISO8601(request.params.date)) 
		response.status(400).json({"Mensaje":"Petición incorrecta"});
	else {
		taskModel.setTaskDone (request.params.number, request.params.page, request.user.id, function (error, data) {
			if (error)
				response.status(500).json({"Mensaje":error.message});
			else
				response.status(200).json(data);
		})
	}
});


module.exports = router;