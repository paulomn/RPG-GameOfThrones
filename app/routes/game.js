module.exports = function(application){
	application.get('/game', function(req, res){
		application.app.controllers.game.renderGame(application, req, res);
	});
}