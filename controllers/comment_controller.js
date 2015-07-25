var models = require('../models/models.js');

var Comment = models.Comment;

//Auto-Load funcion que factoriza el codigo si la ruta contiene commentId
exports.load=function(req, resp, next, commentId){
	try {
		Comment.find({
			where:{ id:Number(commentId) }
		}).then(function(comment){
			if(comment){
				req.comment=comment;
				next();
			}
			else
				next(new Error('No Existe commentId='+commentId));
		});
	}catch(error){
		next(error);
	}
};

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

//PUT/ quizes/{id}/coments/{id}
exports.publish=function(req, resp){
	req.comment.publicado=true;
	req.comment.save({fields:["publicado"]}).then(function(err){
		resp.redirect('/quizes/'+req.params.quizId);
	}).catch(function(err){next(err);});
};