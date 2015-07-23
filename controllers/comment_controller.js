var models = require('../models/models.js');

var Comment = models.Comment;

//GET/ quizes/{id}/comments/new
exports.new=function(req, resp){
	resp.render('comments/new.ejs', {quizId:req.params.quizId, errors:[]});
};

//POST/ quizes/{id}/comments/create
exports.create=function(req, resp){
	var comment = Comment.build({
		texto : req.body.comment.texto,
		QuizId : req.params.quizId
	});
	
	comment.validate().then(function(err){
		if(err)
			resp.render('comments/new.ejs', {comment: comment, quizId:req.params.quizId, errors:err.errors});
		else {
			comment.save().then(function(){
				resp.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function(err){next(err);});
};