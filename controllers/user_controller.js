var user = {
		admin : {id:1, username:'admin', password:'1234'},
		pepe : {id:2, username:'pepe', password:'5678'}
};

//Funcion que permitira autenticar al usuario en la aplicacion,
// y ejecutara la funcion callaback luego dependiendo del contexto
exports.autenticar=function(login, password, callback){
	if(user[login]){
		if(user[login].password === password){
			callback(null, user[login]);
		}
		else
			callback(new Error('Password Erroneo'));
	}
	else
		callback(new Error('No Existe el usuario'));
};