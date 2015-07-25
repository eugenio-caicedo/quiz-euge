//GET/ login
exports.new=function(req, resp){
	var errors = req.session.errors || {};
	req.session.errors = {};
	resp.render('session/new', {errors:errors});
};

//POST/ login
exports.create=function(req, resp){
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, function(err, user){
		if(err){
			req.session.errors = [{message:'Se ha producido un error: '+err}];
			resp.redirect('/login');
			return;
		}
		
		//La session se define por la existencia de la variable user
		req.session.user = {id:user.id, username:user.username};
		resp.redirect(req.session.redir.toString());
	});
};

//DELETE/ login
exports.destroy=function(req, resp){
	delete req.session.user;
	resp.redirect(req.session.redir.toString());
}