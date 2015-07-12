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
	var search = req.query.search;
	if(search===null || search===undefined)
		Quiz.findAll().then(function(quizzes){
			resp.render('quizes/index.ejs', {quizzes:quizzes, errors: []});
		});
	else
		Quiz.findAll({
			where: ["pregunta like ?", "%"+search.replace(/\s/gi, '%')+"%"],
			order: 'pregunta'
		})
		.then(function(quizzes){
			resp.render('quizes/index.ejs', {quizzes:quizzes, errors: []});
		});
};

//GET/ find
exports.find=function(req, resp){
	resp.render('quizes/find.ejs', {errors: []});
};

// GET/ quizes/question
exports.show=function(req, resp){
	resp.render('quizes/question', {quiz:req.quiz, errors: []});
};

//GET/ quizes/new
exports.new=function(req, resp){
	var quiz = Quiz.build({
		pregunta: "Pregunta",
		respuesta: "Respuesta"
	});
	resp.render('quizes/new', {quiz:quiz, errors: []});
};

exports.create=function(req, resp){
	var quiz = Quiz.build(req.body.quiz);
	//Se Valida los datos del objeto
	quiz.validate().then(function(err){
		if(err)
			resp.render('quizes/new', {quiz:quiz, errors : err.errors});
		else {
			//Se especifican los fiel por cuestiones de seguridad
			quiz.save({fields:["pregunta", "respuesta"]})
				.then(function(){
					resp.redirect('/quizes', {errors: []});
				});
		}
	});
};

// GET/ quizes/answer
exports.answer=function(req, resp){
	var quiz=req.quiz;
	var respuesta = (req.query.respuesta===quiz.respuesta) ? 'Correcto' : 'Incorrecto';
	resp.render('quizes/answer', {quiz: quiz, respuesta:respuesta, errors: []});
};