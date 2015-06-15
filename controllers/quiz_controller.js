// GET/ quizes/question
exports.question=function(req, resp){
	resp.render('quizes/question', {pregunta:'Capital de Italia'});
};

// GET/ quizes/answer
exports.answer=function(req, resp){
	var respuesta = (req.query.respuesta=='Roma') ? 'Correcto' : 'Incorrecto';
	resp.render('quizes/answer', {respuesta:respuesta});
};