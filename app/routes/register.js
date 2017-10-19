module.exports = function(application){
	
	application.get('/register', function(req, res){
		application.app.controllers.register.renderRegister(application, req, res);
	});

	application.post('/saveRegister', function(req, res){
		application.app.controllers.register.saveRegister(application, req, res);
	});
}