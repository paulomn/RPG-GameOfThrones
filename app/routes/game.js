module.exports = function(application){
	
	application.get('/game', function(req, res){
		application.app.controllers.game.renderGame(application, req, res);
	});

	application.get('/signOut', function(req, res){
		application.app.controllers.game.signOut(application, req, res);
	});

	application.get('/vassal', function(req, res){
		application.app.controllers.game.renderVassal(application, req, res);
	});

	application.get('/scrolls', function(req, res){
		application.app.controllers.game.renderScrolls(application, req, res);
	});

		application.post('/saveVassal', function(req, res){
		application.app.controllers.game.saveVassal(application, req, res);
	});
		application.get('/revokeVassal', function(req, res){
		application.app.controllers.game.revokeVassal(application, req, res);
	});
		
}