var models = require('../models/models.js');

var Quiz = models.Quiz;

//Auto-Load funcion que factoriza el codigo si la ruta contiene quizId
exports.load=function(req, resp, next, quizId){
	try {
		Quiz.find(quizId).then(function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			}
			else
				next(new Error('No Existe quizId='+quizId));
		});
	}catch(error){
		next(error);
	}
};

//GET/ index
exports.index=function(req, resp){
	Quiz.findAll().then(function(quizzes){
		resp.render('quizes/index.ejs', {quizzes:quizzes});
	});
};

// GET/ quizes/question
exports.show=function(req, resp){
	resp.render('quizes/question', {quiz:req.quiz});
};

// GET/ quizes/answer
exports.answer=function(req, resp){
	var quiz=req.quiz;
	var respuesta = (req.query.respuesta===quiz.respuesta) ? 'Correcto' : 'Incorrecto';
	resp.render('quizes/answer', {quiz: quiz, respuesta:respuesta});
};