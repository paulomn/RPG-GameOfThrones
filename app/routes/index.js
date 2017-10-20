module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.renderIndex(application, req, res);
	});

	application.post('/authenticate', function(req, res){
		application.app.controllers.index.authenticate(application, req, res);
	});
}