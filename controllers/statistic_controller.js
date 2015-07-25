var Promise = require('promise');
var models = require('../models/models.js');

var Quiz = models.Quiz;
var Comment = models.Comment;

//Funcion privada generica
function getNroTotal(model){
	return model.count();
}

function buscarPreguntasComentarios(){
	return Quiz.count({
		distinct: true,
		include: [{
			model: Comment, 
		    required: true
		}]
	});
}

exports.quizEstadisticas=function(req, resp){
		
	var estadisticas = {
		quizTotal : null,
		commentTotal : null,
		promedioComentarios: null,
		quizNoComentarios: null,
		quizConComentarios: null,
	};
	
	Promise.all([
	getNroTotal(Quiz),
	getNroTotal(Comment),
	buscarPreguntasComentarios()
	]).then(function(results){
		estadisticas.quizTotal = results[0];
		estadisticas.commentTotal = results[1];
		estadisticas.promedioComentarios = (results[0]!==0) ? results[1]/results[0] : 0;
		estadisticas.quizConComentarios = results[2];
		estadisticas.quizNoComentarios = results[0]-results[2];
		resp.render('quizes/statistic', {estadisticas : estadisticas, errors:[]});
	});
};
