var models = require('../models/models.js');

var Quiz = models.Quiz;

//GET/ index
exports.index=function(req, resp){
	Quiz.findAll().success(function(quizzes){
		resp.render('quizes/index.ejs', {quizzes:quizzes});
	});
};

// GET/ quizes/question
exports.show=function(req, resp){
	Quiz.find(req.params.quizId).success(function(quiz){
		resp.render('quizes/question', {quiz:quiz});
	});
};

// GET/ quizes/answer
exports.answer=function(req, resp){
	Quiz.find(req.params.quizId).success(function(quiz){
		var respuesta = (req.query.respuesta===quiz.respuesta) ? 'Correcto' : 'Incorrecto';
		resp.render('quizes/answer', {quiz: quiz, respuesta:respuesta});
	});
};