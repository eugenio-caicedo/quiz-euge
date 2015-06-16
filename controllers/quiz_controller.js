var models = require('../models/models.js');

var Quiz = models.Quiz;

// GET/ quizes/question
exports.question=function(req, resp){
	Quiz.findAll().success(function(quizzes){
		resp.render('quizes/question', {pregunta:quizzes[0].pregunta});
	});
};

// GET/ quizes/answer
exports.answer=function(req, resp){
	Quiz.findAll().success(function(quizzes){
		var respuesta = (req.query.respuesta==quizzes[0].respuesta) ? 'Correcto' : 'Incorrecto';
		resp.render('quizes/answer', {respuesta:respuesta});
	});
};